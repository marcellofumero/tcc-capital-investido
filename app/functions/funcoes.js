var enviaEmail = function(emailDe, emailPara, emailAssunto, emailTexto, emailHtml) {
    console.log('aqui')
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        //secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: "1ceb44523128e4",
            pass: "63dff7b9dc18e5"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: emailDe, // Endereço de e-mail de envio "From" <capitalinvestido@capitalinvestido.com.br>
        to: emailPara, // E-mails destinatários email1@email.com, email2@email.com
        subject: emailAssunto, // Assunto
        text: emailTexto, // Texto simples do corpo do e-mail
        html: emailHtml // Texo em Html do corpo do e-mail
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
   
};
exports.enviaEmail = enviaEmail;

var retiraCaracteresEspeciais = function(texto){   
    var er = /\^|~|\?|,|\*|\.|\-/g;
    texto = texto.replace(er, "");  
    return texto;
};
exports.retiraCaracteresEspeciais = retiraCaracteresEspeciais;