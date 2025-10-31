import { API_URL } from "../../config/api"
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import axios from 'axios'

export const registerUser=userData=>async (dispatch) => {
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/sign-up`,userData)
        
        dispatch({type:REGISTER_SUCCESS ,payload:data})

        console.log("user Registration Success..",data)
        alert("Registered Successfully , please login in with ur credentials")
        return { success: true, data };
    } catch (error) {
        console.log(error)
    }
}

export const loginUser=userData=>async (dispatch) => {
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/sign-in`,userData)
        if(data.jwt)
        {
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:LOGIN_SUCCESS ,payload:data} )
        }

        console.log("user Login Success..",data)
    } catch (error) {
        console.log(error)
    }
}


export const getUser=()=>async (dispatch) => {
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data}=await axios.get(`${API_URL}/api/users/profile`,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        )
    
        dispatch({type:GET_USER_SUCCESS, payload:data.user || data.data || data} )

        console.log("user profile fetched.",data)
    } catch (error) {
        console.log(error)
    }
}


export const logoutUser=()=> async(dispatch)=>{
    localStorage.clear();
    dispatch({ type: LOGOUT });
}