import Edit from '../img/edit.png'
import Delete from '../img/Delete.png'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import moment from "moment"
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext';



const Single = () => {
  const [post,setPost] = useState({})
  const location = useLocation()
  const Navigate = useNavigate()
  const postId = location.pathname.split("/")[2]
  const {currentUser} = useContext(AuthContext)
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
        console.log(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[postId])
  const handleDelete = async ()=>{
    try{
       await axios.delete(`/posts/${postId}`)
        Navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
      <img src={post?.img} alt="" />
        <div className="user">
         {post.userImg && <img src="post.userImg" alt="" />}
          <div className="info" >
            <span>{post.username}</span>
            <p>Di posting {moment(post.date).fromNow()} jam yang lalu</p>
          </div>
          {currentUser.username === post.username && ( <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt="" />
          </Link> 
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>)}
        </div>
        <h1>{post.tilte}</h1> <br />
      
   
        <p>
        {getText(post.desc)}
        </p>
    
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single