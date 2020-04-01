import {
  BLOG_FETCH_REQUEST,
  BLOG_FETCH_SUCCESS,
  BLOG_FETCH_FAILURE,
  BLOG_RESET
} from "./blog_action";

const initialState = {
  isLoading: false,
  data: {},
  status: null
};

export const blog_reducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_RESET:
      return {
        ...state,
        ...initialState
      };
    case BLOG_FETCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case BLOG_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        status: action.payload.status
      };
    case BLOG_FETCH_FAILURE:
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

export default blog_reducer;
