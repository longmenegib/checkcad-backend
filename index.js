const express = require('express');
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

const formidable = require("formidable");

const whitelist = ["http://localhost:3000", "http://checkcad.herokuapp.com/"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("Hello world");
})

app.post('/checkcardblanced', (req, res)=>{
    const body = req.body;
    console.log('helllooooo');
    const formData = new formidable.IncomingForm();
    formData.parse(req, async(error, fields, files)=>{
        // const types = fields.type;

        // console.log(fields.front);
        // return;

        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'gibrillongmene@gmail.com',
                pass: 'moyu regi uoei ahmz'
            }
        });
        let mailOptions = {
            from: '"Djoumesse Bertrand" <djoumessebertrand41@gmail.com>', // sender address
            to: "gibrillongmene@gmail.com", // list of receivers
            subject: "Testing", // Subject line
            text: "test test test", // plain text body
            html: '<b>NodeJS Email Tutorial</b>', // html body
            attachments: [
                {   
                    path: fields.front
                },
                {   
                    path: fields.back
                },
                {   
                    path: fields.receipt
                },
            ]
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send({status: 401})
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            return res.send({status: 200});
        
        });
    })
})

var port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("listenning to port 5000")
});

