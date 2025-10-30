import api from "../../config/api";
import {
  ASSIGNED_ISSUE_TO_USER_REQUEST,
  ASSIGNED_ISSUE_TO_USER_SUCCESS,
  CREATE_ISSUES_REQUEST,
  CREATE_ISSUES_SUCCESS,
  FETCH_ISSUES_BY_ID_REQUEST,
  FETCH_ISSUES_BY_ID_SUCCESS,
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  UPDATE_ISSUES_REQUEST,
  UPDATE_ISSUES_STATUS_SUCCESS,
  DELETE_ISSUES_REQUEST,
  DELETE_ISSUES_SUCCESS,
} from "./IssueActionTypes";


export const createIssue = (issueData) => async (dispatch) => {
  dispatch({ type: CREATE_ISSUES_REQUEST });
  try {
    const res = await api.post("/api/issues/create", issueData);
    console.log("Created Issue:", res.data);
    dispatch({
      type: CREATE_ISSUES_SUCCESS,
      payload: res.data,
    });
    console.log("Issues created successfully",res.data);
    
  } catch (error) {
    console.log("Issue Creation Error:", error);
  }
};


export const fetchIssues = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUES_REQUEST });
  try {
    const res = await api.get(`/api/issues/project/${projectId}`);
    console.log("Fetched Issues:", res.data);
    dispatch({
      type: FETCH_ISSUES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error fetching issues:", error);
  }
};


export const fetchIssueById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
  try {
    const res = await api.get(`/api/issues/${id}`);
    console.log("Fetched Issue By ID:", res.data);
    dispatch({
      type: FETCH_ISSUES_BY_ID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error fetching issue by ID:", error);
  }
};

export const updateIssueStatus = ({ id, status }) => async (dispatch) => {
  dispatch({ type: UPDATE_ISSUES_REQUEST });
  try {
    const res = await api.put(`/api/issues/${id}/status/${status}`);
    console.log("Updated Issue Status:", res.data);
    dispatch({
      type: UPDATE_ISSUES_STATUS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error updating issue status:", error);
  }
};


export const assignUserToIssue = ({ issueId, userId }) => async (dispatch) => {
  dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST });
  try {
    const res = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
    console.log("Assigned User To Issue:", res.data);
    dispatch({
      type: ASSIGNED_ISSUE_TO_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error assigning user:", error);
  }
};


export const deleteIssue = (issueId) => async (dispatch) => {
  dispatch({ type: DELETE_ISSUES_REQUEST });
  try {
    await api.delete(`/api/issues/del/${issueId}`);
    console.log("Deleted Issue:", issueId);
    dispatch({
      type: DELETE_ISSUES_SUCCESS,
      payload: issueId,
    });
  } catch (error) {
    console.log("Error deleting issue:", error);
  }
};
