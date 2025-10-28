import { API_URL } from "../../config/api"
import { REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import axios from 'axios'

export const register=userData=>async (dispatch) => {
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data}=await axios.post(`${API_URL}/auth/sign-up`,userData)
        if(data.jwt)
        {
            localStorage.setItem("jwt",data.jwt)
            dispatch({type:REGISTER_SUCCESS })
        }

        console.log("user Registration Success..",data)
    } catch (error) {
        console.log(error)
    }
}