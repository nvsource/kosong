import React from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../img/logo.png"


const Navbar = () => {
    const {currentUser,logout} =  useContext(AuthContext)
  return (
    <div className="navbar">
        <div className="container">
            <div className="logo">
                <Link to="">      
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="links">
                <Link className="link" to="/?cat=olahraga">
                    <h6>OLAHRAGA</h6>
                </Link>
                <Link className="link" to="/?cat=entertainment">
                    <h6>ENTERTAINMENT</h6>
                </Link>
                <Link className="link" to="/?cat=kriminal">
                    <h6>KRIMINAL</h6>
                </Link>
                <Link className="link" to="/?cat=teklonogi">
                    <h6>TEKNOLOGI</h6>
                </Link>
                <Link className="link" to="/?cat=politik">
                    <h6>POLITIK</h6>
                </Link>
                <Link className="link" to="/?cat=balapan">
                    <h6>BALAPAN</h6>
                </Link>
                <span>{currentUser?.username}</span>
             { currentUser ? (<span onClick={logout}>Keluar</span> )  : (<Link className="link" to="/login">login</Link>)}
                <span className="write">
                    <Link className="link" to="/write">Tulis</Link>

                </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar