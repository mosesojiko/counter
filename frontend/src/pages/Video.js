// import React from 'react'
// import { useState } from 'react';
// import Button from "@mui/material/Button";
// import axios  from 'axios'
// import LoadingBox from "../components/LoadingBox";
// import Stack from '@mui/material/Stack';
// import Alert from '@mui/material/Alert';
// import ReactPlayer from 'react-player';
// import { useEffect } from 'react';
// import './video.css'


// function Video() {
//     const [video, setVideo] = useState('')
//     const [title, setTitle] = useState('')
//     const [loadingVideo, setLoadingVideo] = useState(false)
//     const [errorVideo, setErrorVideo] = useState(false)
//   const [successVideo, setSuccessVideo] = useState(false)

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)
//   const [videos, setVideos] = useState([])

//   const [videoFilePath, setVideoFilePath] = useState(null);
//   const handleVideoUpload = (event) => {
// setVideoFilePath(URL.createObjectURL(event.target.files[0]));
// };
  


//   const inputRef = React.useRef();

//   const [source, setSource] = React.useState();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);
//     setSource(url);
//   };

//   const handleChoose = (event) => {
//     inputRef.current.click();
//   };

//     const submitVideo = async (e) => {
//         e.preventDefault()
//         try {
//             setLoadingVideo(true)
//            await axios.post('/api/v1/video', { video, title, source,videoFilePath});
//             setTitle("")
//             setLoadingVideo(false)
//             setSuccessVideo(true)
//         } catch (error) {
//           // console.log(error)
//             setErrorVideo(true);
//             setLoadingVideo(false)
//         }
//     }
// console.log(source)
//   useEffect(() => {
//     const fetchVideo = async () => {
//        try {
//          setLoading(true);
//          const { data } = await axios.get('/api/v1/video')
//          setVideos(data)
//          setLoading(false)
//        } catch (error) {
//          setError(true)
//          setLoading(false)
//        }
//     }
//     fetchVideo()
//   }, [])

//   console.log(videoFilePath)
//     return (
//       // <div>
//       //   <input type="file" accept=".mov,.mp4" onChange={handleVideoUpload} />
//       //   <ReactPlayer url={videoFilePath} width="50%" height="50%" controls={true} />
//       // </div>
//        <div style={{backgroundColor:"white"}}>
//             <h2>Upload video</h2>
//             <form onSubmit={submitVideo}>
//                 <div style={{margin:"0 2px"}}>
//             <lable style={{margin:"0 2px"}} htmlFor="title">Title</lable>
//             <input
//               type="text"
//               id="title"
//               placeholder="title"
//                   onChange={(e) => setTitle(e.target.value)}
//                   style={{ margin: "0 2px" }}
//                   required
//             ></input>
//           </div>
//                 <div style={{margin:"0 2px"}}>
//                         <input type="text" 
//                         placeholder="Please enter a video link"
//                         value ={video}
//                         onChange = {(e) => setVideo(e.target.value)}
//             />
//           </div>
//           <div>
//             <lable style={{ margin: "0 2px" }} htmlFor="upload">Upload from computer</lable>
//             <input type="file" id="upload" accept=".mov,.mp4" onChange={handleVideoUpload} />
//           </div>
//                 <div>
//             <label />
            
//             <Button variant="contained" color="success" type="submit" size="small" sx={{mb:2}}>
//                   Create
//             </Button>
//           </div>
//         </form>
        
//              {
//                     loadingVideo && <LoadingBox></LoadingBox>
//                 }
//                 {
//             errorVideo && <Stack sx={{ width: '90%' }} spacing={2}>
//               <Alert severity="error" onClose={() => setErrorVideo(false)}>Error creating video.</Alert>
      
//             </Stack>
//                 }
//                 {
//             successVideo && <Stack sx={{ width: '90%' }} spacing={2}>
//               <Alert severity="success" onClose={() => setSuccessVideo(false)}>Your video has been sent.</Alert>
      
//             </Stack>
//         }
      
//      {/* {source && (
//         <video
//           className="VideoInput_video"
//           width="30%"
//           controls
//           src={source}
//           />
          
//       )}  */}
        
        
        
//         <div style={{ maxWidth: "500px" }}>
//           {
//             loading && <LoadingBox></LoadingBox>
//           }
//           {
//             error && <Stack sx={{ width: '90%' }} spacing={2}>
//               <Alert severity="error" onClose={() => setError(false)}>Error creating video.</Alert>
      
//             </Stack>
//           }
//            {
//             videos?.map((mid) => (
//               <div key={mid._id}>
//                 <ReactPlayer url={mid.videoFilePath} width="50%" height="50%" controls={true} />
//               </div>
//             ))
//           } 
          
//          {
//             videos?.map((vid) => (
//               <div key={vid._id}>
//                 <h4>List of your videos</h4>
//                 <ReactPlayer width={'100%'} url={vid.video} />
                
//               </div>
//             ))
//           } 
//         </div>
//         <div className="App">
      
//     </div>
                       
//         </div>
//     )
// }

// export default Video
