const fetch = require('node-fetch')

// Helper function to log errors to console
const logError = (error, context = {}) => {
  console.error('Telegram Error:', {
    timestamp: new Date().toISOString(),
    error: error.message || error,
    ...context
  })
  return error
}

exports.handler = async (event) => {
  console.log('Received request:', {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body ? JSON.parse(event.body) : null
  })

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    // Verify environment variables
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables')
    }
    if (!process.env.TELEGRAM_CHAT_IDS) {
      throw new Error('TELEGRAM_CHAT_IDS is not set in environment variables')
    }

    const { name, email, message } = JSON.parse(event.body)
    const chatIds = process.env.TELEGRAM_CHAT_IDS.split(',').map(id => id.trim())
    const text = `📨 New Contact Form Submission\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`

    console.log('Sending to chat IDs:', chatIds)
    
    // Send to all specified chats
    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        try {
          const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
          const body = JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
          })
          
          console.log(`Sending to chat ${chatId}...`)
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
          })
          
          const result = await response.json()
          console.log(`Response from Telegram for ${chatId}:`, result)
          
          if (!result.ok) {
            throw new Error(result.description || `Failed to send to chat ${chatId}`)
          }
          
          return result
        } catch (error) {
          console.error(`Error sending to chat ${chatId}:`, error)
          throw error
        }
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Message sent successfully!',
        results: results
      })
    }
  } catch (error) {
    const errorMessage = error.message || 'Unknown error occurred'
    console.error('Failed to process request:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send message',
        details: errorMessage,
        timestamp: new Date().toISOString()
      })
    }
  }
}
