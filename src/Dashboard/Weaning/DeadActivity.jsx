import React, {useState} from 'react'
 import '../cattles/cattles.css'
import './Weaning.css'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'



function DeadActivity() {

  const [DeathDate, setDeathDate] = useState()
  const [ deathCause, setDeathCause] = useState()
  const [earTag, setEarTag] = useState()
  const[activityType,setActivityType]=useState()
  const [Notes, SetNotes] = useState()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ earTag: '', DeathDate: '',    deathCause: '', Notes: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { earTag: '', DeathDate: '',   deathCause: '', Notes: '' };

    if (!earTag) {
      valid = false;
      newErrors.earTag = 'Eartag is required';
    }
    if (!deathCause) {
      valid = false;
      newErrors. deathCause = 'Death cause is required';
    }
    if (!DeathDate) {
      valid = false;
      newErrors.DeathDate= 'Death date is required';
    }
    if (!Notes) {
      valid = false;
      newErrors.Notes = 'Notes is required';
    }
    setErrors(newErrors);
    return valid;
  };


  const payload = { earTag,  deathCause, DeathDate, Notes,activityType}

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (validateForm()) {
      axiosclient.post('/api/v1/Activity/recordDeadActivity', payload).then(() => {
        Notiflix.Notify.success("Dead activity Recorded successful!");
        setLoading(true)
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
        <p>Dead Activty</p>
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
                <label htmlFor="">Dearth Cause<span>*</span></label><br />
                <div className="error">{errors. deathCause}</div>
                <select name="" id="" onChange={(e) => setDeathCause(e.target.value)}>
                  <option value="fever">fever</option>
                  <option value="Accident">Accident</option>
                  <option value="other"> other</option>
                </select>
              </div>
              <div className="flex-direction">
                <label htmlFor="">Death Date<span>*</span></label><br />
                <div className="error">{errors.DeathDate}</div>
                <input type="date" onChange={(e) => setDeathDate(e.target.value)} />
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
                <div className="error">{errors.Notes}</div>
                <input type="text" placeholder='enter note' onChange={(e) => SetNotes(e.target.value)} />
              </div>
            </div>
            <div className="btn-edit-wrapper">
              <button className='btn-delete'>Cancel</button>
              <button type='submit' className='btn-edit'>
                {loading ? (<>loading...</>) : (<>Save</>)}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default DeadActivity