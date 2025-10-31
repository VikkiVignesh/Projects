import { CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS } from "./comActionTypes"
import api from "../../config/api"

export const createComment=(commentData)=>
{
    return async (dispatch)=>{
        dispatch({type:CREATE_COMMENT_REQUEST})
        try {
            const response=await api.post(
              '/api/comment/create',commentData
            );
            console.log("comment created",response.data)
            dispatch({type:CREATE_COMMENT_SUCCESS,
                payload:response.data,
            })
        } catch (error) {
            console.log("Comment Creation error ",error)
        }
    }
}


export const deleteComment=(id)=>
{
    return async (dispatch)=>{
        dispatch({type:DELETE_COMMENT_REQUEST})
        try {
            const response=await api.delete(
              '/api/comment/delete/'+id
            );
            console.log("comment deleted",id)
            dispatch({type:DELETE_COMMENT_SUCCESS,
                id,
            })
        } catch (error) {
            console.log("Comment Deletion error ",error)
        }
    }
}


export const fetchComment=(issueId)=>
{
    return async (dispatch)=>{
        dispatch({type:FETCH_COMMENT_REQUEST})
        try {
            const response=await api.get(
              `/api/comment/${issueId}`
            );
            console.log("Fetched comments ",response.data)
            dispatch({type:FETCH_COMMENT_SUCCESS,
                comments:response.data,
            })
        } catch (error) {
            console.log("Comment Creation error ",error)
        }
    }
}


