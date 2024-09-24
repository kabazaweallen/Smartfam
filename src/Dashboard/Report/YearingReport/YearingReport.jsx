import React, { useRef } from 'react'
import Filter from '../Filter/Filter'
import { GiUnbalanced } from 'react-icons/gi'
import { HiOutlineDocumentChartBar } from 'react-icons/hi2'
import { AiOutlineFilter } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'


function YearingReport() {
  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "YearingReport",
    // onAfterPrint: () => {
    //   Notiflix.Notify.success("Report downladed succesfully");
    // }
  })
  return (
    <div className='cattles-manage-wrapper'>
    <div className="report-title-wrapper">
      <p>Yearing Report</p>
      <div className="download-button">
         <button className='btn-download'onClick={generatePDF}> Download Report</button>
      </div>
    </div>

    <div className="report-search-wrapper">
      <p></p>
    <div className="filter-search">
      <input type="text" name='search' placeholder='search by ear'  />
      <button className='btn-filter'>  <AiOutlineFilter/></button>
    </div>
    </div>
  </div >
  )
}

export default YearingReport