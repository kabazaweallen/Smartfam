import React from 'react'
import cow2 from '/images/cow2.jpeg'
import person1 from '/images/person1.jpg'
import person2 from '/images/person2.jpg'
import person3 from '/images/person3.jpg'

const Team = () => {
  return (
    <div className='team-container'>
        <div className="team-header">
            <h2>Our Teams</h2>
            <p>We Have a Proffessional, dedicated to providing Excellent Services.</p>
        </div>
      
    <div className="team-images">
    <div className="cards"id='card1'>
           <img src={person1} alt="" className="image"/>
           <div className="text-overlay">
        
          <h3>Jorge</h3>
          <h3 className='bold'>Williams</h3>
          <p>Farmer</p>
       </div>
    </div>
  <div className="cards" id='card2'>
           <img src={person2} alt=""  className='image'/>
           <div className="text-overlay">

         
           <h3>Laura</h3>
           <h3 className='bold'>Thomas</h3>
          <p>A proffesional vertinary</p>

       </div>
    </div>
<div className="cards"id='card3'>
           <img src={person3} alt=""  className="image" />
           <div className="text-overlay">
          
           <h3>Luis</h3>
           <h3 className='bold'>Cimino</h3>
          <p>Cowboy</p>

       </div>
    </div>
    </div>

</div>
  )
}

export default Team