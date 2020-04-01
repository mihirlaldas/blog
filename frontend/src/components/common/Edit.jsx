import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlogData } from "../../redux/blog/blog_action";

export class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: this.props.match.params["id"],
      blog_title: this.props.data.data.find(
        ele => ele["id"] === Number(this.props.match.params["id"])
      )["title"],
      content: this.props.data.data.find(
        ele => ele["id"] === Number(this.props.match.params["id"])
      )["content"],
      category: this.props.data.data.find(
        ele => ele["id"] === Number(this.props.match.params["id"])
      )["category_id"]
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    const config = {
      method: "PUT",
      url: "http://localhost:5000/update_blog",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"]
      },
      data: { ...this.state, user_id: this.props.user_id }
    };
    const result = await this.props.fetchBlogData(config);
    console.log(result);
    this.setState({
      blog_title: "",
      content: "",
      category: "1"
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="bg-primary text-white text-center">Edit Blog</h3>
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
                  value={this.state.blog_title}
                  className="form-control"
                />
                <input
                  type="textarea"
                  name="content"
                  placeholder="write blog"
                  onChange={this.handleChange}
                  value={this.state.content}
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
                  Update blog
                </button>
              </form>
            </div>
          </div>
        </div>
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
const mapDispatchToProps = { fetchBlogData };
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
