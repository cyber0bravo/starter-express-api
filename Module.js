const nodemailer= require('nodemailer');

class Module{
   PrintData(Sender,Reciever,Subject,Text,psw){

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: Sender,
          pass: psw
        }
      });

        const mailOptions = {
            from: Sender,
            to: Reciever,
            subject: Subject,
            html: Text
          };
          try{
            transporter.sendMail(mailOptions, function(error, info){ });
            transporter.close();
            return "true";
        }catch(e){
          transporter.close();
          return "false";
        }
    }

}
module.exports=Module;
