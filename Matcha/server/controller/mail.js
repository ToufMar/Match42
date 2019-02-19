var mail = require('nodemailer');

let mailOptionInscription = (link) => ({
    from: 'rotureau.martin@gmail.com',
    to: 'rotureau.martin@gmail.com',
    subject: 'Inscription to Matcha',
    html: "Welcome on Matcha<br/>Please click on this link to confirm your inscription :). <br/><a href="+link+">Click here</a>"
});

let transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user: 'rotureau.martin@gmail.com',
        pass: 'Cachou37'
    }
});

let sendMail = {
    inscription: (link) => {
        transporter.sendMail(mailOptionInscription(link), (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log('envoyé')
        })
    },
    
}

module.exports = sendMail;