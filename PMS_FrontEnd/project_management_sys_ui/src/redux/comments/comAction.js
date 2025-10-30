import { CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS } from "./comActionTypes"
import api from "../../config/api"

export const createComment=({commentData})=>
{
    return async (dispatch)=>{
        dispatch({type:CREATE_COMMENT_REQUEST})
        try {
            const response=await api.post(
              '/api/comments/create',commentData
            );
            console.log("comment created",response.data)
            dispatch({type:CREATE_COMMENT_SUCCESS,
                comment:response.data,
            })
        } catch (error) {
            console.log("Comment Creation error ",error)
        }
    }
}


export const deleteComment=({commentId})=>
{
    return async (dispatch)=>{
        dispatch({type:DELETE_COMMENT_REQUEST})
        try {
            const response=await api.post(
              '/api/comments/del/'+commentId
            );
            console.log("comment deleted",commentId)
            dispatch({type:DELETE_COMMENT_SUCCESS,
                commentId,
            })
        } catch (error) {
            console.log("Comment Deletion error ",error)
        }
    }
}


export const fetchComment=({issueId})=>
{
    return async (dispatch)=>{
        dispatch({type:FETCH_COMMENT_REQUEST})
        try {
            const response=await api.post(
              `/api/comments/${issueId}`
            );
            console.log("Fetched comment ",response.data)
            dispatch({type:FETCH_COMMENT_SUCCESS,
                comments:response.data,
            })
        } catch (error) {
            console.log("Comment Creation error ",error)
        }
    }
}


