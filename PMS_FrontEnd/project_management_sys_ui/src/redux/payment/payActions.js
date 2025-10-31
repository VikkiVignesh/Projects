import api from "../../config/api"
import { CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS } from "./payActionTypes"

export const createPayment=({planType,jwt})=>
{
    return async (dispatch)=>
    {
       dispatch({type:CREATE_PAYMENT_REQUEST})
       try {
         const response=await api.post(`/api/payment/${planType}`)
         if(response.data.payment_link_url)
         {
            window.location.href=response.data.payment_link_url;
         }
         dispatch({type:CREATE_PAYMENT_SUCCESS,payload:response.data})

         console.log("Payment Success ",response.data);
         
       } catch (error) {
          console.error("Payment Creation Error",error);
       }
    }
}