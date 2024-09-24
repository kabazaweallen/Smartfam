import React from 'react'
import cow10 from '/images/cow10.webp'
import cow8 from '/images/cow8.jpeg'

const About= () => {
  return (
    <div className='about-container'>
        <div className="about-header">
            <h1>About Us</h1>
        </div>
        <div className="about-main">
        <div className="about-text">
          <h2>Bring Growth with Our Cattle System </h2>
           <p> 
           Farmer’s data is managed is a journey all of agriculture
            is apart of beef up our efforts.
           Grass widely cultivated for its seed, a cereal grain
            which is a worldwide
            </p>
            <p> 
           Farmer’s data is managed is a journey all of agriculture
            is apart of beef up our efforts.
           Grass widely cultivated for its seed, 
           a cereal grain which is a worldwide
            </p>
            <button className='btn'>
              <span>Read More</span>
              
            </button>
          </div>
          <div className="about-image">
            <img src={cow10} alt="" />
          </div>
        </div>

        <div className="main2about-">
       <div className="about-image2">
            <img src={cow8} alt="" />
          </div>
          <div className="about-text2">
          <h2>Bring Growth with Our Milk Production </h2>
           <p> We provide leading solutions to agricultural and agroindustrial
             production through world-class products and services,
             always committed to meeting needs and expectations
            </p>
            <button className='btn'>
              <span>Read More</span>
            </button>
          </div>
        </div>   
    </div>
  )
}

export default About
