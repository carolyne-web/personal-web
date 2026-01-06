# Kuwona Digital Contact Form API

Backend API for handling contact form submissions from the Kuwona Digital website.

## Features

- Receives contact form submissions via POST request
- Sends email notifications to info@kuwonastudios.com
- Sends automatic reply to the user
- Built with Express.js and Nodemailer
- Uses Gmail SMTP (free)

## Prerequisites

- Node.js 18+ installed
- A Gmail account for sending emails
- Gmail App Password (see setup instructions below)

## Local Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Configure Gmail App Password**

   You need to generate a Gmail App Password (not your regular password):

   a. Go to your Google Account: https://myaccount.google.com

   b. Navigate to Security → 2-Step Verification (enable if not already enabled)

   c. Scroll down to "App passwords" and click it

   d. Select "Mail" and "Other (Custom name)"

   e. Enter "Kuwona Contact Form" as the name

   f. Click "Generate" and copy the 16-character password

   g. Add to your `.env` file:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   PORT=3000
   ```

4. **Run locally**
   ```bash
   npm start
   ```

   Or with auto-reload during development:
   ```bash
   npm run dev
   ```

5. **Test the API**

   The server will run on http://localhost:3000

   Test endpoint:
   ```bash
   curl http://localhost:3000
   ```

   Test contact form:
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "123456789",
       "company": "Test Company",
       "description": "This is a test message"
     }'
   ```

## Deploying to Render

1. **Create a Render account**
   - Go to https://render.com
   - Sign up for free

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: kuwona-contact-api (or your preferred name)
     - **Environment**: Node
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Plan**: Free

3. **Add Environment Variables**

   In the Render dashboard, go to "Environment" and add:
   - `GMAIL_USER` = your-email@gmail.com
   - `GMAIL_APP_PASSWORD` = your-16-character-app-password

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your API
   - You'll get a URL like: `https://kuwona-contact-api.onrender.com`

5. **Update Frontend**

   In your main website's `main.js`, update the fetch URL:
   ```javascript
   const response = await fetch('https://YOUR-API-NAME.onrender.com/api/contact', {
   ```

   Replace `YOUR-API-NAME` with your actual Render service name.

## Important Notes

### Render Free Tier Limitations

- The free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month free (enough for most small sites)
- If you need always-on, upgrade to paid plan ($7/month)

### Security

- Never commit your `.env` file
- Never share your Gmail App Password
- The App Password only works for sending emails (not accessing your account)
- You can revoke App Passwords anytime from Google Account settings

### Email Limits

Gmail SMTP free tier allows:
- 500 emails per day
- 100 recipients per message

This is more than enough for a contact form.

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google Account
- Check that the App Password is entered correctly (no spaces)

### "Connection timeout" error
- Check your internet connection
- Verify Gmail SMTP is not blocked by your firewall
- Try a different network

### Emails not arriving
- Check spam/junk folder
- Verify the recipient email (info@kuwonastudios.com) is correct
- Check Render logs for errors

### Cold start delays on Render
- This is normal for free tier
- Consider upgrading to paid plan if response time is critical
- Or use a ping service to keep it awake (though this uses your free hours)

## API Endpoints

### GET /
Health check endpoint
- Returns: `{ status: 'OK', message: 'Contact form API is running' }`

### POST /api/contact
Submit contact form
- Body (JSON):
  ```json
  {
    "name": "string (required)",
    "email": "string (required)",
    "phone": "string (optional)",
    "company": "string (optional)",
    "description": "string (required)"
  }
  ```
- Success Response: `{ success: true, message: 'Message sent successfully' }`
- Error Response: `{ success: false, message: 'Error message' }`

## Support

For issues or questions, contact Kuwona Digital at info@kuwonastudios.com
