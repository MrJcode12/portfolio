import { Request, Response } from 'express';
import Contact from '../models/Contact';
import nodemailer from 'nodemailer';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message }: ContactRequest = req.body;

    // Validate input
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
      return;
    }

    // Save to database (optional - only if MongoDB is connected)
    let savedContact;
    try {
      const contact = new Contact({ name, email, message });
      savedContact = await contact.save();
    } catch (dbError) {
      console.log('Database save failed (this is optional):', dbError);
      // Continue even if DB save fails
    }

    // Send email (optional - only if email is configured)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_EMAIL || 'jpgabarda@up.edu.ph',
          subject: `Portfolio Contact: ${name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.log('Email send failed (this is optional):', emailError);
        // Continue even if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Message received successfully',
      data: savedContact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};
