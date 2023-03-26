import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"

const Home = () => {
  const [posts,setPosts] = useState([])
  const cat = useLocation().search

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[cat])
  // const posts = [
  //   {
  //     id: 1,
  //     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi.',
  //     img: 'https://cdn.dribbble.com/userupload/3001690/file/original-436609d04ee6caf5a141a856fce242f6.png?compress=1&resize=752x',
  //   },
  //   {
  //     id: 2,
  //     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  //     desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi. Donec sodales nisi, vitae sagittis nisi.',
  //     img: 'https://cdn.dribbble.com/userupload/3001690/file/original-436609d04ee6caf5a141a856fce242f6.png?compress=1&resize=752x',
  //   },
  // ]

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1>{post.tilte}</h1>
              </Link>
                <p>{getText(post.desc)}</p>
                <button>Lebih banyak</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;