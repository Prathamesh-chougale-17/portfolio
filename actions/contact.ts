"use server";

import { z } from "zod";
import nodemailer from "nodemailer";

const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export interface ContactFormState {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Extract form values
  // Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  // If form validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Get validated data
  const { name, email, subject, message } = validatedFields.data;

  try {
    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: process.env.EMAIL_ADMIN,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact Response</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .email-container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border-top: 5px solid #4a6cf7;
            }
            .header {
              background-color: #4a6cf7;
              padding: 20px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 24px;
              letter-spacing: 1px;
            }
            .content {
              padding: 30px;
              background-color: #ffffff;
            }
            .contact-info {
              background-color: #f5f8ff;
              border-radius: 6px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .message-box {
              background-color: #f5f8ff;
              border-left: 4px solid #4a6cf7;
              padding: 15px;
              margin-top: 20px;
              border-radius: 0 4px 4px 0;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              color: #666;
            }
            .social-icons {
              margin-top: 15px;
            }
            .social-icons a {
              display: inline-block;
              margin: 0 8px;
              color: #4a6cf7;
              text-decoration: none;
            }
            h2 {
              color: #4a6cf7;
              margin-top: 0;
              font-weight: 600;
            }
            p {
              margin: 10px 0;
            }
            .label {
              font-weight: 600;
              color: #555;
              margin-right: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Portfolio Contact</h1>
            </div>
            <div class="content">
              <h2>New Message Received</h2>
              <p>Thank you for reaching out! Here's a summary of your message:</p>
              
              <div class="contact-info">
                <p><span class="label">Name:</span> ${name}</p>
                <p><span class="label">Email:</span> ${email}</p>
                <p><span class="label">Subject:</span> ${subject}</p>
              </div>
              
              <div class="message-box">
                <p><span class="label">Message:</span></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              </div>
              
              <p style="margin-top: 25px;">I'll get back to you as soon as possible.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Portfolio Name</p>
              <div class="social-icons">
                <a href="#">LinkedIn</a> | 
                <a href="#">GitHub</a> | 
                <a href="#">Twitter</a>
              </div>
              <p style="margin-top: 15px; font-size: 12px;">This is an automated response to your contact form submission.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // send thank you email
    const thankYouMailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Reaching Out</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .email-container {
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border-top: 5px solid #4a6cf7;
            }
            .header {
              background-color: #4a6cf7;
              padding: 20px;
              text-align: center;
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 24px;
              letter-spacing: 1px;
            }
            .content {
              padding: 30px;
              background-color: #ffffff;
            }
            .message-box {
              background-color: #f5f8ff;
              border-left: 4px solid #4a6cf7;
              padding: 15px;
              margin-top: 20px;
              border-radius: 0 4px 4px 0;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              color: #666;
            }
            .social-icons {
              margin-top: 15px;
            }
            .social-icons a {
              display: inline-block;
              margin: 0 8px;
              color: #4a6cf7;
              text-decoration: none;
            }
            h2 {
              color: #4a6cf7;
              margin-top: 0;
              font-weight: 600;
            }
            p {
              margin: 10px 0;
            }
            .label {
              font-weight: 600;
              color: #555;
              margin-right: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Thank You for Reaching Out</h1>
            </div>
            <div class="content">
              <h2>Hi ${name.split(" ")[0]},</h2>
              <p>Thank you for reaching out! Here's a summary of your message:</p>
              
              <div class="message-box">
                <p><span class="label">Message:</span></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              </div>
              
              <p style="margin-top: 25px;">I'll get back to you as soon as possible.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Portfolio Name</p>
              <div class="social-icons">
                <a href="#">LinkedIn</a> | 
                <a href="#">GitHub</a> | 
                <a href="#">Twitter</a>
              </div>
              <p style="margin-top: 15px; font-size: 12px;">This is an automated response to your contact form submission.</p>
            </div>
          </div>
      </body>
      </html>
    `,
    };

    // Send email
    const recieve = await transporter.sendMail(mailOptions);
    if (recieve) {
      await transporter.sendMail(thankYouMailOptions);
    }

    // Return success
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      errors: {
        _form: ["Failed to send your message. Please try again later."],
      },
      success: false,
    };
  }
}
