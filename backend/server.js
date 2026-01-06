const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Verify Resend is configured
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set');
} else {
  console.log('Resend email service is ready');
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Contact form API is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company, description } = req.body;

  // Validate required fields
  if (!name || !email || !description) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and description are required'
    });
  }

  try {
    // Send email to carolyne@kuwonastudios.com
    const notificationResult = await resend.emails.send({
      from: 'Kuwona <onboarding@resend.dev>', // Use resend.dev for testing, or your verified domain
      replyTo: email,
      to: 'carolyne@kuwonastudios.com',
      subject: `New Contact Form Submission from ${name} | Kuwona Digital`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted on ${new Date().toLocaleString()}</small></p>
      `
    });
    console.log('Notification email sent:', notificationResult);

    // Send auto-reply to the sender
    const autoReplyResult = await resend.emails.send({
      from: 'Kuwona <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Kuwona',
      html: `
        <p>Thank you for reaching out!</p>
        <br>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <br>
        <p>Many thanks,<br>
        Michael and Carolyne<br>
        Founders, <a href="https://digital.kuwonastudios.com">Kuwona</a></p>
      `
    });
    console.log('Auto-reply email sent to:', email, autoReplyResult);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
