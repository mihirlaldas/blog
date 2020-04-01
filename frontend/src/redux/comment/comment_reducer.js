import {
  COMMENT_FETCH_REQUEST,
  COMMENT_FETCH_SUCCESS,
  COMMENT_FETCH_FAILURE,
  COMMENT_RESET
} from "./comment_action";

const initialState = {
  data: {},
  isLoading: false,
  status: null
};

const comment_reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_RESET:
      return {
        ...state,
        ...initialState
      };
    case COMMENT_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case COMMENT_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload.status
      };
    case COMMENT_FETCH_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload
      };
    default:
      return state;
  }
};

export default comment_reducer;
