/**
 * File: sendEmail.ts
 * Project: music-theory-backend
 * Version 1.0.0
 * File Created: Monday, 7th December 2020 10:24:16 pm
 * Author: Eoan O'Dea (eoan@web-space.design)
 * -----
 * File Description:
 * Last Modified: Tuesday, 8th December 2020 2:31:11 pm
 * Modified By: Eoan O'Dea (eoan@web-space.design>)
 * -----
 * Copyright 2020 WebSpace, WebSpace
 */

// import { createTransport, getTestMessageUrl } from "nodemailer";
// import { pipeError } from "../pipeError";

// export const sendEmail = async (to: string, html: string) => {
//   // const { user, pass } = await createTestAccount();
//   // console.log('email stuff:', user, pass);
//   const transporter = createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: { user: "sim.conn@ethereal.email", pass: "QMe6VcxPE6nYA3GgnW" },
//   });

//   // send mail with defined transport object
//   transporter
//     .sendMail({
//       from: '"Greenstar Aviation" <foo@example.com>', // sender address
//       to, // list of receivers
//       subject: "Greenstar Aviation", // Subject line
//       html, // html body
//     })
//     .then((info: any) =>
//       console.log("Preview URL: %s", getTestMessageUrl(info))
//     )
//     .catch(pipeError);
// };
