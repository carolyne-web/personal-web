const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

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

  // Email content to send to info@kuwonastudios.com
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'info@kuwonastudios.com',
    subject: `New Contact Form Submission from ${name}`,
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
    `,
    // Plain text version
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

Message:
${description}

Submitted on ${new Date().toLocaleString()}
    `
  };

  // Auto-reply to the sender
  const autoReplyOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Thank you for contacting Kuwona Digital',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Hi ${name},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore our services at <a href="https://kuwonastudios.com">kuwonastudios.com</a></p>
      <br>
      <p>Best regards,<br>The Kuwona Digital Team</p>
      <hr>
      <p><small>This is an automated response. Please do not reply to this email.</small></p>
    `,
    text: `
Thank you for reaching out!

Hi ${name},

We've received your message and will get back to you as soon as possible.

In the meantime, feel free to explore our services at kuwonastudios.com

Best regards,
The Kuwona Digital Team

---
This is an automated response. Please do not reply to this email.
    `
  };

  try {
    // Send email to info@kuwonastudios.com
    await transporter.sendMail(mailOptions);

    // Send auto-reply to the sender
    await transporter.sendMail(autoReplyOptions);

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
