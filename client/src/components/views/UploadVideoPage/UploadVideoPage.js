import React, {useState} from 'react'
import {  Form, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from "react-redux"
import { TextField, Typography, Container, Grid, Paper, Select,FormControl, InputLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CloudUpload } from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
      },
      paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
      },
      formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
      }
    },
  }));



const Private = [
    {value:0, label:'Private'},
    {value:1, label:'Public'}
]

const Category = [
    {value:0, label: "Film & Animation"},
    {value:0, label: "Autos & Vehicles"},
    {value:0, label: "Music"},
    {value:0, label: "Pets & Animals"},
    {value:0, label: "Sports"},
]

function UploadVideoPage(){
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")

    const handleChangeTitle = (event) => {
        console.log(event.currentTarget.value)
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        console.log(event.currentTarget.value)
        setDescription(event.currentTarget.value)
    }

    const handleChangeOne = (event) => {
        console.log(event.currentTarget.value)
        setPrivacy(event.target.value)
    }

    const handleChangeTwo = (event) => {
        console.log(event.currentTarget.value)
        setCategories(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(user.userData && !user.userData.isAuth){
            return alert('Please Login First')
        }

        if(title === "" || Description === "" || Categories === "" || FilePath === "" || Duration === "" || Thumbnail === "" ){
            return alert('Please fill all of the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if(response.data.success){
                    alert('video uploaded successfully')

                }else{
                    alert('Failed to upload video')
                }
            })

    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        console.log(files)
        formData.append("file",files[0])

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response =>{
                if(response.data.success){

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }

                    setFilePath(response.data.filePath)

                    // generate thumbnail

                    axios.post('/api/video/thumbnail',variable)
                        .then(response => {
                            if(response.data.success){
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)

                            }else{
                                alert('Failed to make the thumbnails')
                            }
                        })

                }else{
                    alert('failed to save the video in server')
                }
            })
    }
    
    return (
        <Container maxWidth="sm">
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography style={{ fontSize: '50px' }} level={2} > Upload Video</Typography>
        </div>
        <hr />
        <br />
        <br />
        <Form className={useStyles().root} onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                            onDrop={onDrop}
                                multiple={false}
                                maxSize={800000000}>
                                {({ getRootProps, getInputProps }) => (
                                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                                    </div>
                                )}
                            </Dropzone>
                <Grid container spacing={3}>
                    <Grid item >
                        <Paper className={useStyles().paper}>
                        
                        </Paper>
                    </Grid>
                    {Thumbnail !== "" &&
                                <div>
                                    <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                                </div>
                            }
                </Grid>
                
            </div>

            <br /><br />
            <TextField
                
                label="Title"
                onChange={handleChangeTitle}
                value={title}
                variant="outlined"
                style={{ width: '40rem' }}
            />
            <br /><br />
            <TextField
                multiline
                label="Description"
                onChange={handleChangeDecsription}
                value={Description}
                variant="outlined"
                style={{ width: '40rem'}}
            />
            <br /><br />

            <Grid container spacing={10}>
                <Grid item xs={6} sm={3}>

                <FormControl className={useStyles().formControl}>
                    <InputLabel >Privacy</InputLabel>
                    <Select style={{ width: '10rem' }}
                    onChange={handleChangeOne}
                    >
                    {Private.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                    </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={3}>

                <FormControl className={useStyles().formControl} style={{ marginLeft: '1rem' }}>
                    <InputLabel>Categories</InputLabel>
                    <Select style={{ width: '10rem' }}
                    onChange={handleChangeTwo}
                    >
                    {Category.map((item, index) => (
                                <option key={index} value={item.label}>{item.label}</option>
                            ))}
                    </Select>
                    </FormControl>

                </Grid>


                <Grid item xs={6} sm={3} style={{ marginLeft: '5rem' }}>
                        <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUpload />}
                        onClick={onSubmit}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
   

        </Form>
    </div>
    </Container>
    )
}

export default UploadVideoPage