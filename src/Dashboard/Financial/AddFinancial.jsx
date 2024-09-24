import React from 'react'
import { useState } from 'react';
import { usestateContext } from '../../contexts/ContexProvider';
import { useNavigate } from 'react-router-dom';
import Notiflix from 'notiflix';
import axiosclient from '../../axiosClient';


function AddFinancial() {

    const [financialType, setFinancialType] = useState();
    const [financeType, setIncomeExpense] = useState();
    const [dateOfRecord, setRecordDate] = useState();
    const [paymentDate, setPaymentDate] = useState();
    const [amount, setCostPrice] = useState();
    const [administrator, setAdministrated] = useState();
    const[litresSold,setLittle]=useState()
    const [notes, setNotes] = useState();
    const [loading, setLoading] = useState(false);
    const [cancel, setCancel] = useState(true);


    const payload = {
        financialType,
        financeType,
        dateOfRecord,
        paymentDate,
        amount,
        litresSold,
        administrator,
        notes
    }
    const navigate = useNavigate()

    const handleRedirect = ()=>{
        navigate('/admin/financial')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
     
        setLoading(true)

        axiosclient.post('/api/v1/financial/addFinancial', payload).then((data) => {
            Notiflix.Notify.success("Financial Added successful!");

            setTimeout(() => {
                navigate('/admin/financial')
            }, 2000);
            
        }).catch((error) => {
            alert(error)
        })
    }


    return (
        <>
            <div className='cattles-manage-wrapper'>
                <div className="dead-actity-h1">
                    <p>Add Expense/Income</p>
                </div>
                <div className="dead-activity-form">
                    <div className="edit-cattle-wrapper">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="dead-wrapper">
                                <div className="flex-direction">
                                    <label htmlFor="">Finance Type<span>*</span></label><br />
                                    <select name="" id="" onChange={(e) => setFinac(e.target.value)}>
                                        <option value="">Add Finance Type</option>
                                        <option value="Expense">Expense</option>
                                        <option value="Income">Income</option>
                                    </select>
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">Type of sales<span>*</span></label><br />
                                    <input type="text" onChange={(e) => setIncomeExpense(e.target.value)} placeholder='enter value' />
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">sold amount<span>*</span></label><br />
                                    <input type="text" onChange={(e) => setLittle(e.target.value)} placeholder='sold amount' />
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">Record Date<span>*</span></label><br />
                                    <input type="date" onChange={(e) => setRecordDate(e.target.value)} />
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">Date Of Payment<span>*</span></label><br />
                                    <input type="date" onChange={(e) => setPaymentDate(e.target.value)}/>
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">sold To<span>*</span></label><br />
                                    <input type="text" placeholder='Enter value here...' onChange={(e) => setCostPrice(e.target.value)}/>
                                </div>
                                <div className="flex-direction">
                                    <label htmlFor="">Administrated By<span>*</span></label><br />
                                    <input type="text" placeholder='name of adminstartor' onChange={(e) => setAdministrated(e.target.value)} />
                                </div>
                            </div>
                            <div className="tex-note-wrapper">
                                <div className="flex-direction">
                                    <label htmlFor="">Note<span>*</span></label><br />
                                    <input type="text" placeholder='write note here' onChange={(e) => setNotes(e.target.value)} />
                                </div>
                            </div>
                            <div className="btn-edit-wrapper">
                                <button className='btn-delete' onClick={handleRedirect}>Cancel</button>
                                <button type='submit' className='btn-edit'>{loading ?(<>Loading...</>):(<>add</>)}</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddFinancial