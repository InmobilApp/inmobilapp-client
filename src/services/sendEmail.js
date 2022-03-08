import axios from "axios";

const baseUrl = "/api/sendemail";

function sendEmail(name, email, msg) {
  return axios.post(baseUrl, {
    name,
    email,
    template: msg,
  });
}

export default sendEmail;
