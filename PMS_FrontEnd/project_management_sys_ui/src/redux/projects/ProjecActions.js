import api from "../../config/api"
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECTS_BY_ID_REQUEST, FETCH_PROJECTS_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionTypes"

export const fetchProjects=({category,tag})=>async(dispatch)=>
{
    dispatch({type:FETCH_PROJECTS_REQUEST})
    try {
        const {data}=await api.get("/api/projects/all",{params:{category,tag}})
        console.log("All Projects",data)

        dispatch({type:FETCH_PROJECTS_SUCCESS,projects:data})
    } catch (error) {
        console.log("Fetch Project Error",error)
    }
}


export const searchProject=({keyword})=>async(dispatch)=>
{
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try {
        const {data}=await api.get("/api/projects/search?keyword="+keyword)
        console.log("serached Projects",data)

        dispatch({type:SEARCH_PROJECT_SUCCESS,payload:data})
    } catch (error) {
        console.log("Search Project Error",error)
    }
}


export const createProject=({projectData})=>async(dispatch)=>
{
    dispatch({type:CREATE_PROJECT_REQUEST})
    try {
        const {data}=await api.post("/api/projects/create",projectData)
        console.log("Project creation Successfull...",data)

        dispatch({type:CREATE_PROJECT_SUCCESS,payload:data})
    } catch (error) {
        console.log("Create Project Error",error)
    }
}



export const fetch_Project_Id=(id)=>async(dispatch)=>
{
    dispatch({type:FETCH_PROJECTS_BY_ID_REQUEST})
    try {
        const {data}=await api.get("/api/projects/"+id)
        console.log("Fetched Project by ID",data)

        dispatch({type:FETCH_PROJECTS_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        console.log("Fetch Project by ID Error",error)
    }
}


export const deleteProject=({projectId})=>async(dispatch)=>
{
    dispatch({type:DELETE_PROJECT_REQUEST})
    try {
        const {data}=await api.delete("/api/projects/delete/"+projectId)
        console.log("Project deleted",data)

        dispatch({type:DELETE_PROJECT_SUCCESS,payload:{projectId}})
    } catch (error) {
        console.log("Delete Project Error",error)
    }
}


export const invite_to_Projects=(email,pId)=>async(dispatch)=>
{
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try {
        const {data}=await api.post("/api/projects/invite",{email,pId})
        console.log("Inviattion projcet Successfull...",data)

        dispatch({type:INVITE_TO_PROJECT_SUCCESS,payload:data})
        console.log("Invitation sent to",data);
        
    } catch (error) {
        console.log("Fetch Project Error",error)
    }
}


export const acceptInvitation=({inviteToken,navigate})=>async(dispatch)=>
{
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try {
        const {data}=await api.get("/api/projects/accept_invitation",
            {
                params:
                {
                    token:inviteToken
                }
            })
            navigate("/project/"+data.projectId)
        console.log("Inviattion projcet Successfull...",data)

        dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data})
    } catch (error) {
        console.log("Fetch Project Error",error)
    }
}


