import { createContext, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import axiosclient from "../axiosClient";
import { useState } from "react";
import axios from "axios";

const stateContext = createContext({
   access_token: null,
   setToken: () => { },
   user: '',
   setUser: () => { }
})
export const ContextProvider = ({ children }) => {
   const [access_token, _setToken] = useState(localStorage.getItem('Token'))
   const [user, setUser] = useState([])
    const[loading,setLoading]=useState(false)

const{data:Cattles} = useQuery({
   queryKey:'Cattles',
   queryFn:async ()=>{
     
      const res = await axiosclient.get('/api/v1/createCow/getCow')
if(res){
   setLoading(true)
}
      // console.log(res.data.data)
      return res.data.data
   }
})


   // login Mutation
   const LoginMutation = useMutation({
      mutationFn: async (data) => {
         const res = await axiosclient.post('/api/v1/user/login', data)
         return res.data
      },
      onError: (err) => {
         console.log(err)
      },
      onSuccess: (data) => {
         if (data.user.role === "admin") {
            setUser(data.user._id)
            setToken(data.access_token)
            console.log(data.user._id)
            window.location.href = '/admin'
         }
         else {
            window.location.href = "/"
         }
      }
   })

   const AddFinancialMutation = useMutation({
      mutationFn: async (data) => {
         const res = await axiosclient.post('/createCow/recordCow', data)
         return res.data
      },
      onError: (err) => {
         alert(err)
      },
      onSuccess: (data) => {
         window.location.href = '/financial'
      }
   })

   
   

   // signup mutation
   const SignupMutation = useMutation({
      mutationFn: async (data) => {
         const res = await axiosclient.post('/api/v1/user/register', data)
         return res.data
      },
      onError: (err) => {
         alert(err)
      },
      onSuccess: (data) => {

         // setToken(data.access_token)
         // console.log(data.newUser.role)
         window.location.href = '/login'
      }
   })

   // add cattle 

   const AddcattleMutation = useMutation({
      mutationFn: async (data) => {
         const res = await axiosclient.post('/createCow/recordCow', data)
         return res.data
      },
      onError: (err) => {
         alert(err)
      },
      onSuccess: (data) => {
         window.location.href = '/Cattles'
      }
   })

   const setToken = (access_token) => {
      _setToken(access_token)
      if (access_token) {
         localStorage.setItem('Token', access_token)
      }
      else {
         localStorage.removeItem('Token')
      }
   }
   return (
      <stateContext.Provider value={{
         Cattles,
         access_token,
         setToken,
         SignupMutation,
         LoginMutation,
         setUser,
         AddcattleMutation,
         user,
         loading,
         setLoading,
         AddFinancialMutation
      }}>
         {children}
      </stateContext.Provider>
   )
}

export const usestateContext = () => useContext(stateContext)