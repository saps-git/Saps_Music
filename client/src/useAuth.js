import { useState, useEffect} from 'react';
import axios from 'axios';

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
      axios.post("http://localhost:3001/login", {code}
      ).then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");   //clears every thing in the url i.e doesn't show sensitive data
      }).catch(() => {
          window.location = "/";
      })
    }, [code]);

    useEffect(() => {
        if(!refreshToken || !expiresIn)   //so that it doesn't run before the above useEffect
            return;
        
        const interval = setInterval(() => {
            axios.post("http://localhost:3001/refresh", {refreshToken}
            ).then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            }).catch(() => {
                window.location = "/";
            })
        },(expiresIn - 60) * 1000);   //renders 1 minute before the referesh token expires
        
        return () => clearInterval(interval);  //cleanup, if any error occures

    }, [refreshToken, expiresIn]);

    return accessToken

}

export default useAuth;