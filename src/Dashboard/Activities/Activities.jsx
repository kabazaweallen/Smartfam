import React, { useState } from 'react'
import Notiflix from 'notiflix';
import "./activities.css";
import { AiFillBank } from "react-icons/ai";
import { Link } from 'react-router-dom';
import ActivityNot from './ActivityNot';


function Activities() {
const [activity,setActivity]=useState()
const[loading,setLoading]=useState(false)

function openActivity(){
  setActivity((prevActivity)=>!prevActivity)
}
function handleActivity(){
openActivity()
setTimeout(()=>{
  window.location.href="/admin"
},3000)
setLoading(true)
  
}
  return (
    <div className='cattles-manage-wrapper'>
      <div className="activity-box">
        <p className='p-activity'>Activities</p>
        <div className="activity-t-decs">
          Select any activity to perform
        </div>
      </div>
      {loading && (
      <div className='loading-wrapper'>
         {activity && (<ActivityNot/>)}
  <div className='loading-indicator'>
        <span class="loader"></span>
        <p>please wait ....</p>
           </div>
      </div>
    )}
      <div className="all-box">
        <div to="/admin" onClick={handleActivity} className="pasture-box">
          <AiFillBank />
          <nav>
            Pasture Movement
          </nav>
          <p>
            Move animal from Pasture to Pasture, add new Pasture Activities
          </p>
        </div>
        <div onClick={handleActivity} to="/admin/activities/treatment" className="pasture-box">
          <AiFillBank />
          <nav>
            New Treatment
          </nav>
          <p>
            Create new treatment, add new medications and dosage for treatment.
          </p>
        </div>


        <div onClick={handleActivity}  className="pasture-box">
          <AiFillBank />
          <nav>
            Weight Measurement
          </nav>
          <p>
            Record Measure weights for the animal and the also add in bulk quantity
          </p>
        </div>
        <div onClick={handleActivity} className="pasture-box">
          <AiFillBank />
          <nav>
            Sale
          </nav>
          <p>
            Record sale of your cattle in your system to keep track of each animal's status
          </p>
        </div>
        <div onClick={handleActivity} to="" className="pasture-box">
          <AiFillBank />
          <nav>
            Yearling
          </nav>
          <p>
            Helps you wean calves, record yearling weights, calculate adjusted weights.
          </p>
        </div>
        <div onClick={handleActivity} className="pasture-box">
          <AiFillBank />
          <nav>
            Weaning
          </nav>
          <p>
            Record production details in Cattlytics track breeding.
          </p>
        </div>
        <div onClick={handleActivity} className="pasture-box">
          <AiFillBank />
          <nav>
            Pregnancy Check
          </nav>
          <p>
            Record production details in Cattlytics track pregnancy check.
          </p>
        </div>
        <div onClick={handleActivity} className="pasture-box">
          <AiFillBank />
          <nav>
            Castration
          </nav>
          <p>
Measure weights for the animal and also add in bulk quantity.          </p>
        </div>
      </div>
    </div>
  )
}

export default Activities