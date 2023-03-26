import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Menu = ({cat}) => {
  const [posts,setPosts] = useState([])


  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[cat])
    // const posts = [
    //     {
    //       id: 1,
    //       title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi.',
    //       img: 'https://cdn.dribbble.com/userupload/3001690/file/original-436609d04ee6caf5a141a856fce242f6.png?compress=1&resize=752x',
    //     },
    //     {
    //       id: 2,
    //       title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //       desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi.',
    //       img: 'https://cdn.dribbble.com/userupload/3001690/file/original-436609d04ee6caf5a141a856fce242f6.png?compress=1&resize=752x',
    //     },
    //   ];

  return (
    <div className="menu">
    <h1>Postingan yang lain yang mungkin anda suka</h1>
    {posts.map((post) => (
      <div className="post" key={post.id}>
        <img src={`../upload/${post?.img}`} alt="" />
        <h2>{post.title}</h2>
        <Link to={`/post/${post.id}`}>Lebih Banyak</Link>
      </div>
    ))}
  </div>
  );
};

export default Menu