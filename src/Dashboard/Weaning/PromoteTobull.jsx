import React, {useState} from 'react'
import axiosclient from '../../axiosClient'
import Notiflix from 'notiflix'
import SuccessActivity from '../Activities/SuccessActivity'



function PromoteTobull() {
  const [promotionDate, setPromotionDate] = useState()
  const [earTag, setEarTag] = useState()
  const [notes, SetNotes] = useState()
  const [loading, setLoading] = useState(false);
  const[activityType,setActivityType]=useState()

  const [errors, setErrors] = useState({ earTag: '', promotionDate: '', notes: ''});
  const [activity,setActivity]=useState()
  const validateForm = () => {
    let valid = true;
    const newErrors = { earTag: '', promotionDate: '', notes: '' };

    if (!earTag) {
      valid = false;
      newErrors.earTag = 'Eartag is required';
    }
    if (!promotionDate) {
      valid = false;
      newErrors.promotionDate = 'Promotion date is required';
    }
    if (!notes) {
      valid = false;
      newErrors.notes = 'Notes is required';
    }
    setErrors(newErrors);
    return valid;
  };


  const payload = { earTag, promotionDate, notes,activityType }
  function openActivity(){
    setActivity((prevActivity)=>!prevActivity)
  }

  function handleActivity(){
    openActivity()
    setTimeout(()=>{
      window.location.href="/admin/report/"
    },3000)
    setLoading(true)
    }

  const handleSubmit = (e) => {
    e.preventDefault()
setLoading(true)
    if (validateForm()) {
      axiosclient.post('/api/v1/Activity/recordPromoted', payload).then(() => {
      Notiflix.Notify.success('Promote to bull recorded successfully');
        handleActivity()
        setLoading(true)
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
        <p>Promote To bull</p>
      </div>
      {loading && (
      <div className='loading-wrapper'>
         {activity && (<SuccessActivity/>)}
  <div className='loading-indicator'>
        <span class="loader"></span>
           </div>
      </div>
    )}
      <div className="dead-activity-form">

        <div className="edit-cattle-wrapper">
          <form action="" onSubmit={handleSubmit}>
            <div className="dead-wrapper">
              <div className="flex-direction">
                <label htmlFor="">EarTag<span>*</span></label><br />
                <div className="error">{errors.earTag}</div>
                <input type="text" placeholder='EarTag' onChange={(e) => setEarTag(e.target.value)}/>
              </div>
              <div className="flex-direction">
                <label htmlFor="">Promtion Date<span>*</span></label><br />
                <div className="error">{errors.promotionDate}</div>
                <input type="Date" onChange={(e) => setPromotionDate(e.target.value)}/>
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
                <div className="error">{errors.notes}</div>
                <input type="text" placeholder='enter note' onChange={(e) => SetNotes(e.target.value)}/>
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

export default PromoteTobull