import { createContext, useEffect, useState } from 'react'
import { fetchData } from '../Helpers/axiosHelper.js';

export const PixarContext = createContext();

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState()

  useEffect(()=>{
    const fetchUser = async (token) =>{
      try {
        const res = await fetchData('user/findUserById', "get", null, {authorization: `bearer ${token}`})
        setUser(res.data)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    const tokenLocal = localStorage.getItem("token")
    if(tokenLocal){
      fetchUser(tokenLocal)
      setToken(tokenLocal)
    }
  }, [])
  
  console.log("USERRRRRRRRR", user);
  return (
    <PixarContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </PixarContext.Provider>
  )
}

