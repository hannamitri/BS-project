// /////////////////////////////////////////////////////
// mailer.config.js
//  -   Mailer configuration stored here
// /////////////////////////////////////////////////////

const nodemailer = require('nodemailer');
const { NamedModulesPlugin } = require('webpack');

/*
    Configuring the SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport(
  {
    host: 'secure.emailsrvr.com',
    port: 465,
    auth: {
      user: 'jamie@ptptips.com.au',
      pass: 'Grape394Panda'
    },
  });

// Mail templates

const verificationForClient = link => `
    Hello,<br/> <br/>
    Thank you for registering on our website.<br>
    Please click on the link below to verify your email address
    <br><a href='${link}'>Click HERE </a><br>
    Once verified and the amount is received, you will be able to login and use our system.<br>
    <b>Thank you for using Smart Punting System.</b>
    <br/>
    Sincerely,
    <br/>
     Smart Punting Team
    <br/>`;

const contactUs = name => `
    Dear '${name}',<br/> <br/>
    Your message has been received.<br>
    Please expect a response from us within 48 hours.<br>
    <b>Thank you for using Smart Punting System.</b>
    <br/>
    regards,
    <br/>
     Smart Punting Team
    <br/>`;

const contactUsTeam = (fName, lName, email, phone, message) => `
    Contact Us email received from:<br/> <br/>
    email: '${email}' <br/>
    first Name: '${fName}' <br/>
    last Name: '${lName}' <br/>
    phone: '${phone}' <br/>
    message: '${message}' <br/>
    Please response within 48 hours.<br>
    regards,
    <br/>
     Smart Punting Team
    <br/>`;

const silverSelectionMessage = (selectionArray, coins, name) => `
    Dear ${name},<br/> <br/>
    Our selections for today is the following:
    <br/>
    <table style="text-align: left; border-spacing: 5px; background-color: #d5d5d7; border-radius: 10px">
      <tr>
        <th>Race Time</th>
        <th>Venue</th>
        <th>Race no</th>
        <th>Good selection</th>
        <th>Soft selection</th>
      </tr>
      ${selectionArray.map((zone, i)=>{
        if(i+1 <= coins){
          return (`<tr>
                    <td>${zone.race_time}</td>
                    <td>${zone.race_venue}</td>
                    <td>${zone.race_no}</td>
                    <td>${zone.horse_no_good}</td>
                    <td>${zone.horse_no_soft}</td>
                  </tr>`)
        }else{null}
      }).join('')}
    </table>
    <b>Thank you for using Smart Punting System.</b>
    <br/>
    Sincerely,
    <br/>
     Smart Punting Team
    <br/>`;

const silverBuyMessage = (selectionArray, name) => `
    Dear ${name},<br/> <br/>
    Our selections for today is the following:
    <br/>
    <table style="text-align: left; border-spacing: 5px; background-color: #d5d5d7; border-radius: 10px">
      <tr>
        <th>Race Time</th>
        <th>Venue</th>
        <th>Race no</th>
        <th>Good selection</th>
        <th>Soft selection</th>
      </tr>
      ${selectionArray.map((zone, i)=>{
        return (`<tr>
                  <td>${zone.race_time}</td>
                  <td>${zone.race_venue}</td>
                  <td>${zone.race_no}</td>
                  <td>${zone.race_selection}</td>
                  <td>${zone.race_selection_soft}</td>
                </tr>`)
      }).join('')}
    </table>
    <b>Thank you for using Smart Punting System.</b>
    <br/>
    Sincerely,
    <br/>
     Smart Punting Team
    <br/>`;


module.exports = {
  smtpTransport,
  templates: {
    verificationForClient,
    contactUs,
    contactUsTeam,
    silverSelectionMessage,
    silverBuyMessage,
  }
};
