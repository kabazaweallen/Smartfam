import React, { useRef, useState } from 'react'
import "./financial.css"
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import Filter from '../Report/Filter/Filter';
import AllFinancial from './AllFinancial';
import { useEffect } from 'react';
import axiosclient from '../../axiosClient';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'


function Financial() {

  const ComponentPDF = useRef()
    const generatePDF = useReactToPrint({
      content: () => ComponentPDF.current,
      documentTitle: "New-Birth-report",
      onAfterPrint: () => {
        Notiflix.Notify.success("Report downladed succesfully");
      }
    })

  const [fetchFinancial, setFetchfinancial] = useState([])

  useEffect(() => {
    axiosclient.get('/api/v1/financial/getFinancial').then(({ data }) => {
      console.log(data)
      setFetchfinancial(data.data)
    }).catch((error) => {
      alert(error)
    })
  }, [])

  return (
    <div className='cattles-manage-wrapper'>
      <div  className="report-title-wrapper">
        <div className="financial-title">
          Financial Report
        </div>
        <div className='finance-btn'>
          <div className="finance-add-record">
            <Link to="/admin/Financial/addfinancial">
              Add Record
            </Link>
          </div>
            <button className="finance-download" onClick={generatePDF}>
              Download Report
            </button>
         
        </div>


      </div>
      <div className="finance-content">
      </div>
      <div className="financial-body">
        <div className="fiancial-table" ref={ComponentPDF}>
          <AllFinancial />
        </div>
      </div>
    </div>
  )
}

export default Financial