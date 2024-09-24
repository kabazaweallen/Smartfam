import React, { useEffect, useRef, useState } from 'react'
import Filter from '../Filter/Filter'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import { AiOutlineFilter } from 'react-icons/ai'
import axiosclient from '../../../axiosClient'
import { FaSort } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import { useReactToPrint } from 'react-to-print'
import SelectedReport from '../TreatmentReport/SelectedReport'
import DeleteWeaning from './DeleteWeaning'



function WeaningReport() {
  const [Weanings, setWeanings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport,setSelectedReport]=useState(null)
  const[deletee,setDeletee]=useState(false)
  const[isSelected,setIsSelected]=useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const userPerpage = 10
  const pageVisited = pageNumber * userPerpage

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getWeaning').then(({ data }) => {

      // console.log(data.data)
      setWeanings(data.data)
      setLoading(false)
    }).catch((err) => {
      setLoading(true)
    })
  }, [])

  function openSelected(){
    setIsSelected((previsSelected)=>!previsSelected)
  }
  function openSelectedReport (weaning){
  setSelectedReport(weaning)
    openSelected()
  }
  
  function openDelete(){
    setDeletee(!deletee)

  }
  const displayUser = Weanings.slice(pageVisited, pageVisited + userPerpage).map((weaning) => (
    <tr key={weaning._id}>
      <td><input type="checkbox" onClick={()=>openSelectedReport(weaning)} /></td>
      <td>{weaning.earTag}</td>
      <td>{weaning.weaningDate}</td>
      <td>{weaning.weaningWeight}</td>
      <td>{weaning.activityType}</td>

    </tr>
  ))
  const pageCount = Math.ceil(Weanings.length / userPerpage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "TreatmentReport",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })

  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p> weaning  Report</p>
        <div className="download-button">
          <button className='btn-download' onClick={generatePDF}> Download Report</button>
        </div>
      </div>
      {deletee &&<DeleteWeaning weaning={selectedReport} openDelete={openDelete}/>}
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
      <div ref={ComponentPDF} className="report-table-wrapper text-left">
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
                  <p>Eart tag</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Weaning Date</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Weaning Weight</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Activity</p>
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

export default WeaningReport