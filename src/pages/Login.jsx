import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usestateContext } from '../contexts/ContexProvider'

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { LoginMutation,} = usestateContext()
    const[loading,setLoading]=useState(false)
    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            valid = false;
            newErrors.email = 'email is required';
        }

        if (!password) {
            valid = false;
            newErrors.password = 'password is required';
        }

        setErrors(newErrors);
        return valid;
    };
    const handlesubmit = (e) => {


        e.preventDefault()
        setLoading(true)
        if (validateForm()) {
            const payload = { email, password }
            LoginMutation.mutate(payload)
            setLoading(true)
        }
        else {
            setLoading(false)
        }


    }
  return (
    <div className="auth-wrapper">
<div className='Login-signup-wrapper'>

       
        <div className="login-form">
            <div className="form1-login">
     <h1 className='p-login'>login into your account</h1>
     <form onSubmit={handlesubmit} className='form-login3' action="" method="post">
     <label htmlFor="">
        Email
     </label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
     <div className="error">{errors.email}</div>
        <label htmlFor="">
        Password
     </label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <div className="error">{errors.password}</div>
        <Link to='/' className='forgot-p-link' style={{color:'black',textDecoration:'none', fontSize:'14px'}} >Forgot Password ?</Link>
        <Link className='login-responsive-link'  to="/signup">signup</Link>
        <button >{loading?(<p>Loading....</p>):(<p>Login</p>)}</button>
        <p className='p-privacy'>By signing in you are able to start your journey with smart farming</p>
     </form>
            </div>
            <div className="form2-login">
                <h1 className='p2-login'> New Here ?</h1>
                <p className='p3-login'> Signup and start your journey with smart farming</p>
                <div className="btn-logins">
                <Link className='btn-login'  to="/signup">signup</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    )
}

export default Login