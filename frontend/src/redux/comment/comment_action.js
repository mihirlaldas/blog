import axios from "axios";

export const COMMENT_FETCH_REQUEST = "COMMENT_FETCH_REQUEST";
export const COMMENT_FETCH_SUCCESS = "COMMENT_FETCH_SUCCESS";
export const COMMENT_FETCH_FAILURE = "COMMENT_FETCH_FAILURE";
export const COMMENT_RESET = "COMMENT_RESET";

export const commentReset = () => {
  return {
    type: COMMENT_RESET
  };
};
export const fetchCommentRequest = () => {
  return {
    type: COMMENT_FETCH_REQUEST
  };
};

export const fetchCommentSuccess = data => {
  return {
    type: COMMENT_FETCH_SUCCESS,
    payload: data
  };
};

export const fetchCommentFailure = data => {
  return {
    type: COMMENT_FETCH_FAILURE,
    payload: data
  };
};

export const fetchCommentData = config => {
  return async dispatch => {
    dispatch(fetchCommentRequest);
    return await axios(config)
      .then(res => dispatch(fetchCommentSuccess(res)))
      .catch(error => dispatch(fetchCommentFailure(error)));
  };
};
