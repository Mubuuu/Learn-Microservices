import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CommentList = ({postId}) => {
    const [comments,setComments] = useState([])

    const fetchData = async()=>{
        console.log(postId);
        const {data} = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        console.log(data,11111111);
        setComments(data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderedComments = comments?.map((comment)=>{
        return <li key={comment.id}>{comment.content}</li>
    })
  return (
   <ul> {renderedComments}</ul>
  )
}

export default CommentList