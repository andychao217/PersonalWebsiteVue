import axios from './index'

const sendMail = (name, email, subject, message) => {
  return axios.request({
    url: '/PHPMailer/sendmail.php',
    method: 'post',
    data: 'contactName=' + name +
      '&contactEmail=' + email +
      '&contactSubject=' + subject +
      '&contactMessage=' + message
  })
}

export {
  sendMail
}
