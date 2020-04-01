import auth_reducer from "./auth/auth_reducer";
import comment_reducer from "./comment/comment_reducer";
import blog_reducer from "./blog/blog_reducer";
import { combineReducers } from "redux";

export default combineReducers({ auth_reducer, blog_reducer, comment_reducer });
