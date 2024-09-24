import React from 'react'

function Contact() {
  return (
    <div className='contact-container'>
    <div className="contact-header">
      <h1>Contact</h1>
      <h2>Keep in Touch</h2>
      <p>We will be the leading company in the national market with each of our products.</p>
    </div>
    <div className="contact-form-container">
      <div className="contact-form">
          <input type="text" placeholder="*Name"/>
      </div>
      <div className="contact-form">
          <input type="text" placeholder="*Email Address"/>
      </div>
    </div>
    <div className="contact-form-container2">
    <div className="contact-form2">
    <input type="text" placeholder="*Enter Your Phone"/>
    </div>
    <div className="contact-form2">
    <textarea placeholder="*Your Message"/>
    </div>
    </div>
  </div>
  )
}

export default Contact