import {db} from "../db.js"
import jwt from 'jsonwebtoken'
export const getPosts = (req,res)=>{
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    :"SELECT * FROM posts" 
    db.query(q,[req.query.cat],(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            return res.status(200).json(data)
        }
    })
}
export const getPost= (req,res)=>{
    const q  = "SELECT u.username,p.tilte,p.desc,p.img,u.img as userImg,p.cat,p.date FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?"
    console.log(q)
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err)
            
        else{
            res.status(200).json(data[0])
        }
    })
}
export const addPost = (req,res)=>{
    res.json("Dari Kontroler")
}
export const deletePost = (req,res)=>{
    const token = req.cookies.access_token
    if(!token)return res.status(401).json("not a user")
    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err)return res.status(403).json("toekn not valid")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND  `uid` = ? "

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err)return res.status(403).json("you can only deleted your post")

            return res.json("post berhasil di delete")
        })
    })
}
export const updatePost = (req,res)=>{
    res.json("Dari Kontroler")
}