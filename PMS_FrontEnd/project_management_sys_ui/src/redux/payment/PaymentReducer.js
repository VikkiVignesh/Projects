import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS } from "./payActionTypes";


const initialState = {
  loading: false,
  paymentData: null,
  error: null,
};

const PaymentReducer=(state=initialState,action)=> {
   switch (action.type) {
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentData: action.payload,
        error: null,
      };

    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "Payment failed. Please try again.",
      };

    default:
      return state;
    }
};


export default PaymentReducer;