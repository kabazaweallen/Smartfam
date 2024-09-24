import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineFilter } from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import "./PastureReport.css"
import Filter from '../Filter/Filter';
import axiosclient from '../../../axiosClient';
import { useReactToPrint } from 'react-to-print';
import { FaEdit, FaSort, FaTrash } from 'react-icons/fa';


function PastureReport() {
  const [pasture, setPasture] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosclient.get('/api/v1/Report/getPasture').then(({ data }) => {
      setPasture(data.data)
      console.log(data.data)
      setLoading(false)
      Notiflix.Notify.success("Pasture Report");
    }).catch((err) => {
      setLoading(true)
    })
  }, [])

  const ComponentPDF = useRef()
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "PastureReport",
    onAfterPrint: () => {
      Notiflix.Notify.success("Report downladed succesfully");
    }
  })
  return (
    <div className='cattles-manage-wrapper'>
      <div className="report-title-wrapper">
        <p> Pasture movement Report</p>
        <div className="download-button">
          <button className='btn-download' onClick={generatePDF}> Download Report</button>
        </div>
      </div>

      <div className="report-search-wrapper">
        <p></p>
        <div className="filter-search">
          <input type="text" name='search' placeholder='search by ear' />
          <button className='btn-filter'>  <AiOutlineFilter /></button>
        </div>
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
                  <p>Pasture Name</p>
                  <FaSort/>
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Owner</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Area</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>No Cattles</p>
                  <FaSort />
                </div>
              </th>
              <th>
                <div className="flex-th">
                  <p>Action</p>
                  <FaSort />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pasture.map((pasture) => (
              <tr key={pasture._id}>
                <td>{pasture.pastureName}</td>
                <td>{pasture.Owner}</td>
                <td>{pasture.area}</td>
                <td>{pasture.numberOfCattles}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div >
  )
}

export default PastureReport