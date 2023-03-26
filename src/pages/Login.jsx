import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from "axios"

const Login = () => {
 
    const [inputs, setInputs] = useState({
      username:"", 
      password:"",
    })
    const [err,setError] = useState(null);
  
    const navigate = useNavigate();

    const {login} = useContext(AuthContext)
    
  
  
    const handleChange = e =>{
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    
  
    const handleSubmit = async e =>{
      e.preventDefault()
      try{
      login(inputs)
      navigate("/");
    }catch(err){
      setError(err.response.data);
    }
  };
  return (
    <div className='auth'>
      <h1>MASUK</h1>
      <form>
        <input required type="text" placeholder='username'name="username" onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Masuk</button>
        {err && <p>{err}</p>}
        <span>Belum mempunyai akun? <Link to="/register">Daftar</Link>
        </span>
      </form>
    </div>
  )
}

export default Login