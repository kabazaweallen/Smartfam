import Notiflix from 'notiflix'
import React, { useState } from 'react'
import axiosclient from '../../axiosClient'


function PreginacyCheck() {

    const [checkDate, setCheckDate] = useState()
    const [method, setMethodUsed] = useState()
    const [result, setResult] = useState()
    const [earTag, setEarTag] = useState()
    const [notes, SetNotes] = useState()
    const [loading, setLoading] = useState(false);
    const[activityType,setActivityType]=useState()

    const [errors, setErrors] = useState({ earTag: '', result: '', method: '', checkDate: '' });

    const validateForm = () => {
        let valid = true;
        const newErrors = { earTag: '', result: '', method: '', checkDate: '' };

        if (!earTag) {
            valid = false;
            newErrors.earTag = 'Eartag is required';
        }
        if (!result) {
            valid = false;
            newErrors.result = 'Result is required';
        }
        if (!method) {
            valid = false;
            newErrors.method = 'Method is required';
        }
        if (!checkDate) {
            valid = false;
            newErrors.checkDate = 'Check date is required';
        }
        setErrors(newErrors);
        return valid;
    };


    const payload = { earTag,result, method, checkDate,notes,activityType}

    const handleSubmit = (e) => {
        e.preventDefault()
setLoading(true)
        if (validateForm()) {
            axiosclient.post('/api/v1/Activity/recordPurginacy', payload).then(() => {
                Notiflix.Notify.success("Preginancy Recorded successful!");
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
                <p>Pregnancy Activty</p>
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
                                <label htmlFor="">check date<span>*</span></label><br />
                                <div className="error">{errors.checkDate}</div>
                                <input type="date" onChange={(e) => setCheckDate(e.target.value)} />
                            </div>
                            <div className="flex-direction">
                                <label htmlFor="">Method used<span>*</span></label><br />
                                <div className="error">{errors.method}</div>
                                <select name="" id="" onChange={(e) => setMethodUsed(e.target.value)}>
                                    <option value="blood">blood</option>
                                    <option value="observation">observation</option>
                                    <option value="Rectal Palpation">Rectal Palpation </option>
                                    <option value="ultrasound">ultrasound</option>
                                </select>
                            </div>
                            <div className="flex-direction">
                                <label htmlFor="">Result<span>*</span></label><br />
                                <div className="error">{errors.result}</div>
                                <select name="" id="" onChange={(e) => setResult(e.target.value)}>
                                    <option value="blood">Exposed</option>
                                    <option value="Preginant">Preginant</option>
                                    <option value="open">open </option>
                                </select>
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
                                <label htmlFor="">Notes<span>*</span></label><br />
                                <input type="text" placeholder='Type notes here..' onChange={(e) => SetNotes(e.target.value)} />
                            </div>
                        </div>
                        <div className="btn-edit-wrapper">
                            <button className='btn-delete'>Cancel</button>
                            <button type='submit' className='btn-edit'>
                            {loading ? (<>Loading...</>) : (<>Save</>)}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default PreginacyCheck