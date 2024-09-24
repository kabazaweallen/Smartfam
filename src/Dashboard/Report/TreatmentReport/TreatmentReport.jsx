import React, { useEffect, useState,useRef } from 'react'
import { AiOutlineFilter } from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { GiUnbalanced } from "react-icons/gi";
import "./TreatmentReport.css"
import Filter from '../Filter/Filter';
import { usestateContext } from '../../../contexts/ContexProvider';
import axiosclient from '../../../axiosClient';
import { FaSort, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
 import { useReactToPrint } from 'react-to-print';
 import Notiflix from 'notiflix'
import SelectedReport from './SelectedReport';
import DeleteTreatment from './DeleteTreatment';
function TreatmentReport() {
  const [treatment, setTreatment] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
const[deletee,setDeletee]=useState(false)
const[isSelected,setIsSelected]=useState(false)
const[pageNumber,setPageNumber]=useState(0)
 const userPerpage =10
 const pageVisited =pageNumber * userPerpage 
 const displayUser = treatment.slice(pageVisited,pageVisited + userPerpage)?.map((treatment)=>(
  <tr key={treatment._id}>
    <td><input type="checkbox" onClick={()=>openSelectedReport(treatment)} /></td>
      <td>{treatment.earTag}</td>
      <td>{treatment.treatmentDate}</td>
      <td>{treatment.diseaseDiagnosed}</td>
      <td>{treatment.vaccinationDate}</td>
      <td>{treatment.routeType}</td>
      <td>{treatment.dosageInml} ml</td>
      <td>{treatment.vaccineAdministered}</td>
  </tr>
))

useEffect(()=>{
  axiosclient.get('/api/v1/Report/getTreatment').then(({data})=>{
      setTreatment(data.data)
      // console.log(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
  })
},[])
const pageCount = Math.ceil(treatment.length/userPerpage)
const changePage = ({selected})=>{
setPageNumber(selected)
}

function openSelected(){
  setIsSelected((previsSelected)=>!previsSelected)
}
function openSelectedReport (treatment){
setSelectedReport(treatment)
  openSelected()
}

function openDelete(){
  setDeletee(!deletee)
}
const ComponentPDF=useRef()
 const generatePDF = useReactToPrint({
  content:()=>ComponentPDF.current, 
  documentTitle:"TreatmentReport",
  // onAfterPrint:()=>{
  //   Notiflix.Notify.success("Report downladed succesfully");
  // }
 })
  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p> New treatment Report</p>
        <div className="download-button">
          <button onClick={generatePDF} className='btn-download'> Download Report</button>
        </div>
      </div>
      {deletee &&<DeleteTreatment treatment={selectedReport} openDelete={openDelete}/>}
      <div className="sort-by-wrapper">
      {isSelected? <SelectedReport openDelete={openDelete}/>:(
        <div className='sort-by'>
        <div></div> 
  <div className="filter-search">
  <input type="text" name='search' placeholder='search'  />
  <button className='btn-filter'>  <AiOutlineFilter/></button>
</div>
</div>
      )}
  
    </div>
      {loading && (
        <div className='loading-wrapper'>
          <div className='loading-indicator'>
            <span className="loader"></span>
          </div>
        </div>
      )}


      <div   className="report-table-wrapper text-left">
        <div ref={ComponentPDF} >
        <table className='tables-report'>
          <thead>
            <tr>
            <th>
                <div className="flex-th">
                  <FaSort />
                </div>
              </th>

              <th>
                <div className="flex-th">
                  <p>Eart tag</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Treatment Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Diseases Diagonised</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Vaccination Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Route type</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Doze taken</p>
                  <FaSort />
                </div>
              </th>

              <th>
                <div className="flex-th">
                  <p> Administered by</p>
                  <FaSort />
                </div>
              </th>
            </tr>

        </thead>
        <tbody>
            {displayUser}
        </tbody>
    </table>
    </div>
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
    </div >
  )
}

export default TreatmentReport