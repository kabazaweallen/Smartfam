import React, { useState } from 'react'
import '../cattles/cattles.css'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
function ActivityModel({openActivity,}) {
  const [selectedActivity, setSelectedActivity] = useState(null)
 const navigate = useNavigate()
 
 const handleRadioChange = (event) => {
  setSelectedActivity(event.target.id);
};
  const handleOkClick = () => {

    // Check if an activity is selected
    if (selectedActivity) {
      // Perform navigation to the selected activity route
       navigate(`/admin/activities/${selectedActivity.toLowerCase()}`);
    } else {
      // Handle the case where no activity is selected
      console.log('Please select an activity before clicking Ok');
    }
  };
  return (
    <div className='activity-model-wrapper'>
    <div className="activity-modal">
      <div className="flex-top">
        <p>Please select activity</p>
        <FaTimes onClick={openActivity} />
      </div>
      <div className="modal-bodys">
        <div className="body1">
          <div className="d-flex-10">
            <input type="radio" name="activityType" id="treatment" onChange={handleRadioChange} /><span>New treatment</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" id="sale" onChange={handleRadioChange} /><span>New sale</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" id="breeding" onChange={handleRadioChange} /><span>Breeding</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" id="castration" onChange={handleRadioChange} /><span>castration</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" id="new-birth" onChange={handleRadioChange} /><span>New birth</span>
          </div>
        </div>
        <div className="body2">
          <div className="d-flex-10">
            <input type="radio" name="activityType" onChange={handleRadioChange} id="pregnancy-check" /><span>pregnancy check</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" onChange={handleRadioChange} id="dead-activity" /><span>Dead Activity</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" onChange={handleRadioChange} id="promote-tobull" /><span>Promoted To bull</span>
          </div>
          <div className="d-flex-10">
            <input type="radio" name="activityType" onChange={handleRadioChange} id="weaning" /><span>Weaning</span>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="modal-btn">
          <button type='button' onClick={openActivity} className='btn-cancel'>Cancel</button>
          <button className='btn-ok' onClick={handleOkClick}>Ok</button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ActivityModel