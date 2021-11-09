const nodemailer = require("nodemailer");

async function Send(receiver, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: receiver,
        subject: 'Ingreso al sistema',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

exports.Send  = Send;