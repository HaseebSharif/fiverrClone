import React, { useState } from "react"
import "./Login.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState(null);
const navigate = useNavigate();

  const handleSubmit =async(e)=>{
    e.preventDefault();
 const data = ({
  email : email,
  password : password
 })
 try{
const  res = await axios.post('http://localhost:8800/api/auth/login', data , {withCredentials : true} )

localStorage.setItem('currentUser' , JSON.stringify(res.data))
navigate('/');
 }catch(err){
  setError(err)
 }
  }
  return (
    <div className="login">
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <label htmlFor="">Username</label>
      <input
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="">Password</label>
      <input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {/* {error && error} */}
    </form>
  </div>
);
}
  


export default Login