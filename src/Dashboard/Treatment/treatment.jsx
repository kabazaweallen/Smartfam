import React, { useState } from 'react'
import "./treatment.css"
import Notiflix from 'notiflix';
import axiosclient from '../../axiosClient'
import { useNavigate } from 'react-router-dom';
import SuccessActivity from '../Activities/SuccessActivity';

function treatment({cow}) {
    const [earTag,setEarTag]=useState()
    const[treatmentDate,setTreatmentDate]=useState()
    const[diseaseDiagnosed,setDiseaseDiaginised]=useState()
    const[dosageInml,setdosageInml]=useState()
    const[routeType,setRoutType]=useState()
    const[vaccinationDate,setvaccinationDate]=useState()
    const[vaccineAdministered,setvaccineAdministered]=useState()
    const[activityType,setActivityType]=useState()
    const [loading, setLoading] = useState(false);
    const [activity,setActivity]=useState()

    const payload = {earTag,treatmentDate,diseaseDiagnosed,dosageInml,routeType,vaccinationDate,activityType,vaccineAdministered}
    const [errors, setErrors] = useState({
        earTag: "",
        treatmentDate: "",
        diseaseDiagnosed: "",
        dosageInml:"",
        routeType:"",
        vaccinationDate:"",
        vaccineAdministered:"",
      });
      const validateForm = () => {
        let valid = true;
        const newErrors = {
            earTag: "",
            treatmentDate: "",
            diseaseDiagnosed: "",
            dosageInml:"",
            routeType:"",
            vaccinationDate:"",
            vaccineAdministered:"",
          } ;
    
        if (!earTag) {
          valid = false;
          newErrors.earTag = "earTag is required";
        }
    
        if (!treatmentDate) {
          valid = false;
          newErrors.treatmentDate = "treatment Date is required";
        }
        if (!diseaseDiagnosed) {
          valid = false;
          newErrors.diseaseDiagnosed = "this field is required";
        }
        if (!diseaseDiagnosed) {
            valid = false;
            newErrors.diseaseDiagnosed = "this field is required";
          }
          if (!vaccineAdministered) {
            valid = false;
            newErrors.vaccineAdministered = "Please fill this field";
          }
    
        setErrors(newErrors);
        return valid;
      };
  

      function handleredirect(){
        window.location.href = "/admin"
      }
      const navigate = useNavigate()

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

    const handleSubmit = (e)=>{
e.preventDefault()
setLoading(true)
if(validateForm()){
    axiosclient.post('/api/v1/Activity/recordTreatment',payload).then(()=>{
        // alert('success')
         Notiflix.Notify.success('activity added successfully')

         setTimeout(() => {
          window.location.href="/admin/report"
         }, 2000);
    }).catch((error)=>{
      Notiflix.Notify.failure('Failed to Add Activity')
    })
}


  }
    return (
        <div className='cattles-manage-wrapper'>
            <div className='treat-title'>New Treatment</div>
            {loading && (
      <div className='loading-wrapper'>
  <div className='loading-indicator'>
        <span class="loader"></span>
           </div>
      </div>
    )}
            <div className="dead-activity-form">
            <div className="edit-cattle-wrapper">
                <form action=""  onSubmit={handleSubmit}> 
                <div className="dead-wrapper">
                < div className="flex-direction">
                <label htmlFor="">EarTag<span>*</span></label><br/>
                        <div className="error">{!earTag &&(errors.earTag)}</div>
                        <input type="text"  onChange={(e)=>setEarTag(e.target.value)}  placeholder='Ear tag'/>
                    </div>
                    
                    <div className="flex-direction">
                    <label htmlFor="">Treatment Date<span>*</span></label><br/>
                        <div className="error">{!treatmentDate &&errors.treatmentDate}</div>
                        <input type="date"   onChange={(e)=>setTreatmentDate(e.target.value)} className='my-date'/>
                    </div>
        
                
                    <div className="flex-direction">
                    <label htmlFor="">Disease Diagonised<span>*</span></label><br/>
                        <select name="" onChange={(e)=>setDiseaseDiaginised(e.target.value)} id="">
                        <option disabled selected>select desease</option>
                            <option value="Bloating">Bloating</option>
                            <option value="HeatStroke">Heat stroke</option>
                            <option value="TUBERCULOSIS">TUBERCULOSIS</option>
                            <option value="Mastitis">Mastitis</option>
                            <option value="Pasteurellosis">PASTEURELLOSIS</option>
                            <option value="NAVELINFECTION">NAVEL INFECTION</option>
                        </select>
                    </div>
                    <div className="flex-direction">
                    <label htmlFor="">Dosage<span>*</span></label><br/>
                        <input type="text" onChange={(e)=>setdosageInml(e.target.value)} placeholder='Enter text here...' />
                    </div>
              
                    <div className="flex-direction">
                    <label htmlFor="">Route Type<span>*</span></label><br/>
                        <select name="" id="" onChange={(e)=>setRoutType(e.target.value)}>
                            <option value="intrammamal">Intrammal</option>
                            <option value="intarmascular">Intramascular</option>
                            <option value="intraiurnal">Intarurnal</option>
                            <option value="intraiurnal">Intarvaginal</option>
                            
                        </select>
                    </div>
            
                    <div className="flex-direction">
                        <label htmlFor="">vaccinatio Date<span>*</span></label><br/>
                        <input type="date"  onChange={(e)=>setvaccinationDate(e.target.value)} className='my-date'/>
                    </div>
                    <div className="flex-direction">
                        <label htmlFor="">Administred By<span>*</span></label><br/>
                        <div className="error">{!vaccinationDate&&errors.vaccineAdministered}</div>
                        <input type="text" onChange={(e)=>setvaccineAdministered(e.target.value)}  placeholder='Enter Adminster name' />
                    </div>
                    <div className="flex-direction">
                        <label htmlFor="">Activity Type<span>*</span></label><br/>
                      <select name="" id="" onChange={(e)=>setActivityType(e.target.value)}>
                        <option disabled selected> select Activity</option>
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
                        <div className="btn-edit-wrapper">
            <button  onClick={handleredirect} type='button' className='btn-delete'>Cancel</button>
            <button type='submit' className='btn-edit'>{loading ?(<>Loading...</>):(<>Save</>)}</button>
              </div>
                </form>
                </div>
            </div>
        </div>

    )
}

export default treatment