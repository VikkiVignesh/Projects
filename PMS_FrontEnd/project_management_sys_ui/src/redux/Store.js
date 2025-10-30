import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'

import {thunk} from 'redux-thunk'

import projectReducer from "./projects/ProjectReducer"
import chatReducer from './chat/ChatReducer'
import authReducer from './Auth/Reducer'
import commentReducer from './comments/CommentReducer'
import issueReducer from './Issue/IssueReducer'
import subscriptionReducer from './subscription/SubscriptionReducer'


const rootReducer=combineReducers(
    {
        auth:authReducer,
        project:projectReducer,
        chat:chatReducer,
        comment:commentReducer,
        issue:issueReducer,
        subscription:subscriptionReducer
    }
)

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))