import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';
import axiosclient from '../../axiosClient';
import { useParams } from 'react-router-dom';

function CattleEdit() {

  const [Cattle, setCattle] = useState({
    earTag: "",
    breedType: "",
    status: "",
    categoryType: "",
    pasture: "",
    mothersEarTag: "",
    purchasedDate: "",
    weightAtBirth: "",
    litresOfMilkItProduces: "",
    weaningPeriod: "",
    yearlingDate: "",
    yearlingWeight: "",
    castrationPeriod: "",
    purchasedWeight: "",
    lifeStatus: ""
  })
  const [loading, setLoading] = useState(false);
  const { earTag } = useParams()

  if (earTag) {
    useEffect(() => {
      const fetchSingle = async () => {
        try {
          const res = await axiosclient.get(`/api/v1/createCow/getCowByEarTag/${earTag}`)
          // console.log(res.data.data);
          setCattle(res.data.data);

        } catch (error) {
          console.log(error);
        }
      };
      fetchSingle();
    }, [earTag]);
  }


  const handleCancel = (e) => {
    window.location.href = "/admin"
  }
  
  function handleUpdate(e) {
    e.preventDefault();
    const payload = { ...Cattle }
    if (Cattle.earTag) {
      axiosclient.put(`/api/v1/createCow/updateCow/${Cattle.earTag}`, payload).then(() => {
        // alert('success')
        Notiflix.Notify.success('Cattle Edited succesfully')
        setTimeout(() => {
          window.location.href = "/admin/cattles/"
        }, 3000)

      }).catch((error) => {
        // alert(error)
        console.log(error)
      })
    }
  }

  return (
    <div className='cattles-manage-wrapper'>
      <div className="top-manage">
        <p>Edit cattle</p>
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
        <form action="" onSubmit={handleUpdate}>
          <div className="edit-wrapper">
            <div className="flex-direction">
              <label htmlFor="">EarTag<span>*</span></label><br />
              <div className="error"></div>

              <input type="text"
                value={Cattle.earTag}
                onChange={(e) => setCattle({ ...Cattle, earTag: e.target.value })}
              />
            </div>
            <div className="flex-direction">
              <label htmlFor=""> little of Milk produce <span>*</span></label><br />
              <select name="" id="" value={Cattle.litresOfMilkItProduces}
                onChange={(e) => setCattle({ ...Cattle, litresOfMilkItProduces: e.target.value })}  >
                <option value="" disabled> select little per day</option>
                <option value="1-5" selected={Cattle.litresOfMilkItProduces === "1-5"}>1-5</option>
                <option value="5-10" selected={Cattle.litresOfMilkItProduces === "5-10"}>5-10</option>
                <option value="5-10" selected={Cattle.litresOfMilkItProduces === "20-30"}>10-20</option>
                <option value="10-20" selected={Cattle.litresOfMilkItProduces === "20-30"}>20-30</option>
              </select>
            </div>


          </div>
          <div className="status-type-breed">
            <div className="statusType">
              <p>Satus<span>*</span></p>
              <div className='status-types'>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='status'
                    checked={Cattle.lifeStatus === "active"}
                    value="active"
                    onChange={(e) => setCattle({ ...Cattle, status: e.target.value })}
                  />
                  <span>active</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='status'
                    checked={Cattle.lifeStatus === "dead"}
                    value="dead"
                    onChange={(e) => setCattle({ ...Cattle, lifeStatus: e.target.value })}
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
                    checked={Cattle.categoryType === "bull"}
                    value="bull"
                    onChange={(e) => setCattle({ ...Cattle, categoryType: e.target.value })}
                  />
                  <span>bull</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='category'
                    checked={Cattle.categoryType === "cow"}
                    value="cow"
                    onChange={(e) => setCattle({ ...Cattle, categoryType: e.target.value })}
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
                    checked={Cattle.categoryType === "open"}
                    onChange={(e) => setCattle({ ...Cattle, status: e.target.value })}
                  />
                  <span>open</span>
                </div>
                <div className="lable-wrapper">
                  <input type="radio"
                    name='breed'
                    value="preginant"
                    checked={Cattle.categoryType === "preginant"}
                    onChange={(e) => setCattle({ ...Cattle, status: e.target.value })}
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
                <select value={Cattle.breedType}
                  onChange={(e) => setCattle({ ...Cattle, breedType: e.target.value })}
                >
                  <div className="error"></div>
                  <option value="american" selected={Cattle.breedType === "American"}>american</option>
                  <option value="jersey" selected={Cattle.breedType === "jersey"}>jersey</option>
                  <option value="Inyambo" selected={Cattle.breedType === "Inyambo"}>Inyambo</option>
                  <option value="Inkuku" selected={Cattle.breedType === "Inkuku"}>Inkuku</option>
                  <option value="American LineBack" selected={Cattle.breedType === "American"} >American LineBack</option>
                </select>
              </div>
            </div>

            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Pasture <span className='ordered'>*</span></label><br />
                <div className="error"></div>
                <input type="text"
                  placeholder='pasture name'
                  value={Cattle.pasture}
                  onChange={(e) => setCattle({ ...Cattle, pasture: e.target.value })}
                />

              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">weaning Date<span className='ordered'>*</span></label><br />
                <input type="date" value={Cattle.weaningPeriod} onChange={(e) => setCattle({ ...Cattle, weaningPeriod: e.target.value })} placeholder=' weaning period' />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased weight<span className='ordered'>*</span></label><br />
                <input type="text"
                  value={Cattle.purchasedWeight} onChange={(e) => setCattle({ ...Cattle, purchasedWeight: e.target.value })}
                  placeholder='Purchased weight'
                />
              </div>
            </div>

            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased Date<span className='ordered'>*</span></label><br />
                <input type="Date"
                  value={Cattle.purchasedDate}
                  onChange={(e) => setCattle({ ...Cattle, purchaseDate: e.target.value })}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Purchased Amount<span className='ordered'>*</span></label><br />
                <input type="text"
                  placeholder='Enter Amount'
                  value={Cattle.mothersEarTag}
                  onChange={(e) => setCattle({ ...Cattle, mothersEarTag: e.target.value })}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Current Weight<span className='ordered'>*</span></label><br />

                <input type="text"
                  placeholder='Enter weight'
                  value={Cattle.weightAtBirth}
                  onChange={(e) => setCattle({ ...Cattle, weightAtBirth: e.target.value })}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">castration Date<span className='ordered'>*</span></label><br />

                <input type="date"
                  value={Cattle.castrationPeriod}
                  onChange={(e) => setCattle({ ...Cattle, castrationPeriod: e.target.value })}
                />
              </div>
            </div>
            {/* <div className="breed-pasture-desc">
            <div className="flex-direction">
              <label htmlFor="">Breed type <span className='ordered'>*</span></label><br />
            <select>
              <option value="inkuku">inkuku</option>
              <option value="AmericabREED">American Breed</option>
              <option value="jersey">jersey</option>
              <option value="inyambo">inyambo</option>
            </select>
            </div>
          </div> */}
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Yearing Date<span className='ordered'>*</span></label><br />
                <input type="Date"
                  value={Cattle.yearlingDate}
                  onChange={(e) => setCattle({ ...Cattle, yearlingDate: e.target.value })}
                />
              </div>
            </div>
            <div className="breed-pasture-desc">
              <div className="flex-direction">
                <label htmlFor="">Yearling Weight<span className='ordered'>*</span></label><br />
                <input type="text" placeholder='yearnig weight'
                  value={Cattle.yearlingWeight}
                  onChange={(e) => setCattle({ ...Cattle, yearlingWeight: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="btn-edit-wrapper">
            <button className='btn-delete' onClick={handleCancel}>Cancel</button>
            <button type='submit' className='btn-edit'>Edit</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CattleEdit;