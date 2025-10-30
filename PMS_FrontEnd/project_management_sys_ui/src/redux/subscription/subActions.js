import api from "../../config/api";
import { GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./subActionTypes"

export const getUserSubscription=(jwt)=>
{
    return async (dispatch)=>{
        dispatch({type:GET_USER_SUBSCRIPTION_REQUEST});
        try {
            const response=await api.get("/api/subscription/user",
                {
                    headers:{
                        "Authorization":`Bearer ${jwt}`
                    }
                }
            )

            dispatch({
                type:GET_USER_SUBSCRIPTION_SUCCESS,
                payload:response.data
            })

            console.log("User Subscription",response.data)
        } catch (error) {
            console.log("Error in getting user Subscription",error)
        }
    }
}


export const upgradeSubscription=({planType})=>
{
    return async (dispatch)=>{
        dispatch({type:UPGRADE_SUBSCRIPTION_REQUEST});
        try {
            const response=await api.patch("/api/subscription/upgrade",
                {
                    params:
                    {
                        planType:planType
                    }
                }
            )

            dispatch({
                type:UPGRADE_SUBSCRIPTION_SUCCESS,
                payload:response.data
            })

            console.log("User Subscription",response.data)
        } catch (error) {
            console.log("Error in upgrading user Subscription",error)
        }
    }
}