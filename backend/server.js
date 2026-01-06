const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter using Gmail SMTP with explicit configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
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

  // Email content to send to carolyne@kuwonastudios.com
  const mailOptions = {
    from: process.env.GMAIL_USER,
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
    `,
    text: `
Thank you for reaching out!

Hi ${name},

We've received your message and will get back to you as soon as possible.

Many thanks,
Michael and Carolyne
Founders, Kuwona
https://digital.kuwonastudios.com
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
