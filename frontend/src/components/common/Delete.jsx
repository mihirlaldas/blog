import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { fetchBlogData } from "../../redux/blog/blog_action";
import { connect } from "react-redux";
export class Delete extends Component {
  handleDelete = async e => {
    let blog_id = this.props.match.params.id;
    console.log(blog_id);
    const config = {
      method: "DELETE",
      url: "http://localhost:5000/delete_blog",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"]
      },
      data: {
        blog_id: blog_id
      }
    };
    const result = await this.props.fetchBlogData(config);

    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row border border-danger bg-light">
            <div className="col">
              <p>
                Are you sure you want to delete blog id:
                {this.props.match.params.id}
              </p>
              <button className="btn btn-warning" onClick={this.handleDelete}>
                DELETE
              </button>
              <button
                className="btn btn-successs"
                onClick={() => this.props.history.push("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchBlogData })(Delete);
