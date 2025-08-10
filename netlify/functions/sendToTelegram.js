const fetch = require('node-fetch')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { name, email, message } = JSON.parse(event.body)
    const chatIds = process.env.TELEGRAM_CHAT_IDS.split(',').map(id => id.trim())
    const text = `📨 New Contact Form Submission\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`

    // Send to all specified chats
    const results = await Promise.all(
      chatIds.map(chatId => 
        fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'HTML'
            })
          }
        ).then(res => res.json())
      )
    )

    if (results.some(result => !result.ok)) {
      throw new Error('Some messages failed to send')
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send message',
        details: error.message 
      })
    }
  }
}
