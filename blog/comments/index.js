const express = require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

const commentsByPostId = {}
app.use(cors())
app.use(express.json())

app.get('/posts/:id/comments',(req,res)=>{
    const {id} = req.params
    res.send(commentsByPostId[id]|| [])
})

app.post('/posts/:id/comments',async(req,res)=>{
   const commentId = randomBytes(4).toString('hex')
   const {id} = req.params
   const {content} = req.body

   const comments = commentsByPostId[id] || []

   comments.push({id:commentId,content})

   commentsByPostId[id] = comments

   await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId:id
        }
    })

   res.status(201).send(comments)
})

app.listen(4001,()=>{
    console.log('Listening on port 4001');
})