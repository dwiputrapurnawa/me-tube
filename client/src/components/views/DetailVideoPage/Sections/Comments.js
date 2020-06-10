import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import { TextField, Button, Icon } from '@material-ui/core'



function Comments(props){
    
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")

    const handleChange = (event) => {
        setComment(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setComment("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('Failed to save Comment')
                }
            })
    }

    return(
        <div>
            <br />
            <p> Replies</p>
            <hr />

            {props.CommentLists && props.CommentLists.map((comment,index) => (

                (!comment.responseTo &&
                    <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
                    
                    )

               
            ))}

            <form style={{ display:'flex'}} onSubmit={onSubmit}>
                
                <TextField
                    style={{ width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder= "write some comments"
                    variant='outlined'
                />
                <br />
                
                <hr />
                <Button style={{ width: '20%', height: '52px', marginLeft: '1rem'}} variant="contained" color="primary" onClick={onSubmit}>Send</Button>
            </form> 
        </div>
    )
}

export default Comments