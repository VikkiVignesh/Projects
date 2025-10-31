import { FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_REQUEST, FETCH_CHAT_MESSAGE_SUCCESS, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ChatType"
import api from "../../config/api"

export const sendMessage=(messageData)=>
{
    return async(dispatch)=>
    {
        dispatch({type:SEND_MESSAGES_REQUEST})
        try {
            const response= await api.post("/api/msg/send",messageData)
            dispatch({type:SEND_MESSAGES_SUCCESS,message:response.data})
            console.log("Sent Message",response.data);
            
        } catch (error) {
            console.error("Send Message",error)
        }
    }
}


export const fetchChatByProject=(projectId)=>
{
    return async(dispatch)=>
    {
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST})
        try {
            const response= await api.get(`/api/projects/chat/${projectId}`)
            dispatch({type:FETCH_CHAT_BY_PROJECT_SUCCESS,chat:response.data})
            console.log("Fetch Chat By Project ID",response.data);
            
        } catch (error) {
            console.error("Chat Fetching Error",error)
        }
    }
}


export const fetchChatMessages=(chatId)=>
{
    return async(dispatch)=>
    {
        dispatch({type:FETCH_CHAT_MESSAGE_REQUEST})
        try {
            const response= await api.get(`/api/msg/chat/${chatId}`)
            dispatch({type:FETCH_CHAT_MESSAGE_SUCCESS,chatId,messages:response.data})
            console.log("Fetch message by chat",response.data);
            
        } catch (error) {
            console.error("Chat Message Fetching Error",error)
        }
    }
}



