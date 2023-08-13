import React, { useState } from "react"
import "./Register.scss"
import axios from "axios"

function Register() {
const [file,setFIle] = useState()
const [isSeller,setisSeller] = useState()

  const [user, setUser] = useState({
    username : '',
    email : '',
    password : '', 
    country : '',
    phone : '',
    isSeller : false,
    img : '',

  })

  const upload = async (file)=>{
   const data = new FormData();
   data.append("file", file)
   data.append("upload_preset", "fiverr")

   try{
    const res  =  await axios.post("https://api.cloudinary.com/v1_1/dnwwyruos/image/upload")

    const {url} = res.data;
         return url
   }catch(err){
    console.log(err)
   }

  }
  const handleChange = (e) =>{
   setUser((prev)=>{
       return {...prev , [e.target.name]: e.target.value}
   })
   console.log(user)
  }

  const handleSeller = (e) =>{
    setUser((prev)=>{
        return {...prev , isSeller: e.target.checked}
    })
   }

  const handleSubmit =async (e) =>{
    e.preventDefault();
    const url =await upload(file);

    try{
      await axios.post("http://localhost:8800/api/auth/register", {
        ...user,
        img:url
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={e=>setFIle(e.target.files[0])}  />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;