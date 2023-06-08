import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Flex, Text, IconButton, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import ReCAPTCHA from "react-google-recaptcha";
import Loader from './Loader';
import axios from 'axios';
import Error from './Error';
import { useGlobalContext } from '../context/GlobalContext';

var ended = false;
const VideoPlayer = ({ source }) => {
  const [randomTime, setrandomTime] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videoFinished, setvideoFinished] = useState(null);
  const [captchaVisible, setCaptchaVisible] = useState(false);
  const [vidPlay, setVidPlay] = useState(false);

  const { user, userDet } = useGlobalContext()

  const campid = "f2eed168-c51d-4c02-b80a-e7ceb8988cb4";

  const videoRef = useRef(null);

  const onPlaybackStatusUpdate = (status) => {
    setVideoStatus(status);
  };

  const setVideoEnded = () => {
    ended = true;
    setCaptchaVisible(true);
  }

  const handleVideoLoad = () => {
    const durationMillis = videoRef.current.getDuration();
    const randomTime = Math.floor( (Math.floor(Math.random() * (durationMillis - 20) + 20)));
    setrandomTime(randomTime);
  };

  
  useEffect(() => {
    if (videoStatus && videoStatus.playedSeconds) {
      const watchedPercentage = Math.floor(videoStatus.playedSeconds);
      if (watchedPercentage == randomTime) {
        // Random time between 30-60 seconds
        setTimeout(() => {
           setVidPlay(false);
           setCaptchaVisible(true);
        }, randomTime);
      }
    }
  }, [videoStatus]);

  const onVerify = (token) => { 
    console.log(token)
    if(token && ended === false) {
      setCaptchaVisible(false);
      setrandomTime(-1);
      setVidPlay(true);
    }else {    
        setLoading(true);

        const options = {
            method: "GET",
            url: "https://ad-backend.onrender.com/video/finish2",
            params: {
                userid: user.uid,
                campid: campid,
            },
        };
        
        axios.request(options).then(async (response) => {
            setvideoFinished(response.data);
            setLoading(false);
        }).catch((error) => {
            setError(error.response.data);
            console.log(error);
            setLoading(false);
        });
    }
  }


  if(loading === true) { 
    return <Loader />
  }else if(error) {
    return <Error msg={error} />
  }else if(videoFinished) {
    return <Alert status="success">
        <AlertIcon />
        <AlertDescription>{videoFinished}</AlertDescription>
    </Alert> 
  }return (
    <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} p={0} m={0}>
        <ReactPlayer ref={videoRef} onEnded={setVideoEnded} playing={vidPlay} onProgress={onPlaybackStatusUpdate} width={'100%'} onStart={handleVideoLoad} url={source} />
        {
            vidPlay === false && <IconButton position={'absolute'} width={'30%'} height={70} borderRadius={20} onClick={() => setVidPlay(true)} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1 h-1" style={{ width: 25, height: 25}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          }
            />
        }
        {
            captchaVisible && <Flex ml={-8} flex={1} width={'100%'} zIndex={1} justifyContent={'center'} height={500} alignItems={'center'} position={'absolute'} backgroundColor={'white'}>
                <ReCAPTCHA
                    size='normal'
                    sitekey="6Lf8qxQlAAAAAFZJkdgxmNJDnhS8wm8xioRm3Gxi"
                    onChange={onVerify}
                />
            </Flex>
        }
    </Flex>
  )
}

export default VideoPlayer
