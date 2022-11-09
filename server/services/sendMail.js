import nodemailer from "nodemailer"
import sendmail from "sendmail"
import dotenv from "dotenv"
dotenv.config()
// const sendMail = async (mail, subject, text) => {

//   // var transporter = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //     user: 'rajmultiplex1@gmail.com',
//   //     pass: process.env.EMAIL_PASSWORD
//   //   }
//   // });

//   // let transporter = nodemailer.createTransport({
//   //   host: "smtp.gmail.com",
//   //   port: 465,
//   //   secure: true, // true for 465, false for other ports
//   //   auth: {
//   //     user: 'rajmultiplex1@gmail.com', // generated ethereal user
//   //     pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//   //   },
//   // });

//   // let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'cielo30@ethereal.email',
//       pass: '4PEbpQZsBHZ1zGU4FJ'
//     },
//   });

//   var mailOptions = {
//     from: 'cielo30@ethereal.email',
//     to: "rajmultiplex1@gmail.com",
//     subject: subject,
//     text: text
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

const mail = async (mail, subject, text) => {
  sendmail({
    from: 'rajmultiplex1@gmail.com',
    to: 'ramrojan786@gmail.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function (err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
}

export default mail