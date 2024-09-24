import React, { useEffect, useState } from 'react'
import { usestateContext } from '../../contexts/ContexProvider';
import axiosclient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import SuccessCattle from '../Activities/SuccessCattle';


function CattleAdd() {
  const [earTag, setEarTag] = useState();
  const [breedType, setBreedType] = useState();
  const [status, setStatus] = useState();
  const [categoryType, setCategoryType] = useState();
  const [whereItWasPurchased, setPasture] = useState([]);
  const [mothersEarTag, setMothersEarTag] = useState();
  const [purchasedDate, setPurchaseDate] = useState();
  const [loading, setLoading] = useState(false);
  const [weightAtBirth, setweightAtBirth] = useState();
  const [litresOfMilkItProduces, setlittleofmilk] = useState()
  const [weaningPeriod, setWaningPeriod] = useState()
  const [yearlingDate, setYearingDate] = useState()
  const [yearlingWeight, setyearingWeight] = useState()
  const [castrationPeriod, setCastrationPeriod] = useState()
  const [purchasedWeight, setPurchaseWeight] = useState()
  const [lifeStatus, setLifestatus] = useState()
  const [activity, setActivity] = useState()
  const [errors, setErrors] = useState({
    earTag: '', breedType: '', status: '', categoryType: '',
    weightAtBirth: '', purchaseDate: '',whereItWasPurchased:''});

  const validateForm = () => {
    let valid = true;
    const newErrors = { earTag: '',  breedType: '', status: '', categoryType: '',
    weightAtBirth: '', purchaseDate: '',whereItWasPurchased:''};

    if (!earTag) {
      valid = false;
      newErrors.earTag = 'Eartag is required';
    }
    if (!weightAtBirth) {
      valid = false;
      newErrors.weightAtBirth = 'this field is required';
    }
    if (!status) {
      valid = false;
      newErrors.status = 'This field is required';
    }
    if (!categoryType) {
      valid = false;
      newErrors.categoryType = 'this field is required';
    }
    if (!whereItWasPurchased) {
      valid = false;
      newErrors.whereItWasPurchased = 'this field is required';
    }
    setErrors(newErrors);
    return valid;
  };


  const handleCancel = (e) => {
    window.location.href = "/admin"
  }

  const payload = {
    earTag,
    yearlingWeight,
    mothersEarTag,
    breedType,
    status,
    categoryType,
    whereItWasPurchased,
    lifeStatus,
    weightAtBirth,
    castrationPeriod,
    purchasedDate,
    yearlingDate,
    litresOfMilkItProduces,
    weaningPeriod,
    purchasedWeight,
  }
  const navigate = useNavigate()
  function openActivity() {
    setActivity((prevActivity) => !prevActivity)
  }
  function handleActivity() {
    openActivity()
    setTimeout(() => {
      window.location.href = "/admin/cattles/"
    }, 3000)
     setLoading(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (validateForm()) {
      axiosclient.post('/api/v1/createCow/recordCow', payload).then((data) => {
handleActivity()
      }).catch((error) => {
        // alert(error)
        // console.log(error)
      })
    }
    else {
      setLoading(false)
    }
  }
 

  return (
    <div className='cattles-manage-wrapper'>
      <div className="top-manage">
        <p>Add cattle</p>
      </div>
      {loading && (
        <div className='loading-wrapper'>
          {activity && (<SuccessCattle />)}
          <div className='loading-indicator'>
            <span class="loader"></span>
          </div>
        </div>
      )}
      <div className="edit-cattle-wrapper">
        <form action="" onSubmit={handleSubmit}>
          <div className="edit-wrapper">
            <div className="flex-direction">
              <label htmlFor="">EarTag<span>*</span></label><br />
              <div className="error">{errors.earTag}</div>

              <input type="text"
                placeholder='EarTag'
                onChange={(e) => setEarTag(e.target.value)}
              />
            </div>
            <div className="flex-direction">
              <label htmlFor=""> little of Milk produce <span>*</span></label><br />
              <select name="" id="" onChange={(e) => setlittleofmilk(e.target.value)}>
                <option value="" disabled> select little per day</option>
                <option value="1-5">1-5</option>
                <option value="5-10">5-10</option>
                <option value="5-10">10-20</option>
                <option value="10-20">20-30</option>
              </select>
            </div>


          </div>
          <div className="status-type-breed">
            <div className="statusType">
              <p>Satus<span>*</span></p>
              <div className='status-types'>
              <div className="error">{errors.status}</div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='status'
                    value="active"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span>active</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='status'
                    value="dead"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span>dead</span>
                </div>
              </div>
            </div>
            <div className="statusType">
              <p> category Type<span>*</span></p>
              <div className='status-types'>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='category'
                    placeholder='active'
                    value="bull"
                    onChange={(e) => setCategoryType(e.target.value)}
                  />
                  <span>bull</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='category'
                    value="cow"
                    onChange={(e) => setCategoryType(e.target.value)}
                  />
                  <span>cow</span>
                </div>

              </div>
            </div>
            <div className="statusType">
              <p>Breeding Status<span className='ordered'>*</span></p>
              <div className='status-types'>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='breed'
                    value="open"
                    onChange={(e) => setLifestatus(e.target.value)}

                  />
                  <span>open</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='breed'
                    value="preginant"
                    onChange={(e) => lifeStatus(e.target.value)}
                  />
                  <span>preginat</span>
                </div>

              </div>
            </div>
          </div>

          <div className="breed-pasture-wrapper">
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Breed <span className='ordered'>*</span></label><br />
                <select name="" id="" onChange={(e) => setBreedType(e.target.value)}>
                  <div className="error">{errors.breedType}</div>
                  <option value="american">american</option>
                  <option value="jersey">jersey</option>
                  <option value="Inyambo">Inyambo</option>
                  <option value="Inkuku">Inkuku</option>
                  <option value="American LineBack">American LineBack</option>
                </select>
              </div>
            </div>

            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Pasture <span className='ordered'>*</span></label><br />
                <div className="error">{errors.whereItWasPurchased}</div> 
                <input type="text"
                  onChange={(e) => setPasture(e.target.value)} placeholder='pasture'
                />
          
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">weaning Date<span className='ordered'>*</span></label><br />
                <input type="date" name='' onChange={(e) => setWaningPeriod(e.target.value)} placeholder=' weaning period' />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased weight<span className='ordered'>*</span></label><br />

                <input type="text" placeholder='enter weight in kg'
                  onChange={(e) => setPurchaseWeight(e.target.value)}

                />
              </div>
            </div>

            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased Date<span className='ordered'>*</span></label><br />
                <input type="Date"
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased Amount<span className='ordered'>*</span></label><br />
                <input type="text"
                  placeholder='Enter Amount'
                  onChange={(e) => setMothersEarTag(e.target.value)}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">

                <label htmlFor="">Current Weight<span className='ordered'>*</span></label><br />
                
                <input type="text"
                  placeholder='Enter weight'
                  onChange={(e) => setweightAtBirth(e.target.value)}
                />
                <div className="error">{errors.weightAtBirth}</div>
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">castration Date<span className='ordered'>*</span></label><br />

                <input type="date"
                  placeholder=' '
                  onChange={(e) => setCastrationPeriod(e.target.value)}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Breed type <span className='ordered'>*</span></label><br />
                <select onChange={(e) => setBreedType(e.target.value)}>
                  <option value="inkuku">inkuku</option>
                  <option value="America">American Breed</option>
                  <option value="jersey">jersey</option>
                  <option value="inyambo">inyambo</option>
                </select>

                {/* <input type="text"
                  placeholder='breed type'
                  onChange={(e) => setBreedType(e.target.value)}
                />  */}
                
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Yearing Date<span className='ordered'>*</span></label><br />
                <input type="Date"
                  onChange={(e) => setYearingDate(e.target.value)}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Yearling Weight<span className='ordered'>*</span></label><br />
                <input type="text" placeholder='yearnig weight'
                  onChange={(e) => setyearingWeight(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="btn-edit-wrapper">
            <button className='btn-delete' onClick={handleCancel}>Cancel</button>
            <button type='submit' className='btn-edit' onClick={handleSubmit}>
              {loading ? (<>Loading...</>) : (<>Save</>)}</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CattleAdd