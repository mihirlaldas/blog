import axios from "axios";

export const BLOG_FETCH_REQUEST = "BLOG_FETCH_REQUEST";
export const BLOG_FETCH_SUCCESS = "BLOG_FETCH_SUCCESS";
export const BLOG_FETCH_FAILURE = "BLOG_FETCH_FAILURE";
export const BLOG_RESET = "BLOG_RESET";

export const blogReset = () => {
  return {
    type: BLOG_RESET
  };
};
export const fetchBlogRequest = () => {
  return {
    type: BLOG_FETCH_REQUEST
  };
};

export const fetchBlogSuccess = data => {
  return {
    type: BLOG_FETCH_SUCCESS,
    payload: data
  };
};

export const fetchBlogFailure = data => {
  return {
    type: BLOG_FETCH_FAILURE,
    payload: data
  };
};

export const fetchBlogData = config => {
  return async dispatch => {
    dispatch(fetchBlogRequest);
    return await axios(config)
      .then(res => dispatch(fetchBlogSuccess(res)))
      .catch(error => dispatch(fetchBlogFailure(error)));
  };
};
