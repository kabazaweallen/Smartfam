import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usestateContext } from "../contexts/ContexProvider";

const Signup = () => {
  const [fullNames, setFullNames] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [location, setLocation] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullNames: "",
  });
  const [loading, setLoading] = useState(false);
  const { SignupMutation } = usestateContext();
  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", fullNames: "" };

    if (!email) {
      valid = false;
      newErrors.email = "email is required";
    }

    if (!password) {
      valid = false;
      newErrors.password = "password is required";
    }
    if (!fullNames) {
      valid = false;
      newErrors.fullNames = "name is required";
    }

    setErrors(newErrors);
    return valid;
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      const payload = { fullNames, email, password, location, phoneNo };
      SignupMutation.mutate(payload);
      setLoading(true)
    }
    else{
      setLoading(false)
    }
  };
  return (
    <div className="auth-wrapper">
    <div className="Login-signup-wrapper">
      <div className="login-form">
        <div className="form2-login">
          <h1 className="p2-login"> Already A member ?</h1>
          <p className="p3-login">
            {" "}
            sign in in for free to start your journey with smart farming
          </p>
          <div className="btn-logins">
            <Link className="btn-login" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="form1-login">
          <h1 className="p-login">create account for free</h1>
          <form
            onSubmit={handlesubmit}
            className="form-signup3"
            action=""
            method="post"
          >
            <input
              type="text"
              onChange={(e) => setFullNames(e.target.value)}
              placeholder=" Enter your name"
            />
            <div className="error">{errors.fullNames}</div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <div className="error">{errors.email}</div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
    
            <div className="error">{errors.password}</div>
             <input type="text"  onChange={(e)=>setPhoneNo(e.target.value)} placeholder='Phone Number' />
        <input type="text"  onChange={(e)=>setLocation(e.target.value)} placeholder='Location' /> 
        {/* <Link className='signup-responsive-link'  to="/login">Login</Link> */}
        <Link className='signup-responsive-link'  to="/login">Login</Link>
            <button>{loading ? <>Loading...</> : <>Signup</>}</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
