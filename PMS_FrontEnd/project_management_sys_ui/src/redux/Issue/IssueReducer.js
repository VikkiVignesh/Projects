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

const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case FETCH_ISSUES_REQUEST:
    case CREATE_ISSUES_REQUEST:
    case UPDATE_ISSUES_REQUEST:
    case DELETE_ISSUES_REQUEST:
    case FETCH_ISSUES_BY_ID_REQUEST:
    case ASSIGNED_ISSUE_TO_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

   
    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.payload,
      };

  
    case FETCH_ISSUES_BY_ID_SUCCESS:
    case UPDATE_ISSUES_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails: action.payload,
      };

    case CREATE_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [...state.issues, action.payload],
      };

    
    case ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        ),
      };

 
    case DELETE_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter((issue) => issue.id !== action.payload),
      };

    default:
      return state;
  }
};

export default issueReducer;
