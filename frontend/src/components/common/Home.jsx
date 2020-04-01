import { connect } from "react-redux";
import { fetchBlogData } from "../../redux/blog/blog_action";
import { authReset } from "../../redux/auth/auth_action";
import React, { Component } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_title: "",
      content: "",
      category: "1"
    };

    this.loadBlogs();
  }
  loadBlogs = () => {
    const config = {
      method: "GET",
      url: "http://localhost:5000/show_blogs"
    };
    const result = this.props.fetchBlogData(config);
    console.log(result);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    console.log("home page ");
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    const config = {
      method: "POST",
      url: "http://localhost:5000/new_blog",
      data: { ...this.state, user_id: this.props.user_id }
    };
    const result = await this.props.fetchBlogData(config);
    console.log(result);
    this.setState({
      blog_title: "",
      content: "",
      category: "1"
    });
    this.loadBlogs();
  };
  render() {
    if (!this.props.data.data) return null;
    let ownData = this.props.data.data.filter(
      ele => ele["user_id"] === this.props.user_id
    );
    console.log(ownData);
    let otherData = this.props.data.data.filter(
      ele => ele["user_id"] !== this.props.user_id
    );
    console.log(otherData);
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="bg-primary text-white text-center">
                Create new Blog
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <form
                onSubmit={this.handleSubmit}
                className="form-group p-2 bg-light"
              >
                <input
                  type="text"
                  name="blog_title"
                  placeholder="Enter blog title"
                  onChange={this.handleChange}
                  className="form-control"
                />
                <input
                  type="textarea"
                  name="content"
                  placeholder="write blog"
                  onChange={this.handleChange}
                  className="form-control mt-2"
                />
                <hr />
                <span>category:</span>
                <input
                  type="radio"
                  name="category"
                  value="1"
                  onChange={this.handleChange}
                  checked
                />
                <label htmlFor="category"> General</label>
                <br />
                <button type="submit" className="btn btn-primary text-center">
                  Post blog
                </button>
              </form>
            </div>
          </div>
          <div className="card-deck">
            {ownData.map(ele => (
              <Link to={`/blog/${ele["id"]}`} key={ele["id"]}>
                <Card
                  body={ele["content"]}
                  title={ele["title"]}
                  isOwner={true}
                  author={ele["name"]}
                  edit={`/edit/${ele["id"]}`}
                  delete={`/delete/${ele["id"]}`}
                />
              </Link>
            ))}
            {otherData.map(ele => (
              <Link to={`/blog/${ele["id"]}`} key={ele["id"]}>
                <Card
                  body={ele["content"]}
                  title={ele["title"]}
                  isOwner={false}
                  author={ele["name"]}
                />
              </Link>
            ))}
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => this.props.authReset()}
        >
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.blog_reducer.data,
    status: state.blog_reducer.status,
    user_id: state.auth_reducer.data.user_id
  };
};
const mapDispatchToProps = { fetchBlogData, authReset };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
