import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillAlert, AiFillBank, AiFillCarryOut } from 'react-icons/ai'
import "./report.css";

function Report() {
  return (
    
    <div className='cattles-manage-wrapper'>
      <div className="report-title">
        Reports
      </div>
      <nav className="report-t-desc">
        Select any report you want to generate
      </nav>
      <div className="all-report-box">
        <Link to="/admin/report/sale" className="report-box">
          <AiFillBank />
          <nav>
            Sale Report
          </nav>
        </Link>
                
        <Link to="/admin/report/treatment" className="report-box">
          <AiFillBank />
          <nav>
            New Treatment Report
          </nav>
        </Link>
        <Link to="/admin/report/weaning" className="report-box">
          <AiFillBank />
          <nav>
            Weaning Report
          </nav>
        </Link>
        <Link to="/admin/report/castration" className="report-box">
          <AiFillBank />
          <nav>
            Castration Report
          </nav>
        </Link>
        <Link to="/admin/report/new-birth" className="report-box">
          <AiFillCarryOut/>
          <nav>
            New Birth Report
          </nav>
        </Link>
        <Link to="/admin/report/breeding" className="report-box">
          <AiFillBank />
          <nav>
            Breeding Report
          </nav>
        </Link>
        <Link to="/admin/report/pregnancy" className="report-box">
          <AiFillBank />
          <nav>
            Pregnancy Check Report
          </nav>
        </Link>

        <Link to="/admin/report/cows" className="report-box">
          <AiFillBank />
          <nav>
            Promote to Bull Report
          </nav>
        </Link>
        <Link to="/admin/report/dead-Report" className="report-box">
          <AiFillAlert/>
          <nav>
            Dead Report
          </nav>
        </Link>
      </div>


    </div>
  )
}

export default Report