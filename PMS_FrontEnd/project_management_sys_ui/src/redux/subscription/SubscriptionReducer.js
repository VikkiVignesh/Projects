import { GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./subActionTypes";

const initalState={
    userSubscription:null,
    loading:false,
    error:null,
}


const subscriptionReducer=(state=initalState,action)=>
{
    switch (action.type) {
        case GET_USER_SUBSCRIPTION_REQUEST:
        case UPGRADE_SUBSCRIPTION_REQUEST:
            return {
                ...state,
                loading:true,
                error:false,
            }

        case GET_USER_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                userSubscription:action.payload,
                error:null,
                loading:false,
            }

        case UPGRADE_SUBSCRIPTION_SUCCESS:
            return {
                ...state,
                loading:false,
                error:false,
                userSubscription:action.payload,
            }
        default:
            return state;
    }
}


export default subscriptionReducer;