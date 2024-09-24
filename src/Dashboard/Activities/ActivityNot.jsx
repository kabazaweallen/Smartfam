import React from 'react'
import "./activities.css";
import { FaTimes } from 'react-icons/fa';
function ActivityNot() {
  return (
    <div className='activityy-not-wrapper'>
        <p>Please select cow to perform this activity</p>
        <FaTimes/>
    </div>
  )
}

export default ActivityNot