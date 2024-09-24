import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosclient from '../../axiosClient'
function CattleDetail() {

    const[Cattle,setCattle]=useState([])
    const { earTag } = useParams()
    useEffect( ()=>{
        axiosclient.get(`/api/v1/createCow/getCowByEarTag/${earTag}`).then(({data})=>{
            // console.log(data)
            setCattle(data.data)
        }).catch((error)=>{
            // console.log(error)
        })
    },[])
 
    const handelCancel = ()=>{
        window.location.href="/admin/cattles"
    }

    return (
        <div className='cattles-manage-wrapper'>
            <div className="top-manage">
                <p>cattles Detail</p>
            </div>
            <div className="cattle-detail-wrapper">
                <div className="cattle-detail-desc">
                    <p> ear tag</p>
                    <h1>{Cattle.earTag}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> type</p>
                    <h1>{Cattle.categoryType}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> status</p>
                    <h1>{Cattle.lifeStatus}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> Purchased weight</p>
                    <h1>{Cattle.purchasedWeight} kg</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> current weight</p>
                    <h1>{Cattle.weightAtBirth}kg</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> yearling Date</p>
                    <h1>{Cattle.yearlingDate}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> yealing weight</p>
                    <h1>{Cattle.yearlingWeight}kg</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> Purchase Amount</p>
                    <h1>{Cattle.mothersEarTag} Rwf</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> Breed Type</p>
                    <h1>{Cattle.breedType}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> Castration Date</p>
                    <h1>{Cattle.castrationPeriod}</h1>
                </div>
                <div className="cattle-detail-desc">
                    <p> Milk produce per day</p>
                    <h1>{Cattle.litresOfMilkItProduces} littles</h1>
                </div>
            </div>
            <div className="btn-edit-wrapper">
                <button className='btn-delete' onClick={handelCancel}>cancel</button>
                <Link to={`/admin/edit-cow/${earTag}`} className='btn-edit'>Edit</Link>
            </div>
        </div>
    )
}

export default CattleDetail