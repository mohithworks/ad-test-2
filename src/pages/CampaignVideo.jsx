import { useState, useEffect } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import { useGlobalContext  } from '../context/GlobalContext'
import Loader from '../components/Loader'
import Error from '../components/Error'
import axios from 'axios';

const CampaignVideo = () => {
  const { user, userDet } = useGlobalContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [source, setSource] = useState();
  const campid = "f2eed168-c51d-4c02-b80a-e7ceb8988cb4";
  const refid = userDet.refid;

  const getVideoSource = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://ad-backend.onrender.com/video/request2",
      params: {
        userid: user.uid,
        campid: campid,
        refid: refid,
      },
    };

    axios.request(options).then(async (response) => {
      if(response.status === 400) {
        setError(response.data);
      }else {
        setSource(response.data);
        setLoading(false);
      }
    }).catch((error) => {
      setError(error.response.data);
      console.log(error.response.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    getVideoSource();
  }, []);

  if(error) {
    return <Error msg={error} />
  }else if(loading === true) { 
    return <Loader />
  }
  return (
    <VideoPlayer source={source} />
  )
}

export default CampaignVideo