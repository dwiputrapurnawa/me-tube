import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Typography, LinearProgress } from '@material-ui/core'

const { Meta } = Card

function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])





    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        if(video.writer){
            return  <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative' }}>
                <a href={`video/${video._id}`}>
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:8080/${video.thumbnail}`} />
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}></span>
            <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            <br />
            <br />
            
        </Col>
        }else{
            return <LinearProgress color='secondary' />
        }

    })

        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Typography level={2} style={{ fontSize: '2rem', color: 'black' }} ><b>Recommended</b></Typography>
                <hr />
                
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>
        )
    
}

export default LandingPage