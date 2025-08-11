// Helper function to log errors to console
const logError = (error, context = {}) => {
  const errorData = {
    timestamp: new Date().toISOString(),
    error: error.message || error,
    stack: error.stack,
    ...context
  }
  console.error('Telegram Error:', JSON.stringify(errorData, null, 2))
  return errorData
}

// Timeout wrapper for fetch using the built-in fetch
const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  // Use the global fetch available in Netlify Functions
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw error;
  }
};

exports.handler = async (event, context) => {
  console.log('=== New Request ===')
  console.log('Environment Variables:', {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ? '***REDACTED***' : 'NOT SET',
    TELEGRAM_CHAT_IDS: process.env.TELEGRAM_CHAT_IDS ? '***SET***' : 'NOT SET'
  })

  // Log basic request info (without sensitive data)
  const requestInfo = {
    method: event.httpMethod,
    path: event.path,
    headers: {
      'content-type': event.headers['content-type'],
      'user-agent': event.headers['user-agent']
    },
    body: event.body ? '***BODY***' : 'No body'
  }
  console.log('Request:', JSON.stringify(requestInfo, null, 2))

  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  try {
    // Parse and validate request body
    let body
    try {
      body = JSON.parse(event.body || '{}')
    } catch (e) {
      throw new Error('Invalid JSON in request body')
    }

    const { name, email, message } = body
    if (!name || !email || !message) {
      throw new Error('Missing required fields: name, email, or message')
    }

    // Verify environment variables
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set in environment variables')
    }
    if (!process.env.TELEGRAM_CHAT_IDS) {
      throw new Error('TELEGRAM_CHAT_IDS is not set in environment variables')
    }

    const chatIds = process.env.TELEGRAM_CHAT_IDS.split(',').map(id => id.trim())
    const text = `📨 New Contact Form Submission\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`

    console.log(`Sending message to ${chatIds.length} chat(s)`)
    
    // Send to all specified chats
    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        const startTime = Date.now()
        try {
          const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
          
          // Use URLSearchParams to properly handle special characters and emojis
          const formData = new URLSearchParams()
          formData.append('chat_id', chatId)
          formData.append('text', text)
          formData.append('parse_mode', 'HTML')
          formData.append('disable_web_page_preview', 'true')
          
          console.log(`Sending to chat ${chatId}...`)
          const response = await fetchWithTimeout(
            url,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: formData.toString()
            },
            8000 // 8 second timeout
          )
          
          const result = await response.json()
          const duration = Date.now() - startTime
          
          console.log(`Response from Telegram (${duration}ms):`, JSON.stringify(result))
          
          if (!result.ok) {
            throw new Error(result.description || `Failed to send to chat ${chatId}`)
          }
          
          return { success: true, chatId, messageId: result.result.message_id }
        } catch (error) {
          const duration = Date.now() - startTime
          const errorData = logError(error, { chatId, durationMs: duration })
          throw new Error(`Failed to send to chat ${chatId}: ${errorData.error}`)
        }
      })
    )

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Message sent successfully!',
        results: results
      })
    }
  } catch (error) {
    const errorData = logError(error, { 
      requestId: context.awsRequestId,
      timestamp: new Date().toISOString()
    })
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to process request',
        details: errorData.error,
        timestamp: errorData.timestamp,
        requestId: context.awsRequestId
      })
    }
  }
}
