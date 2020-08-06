import { ADD_MESSAGE , CLEAR_MESSAGE} from '../actions/types'

const initialState = {
 message: '',
 error: false,
}


const messagesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MESSAGE: 
      return { ...state, message: action.payload.message, error: action.payload.error }
    case CLEAR_MESSAGE: 
    	return { ...state, message: '', error: false}
    default: 
      return state
  }
}
 
export default messagesReducer