import React, { useEffect, useState } from 'react'
import './cattles.css'
import { FaAirbnb, FaCircle, } from 'react-icons/fa'
import { GiBull, GiCow } from 'react-icons/gi'
import { CiShoppingTag } from "react-icons/ci";
import SelectedCow from './SelectedCow'
import SortBy from './SortBy'
import { Link } from 'react-router-dom'
import ActivityModel from '../Activities/ActivityModel'
import DeletCattle from './DeletCattle'
import { MdLocalFlorist, MdOutlineDirectionsBoatFilled } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import axiosclient from '../../axiosClient';
function Cattles() {

  const [selected,setIsSelected]=useState(false)
  const [selectedCattle,setSelectedCattle]=useState({})
  const[activity,setActivity]=useState(false)
 const[deletee,setDeletee]=useState(false)
 const[loading,setLoading]=useState(true)
 const[Cattles,setCattles]=useState([])
 const [isCowSelected, setIsCowSelected] = useState(false);
 const [selectedCattles, setSelectedCattles] = useState([]);

 const[filterText,setFilterText] = useState("")
 const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 


 
const handelsearch = (text)=>{
setFilterText(text)
}



  function openActivity(){
   setActivity((prevActivity) =>!prevActivity)
  }
  function openDelete(){
    setDeletee((prevDeletee)=>!prevDeletee)
   }

  const openSelected = ()=>{
    setIsSelected((prevselected)=>!prevselected)
  }

  const openSelectedCattle = (cow) => {
    const isCattleSelected = selectedCattles.includes(cow);
  
    // Toggle visibility for the clicked cattle
    if (isCattleSelected) {
      setSelectedCattles((prevSelectedCattles) => prevSelectedCattles.filter(selectedCow => selectedCow !== cow));
    } else {
      setSelectedCattles((prevSelectedCattles) => [...prevSelectedCattles, cow]);
    }
  

    // Set the selected cattle information
    setSelectedCattle(isCattleSelected ? {} : cow);
  
    // Show SelectedCow component only if there are selected cattle
    setSelectedCattles((updatedSelectedCattles) => {
      setIsCowSelected(updatedSelectedCattles.length > 0);
      return updatedSelectedCattles;
    });
  };
  


  useEffect(()=>{
    getCattles()
  },[])
  const getCattles = ()=>{
    axiosclient.get('/api/v1/createCow/getCow').then(({data})=>{
      setCattles(data.data)
      setLoading(false)
      // console.log(data.data)
    }).catch(({error})=>{
      alert(error)
      setLoading(true)
    })
  }
  const displayUser = Cattles.slice(pageVisited,pageVisited + userPerpage).filter((item)=>{
    return item.earTag.toLowerCase().includes(filterText.toLowerCase())
  })?.map((cow)=>(
    <div className="cattle-desc" key={cow._id}>
    
    <Link to={`/admin/cattle/${cow.earTag}`} className="cattle-content1">
      <div className="ear">
      <CiShoppingTag/>
        <p>{cow.earTag}</p>
      </div>
      <div className="cow-status">
       <div className="cow">
         <GiBull/>
       <p>{cow.categoryType
   }</p>
       </div>
       
        <div className="status">
         <FaCircle className='active-cow'/>
        <p>{cow.lifeStatus}</p>
      </div>
      </div>
     
    </Link>
    <div className="cattle-content2">
      <input  type='checkbox' className='zero-checkbox' onClick={()=> openSelectedCattle(cow)}/>
    </div>
   </div>
     ))
     const pageCount = Math.ceil(Cattles.length/userPerpage)
     const changePage = ({selected})=>{
   setPageNumber(selected)
     }
   
  return (
    <div className='cattles-manage-wrapper'>
<div className="cattle-manage">
  <div className="cattle-top">
    
  <div className=" cattles-add d-flex">
  <h3>Manage cattles</h3>
  <Link to="/admin/cattle/add" className='btn-add'> Add cow</Link>
  </div>
  <div className="dash-numbers">
  <div className="dash-content">
    <FaAirbnb className='dash-icon'/>
    <div className="dash-desc">
      <h3>5</h3>
      <p>Pastures</p>
    </div>
  </div>
  <div className="dash-content">
    <GiCow className='dash-icon'/>
    <div className="dash-desc">
      <h3>{Cattles?.length}</h3>
      <p>cattles</p>
    </div>
  </div>
  <div className="dash-content">
    <MdOutlineDirectionsBoatFilled className='dash-icon'/>
    <div className="dash-desc">
      <h3>5</h3>
      <p>groups</p>
    </div>
  </div>
  <div className="dash-content">
    <MdLocalFlorist className='dash-icon'/>
    <div className="dash-desc">
      <h3>45</h3>
      <p>calves</p>
    </div>
  </div>
</div>
  </div>
  {/* open Activity Modal */}
{activity&&<ActivityModel  openActivity={openActivity}/>}
{/* open delete modal */}
{deletee && <DeletCattle cow={selectedCattle} openDelete={openDelete}/>}
{loading && (
      <div className='loading-wrapper'>
  <div className='loading-indicator'>
        <span className="loader"></span>

           </div>
      </div>
    )}
<div className="sort-by-wrapper">
  {/* open model between sort cattles  */}
  {isCowSelected? (
<SelectedCow  cow={selectedCattle}  openActivity={openActivity} openDelete={openDelete} />
     
  ):(
    <SortBy onSearch={handelsearch}/>
  )}

</div>


<div className="cattle-wrapper">
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

export default Cattles