const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "provide your own email",
       pass: "provide your own password",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail=async(to,subject,text,retries=3)=>{
    const mailOptions = {
      from: "provide your own email",

      to,
      subject,
      text,
    };

    for(let i=0;i<retries;i++){
        try{
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to} (Attempt ${i}) `);
            return true
         
        }
        catch(error){
            console.log(`Error sending email to ${to} (Attempt ${i})`);
            if(i===retries){
                console.log(`Email sending failed to ${to}`);
                
            }
        }
    }
    return false;
}

module.exports={sendEmail}