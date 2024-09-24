import React from 'react'
import { useState } from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'

function NewBirth() {


  const [earTag, setEarTag] = useState()
  const [BirthDate, setBirthDate] = useState()
  const [BirthWeight, setBirthWeight] = useState()
  const [Notes, setNotes] = useState()
  const[activityType,setActivityType]=useState()
  const[loading,setLoading]=useState(false)
  const [errors, setErrors] = useState({
    earTag: '', BirthDate: '', BirthWeight: '', notes: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { earTag: '', BirthDate: '', BirthWeight: '', Notes: '' };

    if (!earTag) {
      valid = false;
      newErrors.earTag = 'Eartag is required';
    }

    if (!BirthDate) {
      valid = false;
      newErrors.BirthDate = 'Birth date is required';
    }
    if (!BirthWeight) {
      valid = false;
      newErrors.BirthWeight = 'Birth weight is required';
    }

    setErrors(newErrors);
    return valid;
  };


  const payload = { earTag, BirthDate, BirthWeight, Notes,activityType }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (validateForm()) {
      axiosclient.post('/api/v1/Activity/recordNewBirth', payload).then(() => {
        Notiflix.Notify.success("New Birth Recorded successful!");
        setTimeout(() => {
          window.location.href = "/admin/report"
        }, 2000);
        
      }).catch((error) => {
        Notiflix.Notify.failure('Failed to Add Activity')
      })
    }
    else {
      setLoading(false)
    }



  }

  return (
    <div className='cattles-manage-wrapper'>
      <div className="dead-actity-h1">
        <p>New Birth</p>
      </div>
      <div className="dead-activity-form">

        <div className="edit-cattle-wrapper">
          <form action="" onSubmit={handleSubmit}>
            <div className="dead-wrapper">
              <div className="flex-direction">
                <label htmlFor="">EarTag<span>*</span></label><br />
                <div className="error">{errors.earTag}</div>
                <input type="text" placeholder='EarTag' onChange={(e) => setEarTag(e.target.value)} />
              </div>
              <div className="flex-direction">
                <label htmlFor="">Birth Date<span>*</span></label><br />
                <div className="error">{errors.BirthDate}</div>
                <input type="Date" onChange={(e) => setBirthDate(e.target.value)} />
              </div>

              <div className="flex-direction">
                <label htmlFor="">Birth weight<span>*</span></label><br />
                <div className="error">{errors.BirthWeight}</div>
                <input type="text" placeholder='Birth weight' onChange={(e) => setBirthWeight(e.target.value)} />
              </div>
              <div className="flex-direction">
                <label htmlFor="">Activity Type<span>*</span></label><br />
                <select name="" id="" onChange={(e)=>setActivityType(e.target.value)}>
                        <option value="" disabled selected> select Activity</option>
                        <option value="treatment">treatment</option>
                        <option value="sale">sale</option>
                        <option value="weaning">weaning</option>
                        <option value="newbirth">newbirth</option>
                        <option value="castration">castration</option>
                        <option value="dead">dead</option>
                        <option value="breeding">breeding</option>
                        <option value="pregnancyCheck">pregnancyCheck</option>
                        <option value="dead">promote to bull</option>
                      </select>
              </div>
            </div>
            <div className="tex-note-wrapper">
              <div className="flex-direction">
                <label htmlFor="">Note<span>*</span></label><br />
                <input type="text" placeholder='enter note' onChange={(e) => setNotes(e.target.value)} />
              </div>
            </div>
            <div className="btn-edit-wrapper">
              <button className='btn-delete'>Cancel</button>
              <button type='submit' className='btn-edit'>{loading ?(<>Loading...</>):(<>Save</>)}</button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default NewBirth