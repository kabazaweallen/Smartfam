import React, { useEffect, useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'
import { FaCircle, FaSort } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Pastures } from '../../assets/data/datalink'
import axiosclient from '../../axiosClient'
import SelectedPasture from './SelectedPasture'
import SortCattle from './SortPasture'
import DeletePasture from './DeletePasture'
import ReactPaginate from 'react-paginate'
function Pasture() {
 const [pastures,setPastures]=useState([])
 const[loading,setLoading]=useState(true)
 const [selectedPasture,setSelectedPasture]=useState(null)
 const[deletee,setDeletee]=useState(false)
 const[isSelected,setIsSelected]=useState(false)
 const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 
 useEffect(()=>{
  getPasture()
 },[])
const getPasture =()=>{
   axiosclient.get('/api/v1/pasture/getPasture').then(({data})=>{
    setPastures(data.data)
    setLoading(false)
   }).catch((error)=>{
// alert(error)
setLoading(true)
   })
}

function openSelected(){
  setIsSelected((previsSelected)=>!previsSelected)
}
function openSelectedPasture (Pasture){
setSelectedPasture(Pasture)
  openSelected()
}
function openDelete(){
  setDeletee(!deletee)
}
const displayUser = pastures.slice(pageVisited,pageVisited + userPerpage)?.map((pasture)=>(
  <div className="pasture-desc" key={pasture._id}>
  
  <Link to={`/admin/pasture-edit/${pasture._id}`} className="cattle-content1">
    <div className="ear">
      <p>{pasture.pastureName}</p>
    </div>
    <div className="cow-status">
     <div className="cow">
     <FaCircle className='active-cow'/>
     <p>{pasture.numberOfCattles
 }  <span>cows</span></p>
     </div>
    </div>
  </Link>
  <div className="pasture-content2">
   
    <input  type='checkbox' onClick={()=>openSelectedPasture(pasture)}  className='zero-checkbox'/>
  </div>
 </div>
   ))

   const pageCount = Math.ceil(pastures.length/userPerpage)
   const changePage = ({selected})=>{
 setPageNumber(selected)
   }
  return (
    <div className='cattles-manage-wrapper'>
      <div className="cattle-manage">
       <div className=" cattles-add d-flex">
  <h3>Pasture</h3>
  <Link to="/admin/pasture-add" className='btn-add'> Add New</Link>
  </div>
  {loading && (
      <div className='loading-wrapper'>
  <div className='loading-indicator'>
        <span className="loader"></span>
        
           </div>
      </div>
    )}
    {deletee &&<DeletePasture pasture={selectedPasture} openDelete={openDelete}/>}
  <div className="sort-by-wrapper">
    {isSelected ?<SelectedPasture pasture={selectedPasture}  openDelete={openDelete}/>:<>
    <SortCattle/>
    </>}
    </div>
      <div className="pasture-wrapper">
  {displayUser}
</div>
<ReactPaginate
 previousLabel={"previous"}
 nextLabel={"next"}
 pageCount={pageCount}
 onPageChange={changePage}
 containerClassName={"paginationBttns"}
 previousLinkClassName={"previousBttn"}
 nextLinkClassName={"nextBttn"}
 disabledClassName={"paginationDisabled"}
 activeClassName={"paginationActive"}
 />
    </div>
    </div>
  )
}

export default Pasture