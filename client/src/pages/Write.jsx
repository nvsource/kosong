import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from "moment";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const state  = useLocation().state
  const [value, setValue] = useState(state?.tiltle || "");
  const [tiltle, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()
  const upload =  async ()=>{
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  


  const handleClick = async e=>{
    e.preventDefault()
    const imgUrl = await upload()
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            tiltle,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            tiltle,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  console.log(value)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Judul'  onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibilitas</b> Public
          </span>
          <input style={{display:"none"}} type="file" id="file" name="" onChange={(e) => setFile(e.target.files[0])} />
          <label className="file" htmlFor="file">Unggah Gambar</label>
          <div className="buttons">
          <button>Simpan Sebagai Draft</button>
          <button onClick={handleClick}>Perbarui</button>
          </div>
        </div>
        <div className="item">
          <h1>Kategori</h1>
          <div className="cat">
          <input type="radio" checked={cat === "olahraga"} name="cat" value="olahraga" id="olahraga" onChange={e=>setCat(e.target.value)} />
          <label htmlFor="olahraga">Olahraga</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "entertainment"} name="cat" value="entertainment" id="entertainment"  onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="entertainment">Entertainment</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "kriminal"} name="cat" value="kriminal" id="kriminal" onChange={e=>setCat(e.target.value)} />
          <label htmlFor="kriminal">Kriminal</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "teknologi"} name="cat" value="teknologi" id="teknologi" onChange={e=>setCat(e.target.value)} />
          <label htmlFor="teknologi">Teknologi</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "politik"} name="cat" value="politik" id="politik" onChange={e=>setCat(e.target.value)} />
          <label htmlFor="politik">Politik</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "balapan"} name="cat" value="balapan" id="balapan" onChange={e=>setCat(e.target.value)} />
          <label htmlFor="balapan">Balapan</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write