import { useState, useEffect } from 'react'
import  { Flex, Text, Input, Button, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'
import { auth } from './utils/firebaseConfig';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import supabaseClient from './utils/supabaseClient';
import axios from 'axios';
import './App.css'
import Loader from './components/Loader';
import Error from './components/Error';
import CampaignVideo from './pages/CampaignVideo';
import Header from './components/Header';
import { MyGlobalContext } from './context/GlobalContext';

var userid;

function App() {
  const [user, setUser] = useState(null);
  const [userDet, setUserDet] = useState(null);
  const [error, setError] = useState(false);
  const [refError, setrefError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [refId, setrefId] = useState("");
  const [refStatus, setrefStatus] = useState(false);
  const [watchStatus, setwatchStatus] = useState(false);

  const getCurrentUserDetails = async (user) => { 
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', user)

    return { data, error };
  }

  const getCurrentUserDetailsIp = async (user, ip) => { 
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', user).eq('ip', ip)

    return { data, error };
  }
  
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    return (res.data.ip);
  };

  const createSupabaseUser = async (user, refid, ip) => { 
    const { data, error } = await supabaseClient
    .from('users')
    .insert([
        { id: user, ip, refid },
    ]).select()

    return { data, error };
  }

  useEffect(() => {
    
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log(user);
        
        setUser(user);
        userid = user.uid;
      
        await getCurrentUserDetails(userid).then(({ data, error }) => { 
          if(error) { 
              setError(true);
              return;
          }
          if(data.length === 0) {
            setrefStatus(true);
            setLoading(false);
          }else {
            console.log(data)
            if(data[0].watch_stat === 'W') {
              setwatchStatus(true);
            }
            setUserDet(data[0]);
            setLoading(false);
          }
        })

      }else {
        await signInAnonymously(auth).then(({user}) => {
          console.log('userA', user)
        })
        .catch((error) => {
          console.log(error)
          setError(true);
        });
      }
    });

  }, [])

  const setUserDetails = async () => {
    if(refId == "") {
      setrefError("Please provide referrer id");
    }else {
      setBtnLoading(true);
      const ip = null;

      await createSupabaseUser(user.uid, refId, ip).then(({ error, data }) => {
        if (error) {
            error.code === '23503' ? setrefError('Invalid referral id') : setrefError(error.message);
            console.log(error);
            setBtnLoading(false);
            return;
        }
        setrefStatus(false);
        setUserDet(data[0]);
        setBtnLoading(false);
      })
    }
  }

  if(loading == true) {
    return <Loader />
  } else if(error) {
    return <Error msg="There was an error. Please try again after sometime" />
  } else if(refStatus == true) { 
    return (
      <Flex justifyContent={'center'} direction={'column'} alignItems={'center'}>
          {
            refError && <Error msg={refError} />
          }
          <Input placeholder="Referral id" mt={5} onChange={(e) => setrefId(e.target.value)} /> 
          <Button
              mt={4}
              colorScheme={'blue'}
              size={'md'}
              variant={'solid'}
              isLoading={btnLoading}
              onClick={setUserDetails}
            >
              <Text fontSize={'xs'}>Submit</Text>
            </Button>
      </Flex>
    )
  } else if(watchStatus == true) { 
    return (
      <>
      <Alert status="warning">
          <AlertIcon />
          <AlertDescription>You already watched this video</AlertDescription>
      </Alert>
      </>
    )
  } else {
    return (
      <MyGlobalContext.Provider value={{ user, setUser, userDet, setUserDet, loading, setLoading, error, setError }}>
        <CampaignVideo />
      </MyGlobalContext.Provider>
    )
  }
}

export default App
