import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { email, message } = await request.json();

  if (!email || !message) throw new Error('Email & message must be set.')

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailHtml = `
  <html lang="en">  
    <body>
      <b>From:\n</b>
      <h2>${email}</h2>
      <b>Message:\n</b>
      <p>${message}</p>    
    </body>
  </html>
  `;

  const options = {
    from: process.env.EMAIL_USER,
    to: "Contact Form <noreply@sirine.online>",
    subject: 'Message from Contact Form',
    html: emailHtml,
  };

  await transporter.sendMail(options);

  return NextResponse.json({
    response: 'ok'
  })
}