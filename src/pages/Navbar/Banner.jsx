import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Banner = () => {
  const images = [
    '../../../images/cow3.jpeg',
    'https://plus.unsplash.com/premium_photo-1677850455009-d67da2b774c9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0dGxlfGVufDB8fDB8fHww',
    'https://media.istockphoto.com/id/639589960/photo/brown-white-hereford-cow-young-calf.jpg?s=612x612&w=0&k=20&c=MfE8pKasSv7gqplTuIQ0zpeypOflONkn5EyUReId55U=',
  ];

  let currentSlide = 0;

function startSlider() {
  let imageCount = document.querySelectorAll("img");
  let images = document.querySelector("ul");

  if (imageCount.length === 0) {
    imageCount = document.querySelectorAll("img");
    images.style.transform = `translateX(0px)`;
    return;
  }

  images.style.transform = `translateX(-${currentSlide * 550}px)`;

  // Remove the active class from all dots
  let dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Add the active class to the current dot
  dots[currentSlide].classList.add("active");

  if (currentSlide === imageCount.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
}

setInterval(() => {
  startSlider();
}, 2000);

  return (
    <div className="slider-container">
      <Slide>
        {images.map((image, index) => (
          <div key={index} className="each-slide-effect">
            <div style={{ backgroundImage: `url(${image})` }}>
              <span>
                <div className="text">
                <h1 className="text-center1">A Professional Of Hope</h1>
                <h2 className="text-center2">The Pure Naturally <br/>Healing</h2>
                <p className="bann">
                  Growing Community by Inspiring healthy is our<br/> Commitment with
                  farmers, The abundant living on the field
                </p>
                <button className="ghost">Learn More</button>
                </div>
              </span>
            </div>
            <div className="social-media">
              <ul>
                <li>
                  <a href="#" className="icon">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="#" className="icon">
                    <FaYoutube />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
                                                                                                                                                                                                                                                                                        


export default Banner;
