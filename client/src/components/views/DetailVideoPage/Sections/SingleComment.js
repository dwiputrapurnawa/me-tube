import React, { useState } from 'react'
import { Comment, Avatar } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import LikeDislike from './LikeDislikes'
import { TextField, Button, Icon } from '@material-ui/core'



function SingleComment(props){

    const user = useSelector(state => state.user)

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                }else{
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislike comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to</span>
    ]

    return(
        <div>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar 
                    src={props.comment.writer.image}
                    alt
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
                ></Comment>

            {OpenReply &&
                 <form style={{ display:'flex'}} onSubmit={onSubmit}>
                    
                 <TextField
                     style={{ width: '100%', borderRadius: '5px'}}
                     onChange={handleChange}
                     value={CommentValue}
                     placeholder= "write some comments"
                     variant='outlined'
                 />
                 <br />
                 <Button style={{ width: '20%', height: '52px', marginLeft: '1rem'}} variant="contained" color="secondary" onClick={onSubmit}>Send</Button>
             </form>
            }    
                
        </div>
    )
}

export default SingleComment