import { FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGE_SUCCESS, FETCH_MESSAGES_REQUEST, SEND_MESSAGES_SUCCESS } from "./ChatType";

const initalState={
    messages:[],
    loading:false,
    error:null,
    chat:null
}


const chatReducer=(state=initalState,action)=>
{
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case FETCH_CHAT_BY_PROJECT_REQUEST:
        case FETCH_MESSAGES_REQUEST:
            return{
                ...state,
                loading:true,
                error:null
                }
        case FETCH_CHAT_MESSAGE_SUCCESS:
        case FETCH_CHAT_MESSAGE_SUCCESS:
            return {
                ...state,
                loading:false,
                messages:action.messages}
        
        case SEND_MESSAGES_SUCCESS:
            return {
                ...state,
                loading:false,
                messages:[...state.messages,action.messages]
            }
        case FETCH_CHAT_BY_PROJECT_SUCCESS:
            return {
                ...state,
                loading:false,
                chat:action.chat
            }
        default:
            return state;
    }
}

export default chatReducer;