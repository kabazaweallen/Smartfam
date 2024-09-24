import React from 'react'
import farmlogo from '/images/farmlogo.jpg'
import { FaFacebook } from 'react-icons/fa'

function Footer() {
  return (
    <div className='footer-container'>
      <div className="footer-row">
              <div className="footer-logo">
             <img src={farmlogo} alt="Logo" />
             <p>
                  We are an efficient, competitive, innovative
                  and entrepreneurial agricultural sector,
                  which serves providing 
                  the population with a source of food generating 
                  opportunities for the Farmers.
                  
                </p>
              </div>
          <div className="footer-text2">
                <h2>Quick Links</h2>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Teams</a></li>
                    <li><a href="">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-text3">
                  <h2>Newletters</h2>
                  <p>Subscribe to our newsletter to receive
                     the latest news about our services. </p>
                  <div className="newsletter-form">
                <form>
                  <span className="input-box email-wrap"id='inputhome'>
                    <input type="email"className="form-input" placeholder="Enter Your Email" required/>
                    <button className="footer-btn">
                      <span>Sign Up</span>
                    </button>
                  </span>
                </form>
              </div>
              </div>
              </div>
              <div className="footer-bottom">
                <hr/>
                <p><span>© </span>2023 Smart Farming. All rights reserved.</p>
              </div>
    </div>
  )
}

export default Footer