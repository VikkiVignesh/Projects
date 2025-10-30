import { FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_REQUEST, FETCH_CHAT_MESSAGE_SUCCESS, SEND_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ChatType"
import api from "../../config/api"

export const sendMessage=(messageData)=>
{
    return async(dispatch)=>
    {
        dispatch({type:SEND_MESSAGES_REQUEST})
        try {
            const response= await api.post("/api/message/send",messageData)
            dispatch({type:SEND_MESSAGES_SUCCESS,message:response.data})
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
            const response= await api.get(`api/projects/${projectId}/chat`)
            dispatch({type:FETCH_CHAT_BY_PROJECT_SUCCESS,chat:response.data})
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
            const response= await api.get(`api/messages/chat/${projectId}`)
            dispatch({type:FETCH_CHAT_MESSAGE_SUCCESS,chatId,messages:response.data})
        } catch (error) {
            console.error("Chat Message Fetching Error",error)
        }
    }
}



