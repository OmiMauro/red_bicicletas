var nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maiya.towne93@ethereal.email',
        pass: 'xgXCfKeZEvVdfVU2JG'
    }
};

module.exports = nodemailer.createTransport(mailConfig);