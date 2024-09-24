import React, { useEffect, useState } from 'react'
import './History.css'
import { FaAngleDown, FaArrowDown, FaPlus, FaSort } from 'react-icons/fa'
import { accordionData } from '../../assets/data/datalink'
import axiosclient from '../../axiosClient'



function History() {
  const[selected,setSelected]=useState()
  const[subSelected,setSubselected]=useState()
  const[history,setHistory]=useState([])
  const toggle = (i)=>{
if(selected ===i){
  return setSelected(null)

}
setSelected(i)
  }

const toogleSubselected = (i)=>{
  if(subSelected ===i){
    return setSubselected(null)
  }
  setSubselected(null)
}
useEffect(()=>{

  axiosclient.get('/api/v1/Activity/getAllActivity').then(({data})=>{
    // console.log(data.data)
    setHistory(data.data)
  }).catch((error)=>{
console.log(error)
  })
},[])

  return (
    <div className='history-manage-wrapper'>
       <div className="history">
  <p>Manage cattles/ <span>History</span></p>
  <p className='p-2'>History</p>
  </div> 
 <div className="wrapperr">
  {/* <div className="accordion">
    {history.map((item,i)=>(
      <div className='item'>
        <div className="title" onClick={()=>toggle(i)}>
          <div className='title-wrapper-history'>
          <p className='title-accordion'>{item.title}</p>
          <p className='p-activity'>3 Activities</p>
          </div>
        
        <span>{selected ===i ? '-':'+'}</span>
        </div>
        <div className={selected ===i ? 'content show':'content'}>
        {item.content.map((cont)=>(
          <div className='content1'>
            <div className="time-content1" >
            <p className="time">{cont.time}</p>
            <p className='p-content1'>{cont.content1}</p>
            </div>
         
            <FaAngleDown />
          </div>
        ))}
        </div>
     
      </div>
    ))}
  </div> */}
 </div>

 {history.map((item)=>(
  <div key={item._id}>
    <h1>{item.activityType ==='weaning'}</h1>
  </div>))}

  <table className='tables-report'>
          <thead>
            <tr>
              <th>
                <div className="flex-th">
                  <p>Select</p>
                </div>
              </th>
               <th>
                <div className="flex-th">
                  <p>Date</p>
                  <FaSort />
                </div>
              </th> 
              <th>
                <div className="flex-th">
                  <p> cow's Eartag</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Activity Type</p>
                  <FaSort />
                </div>
              </th>
    
{/*              
              <th>
                <div className="flex-th">
                  <p>Activity</p>
                  <FaSort />
                </div>
              </th> */}
            </tr>

          </thead>
          <tbody>
          {history.map((item)=>(
            <tr key={item._id}>
            <td><input type="checkbox" /></td>
            <td>{item.Date}</td>
            <td>{item.earTag}</td>
            <td>{item.activityType}</td>
            {/* <td>{item.activityType}</td> */}
          </tr>
  ))}
          </tbody>
        </table>
  </div>
    
  )
}

export default History