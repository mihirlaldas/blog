import React from "react";
import { Link } from "react-router-dom";
export default function Card(props) {
  console.log(props);
  return (
    <div>
      <div className="card m-2" style={{ width: "16rem" }}>
        <div className="card-header">{props.title}</div>
        <div className="card-body">
          <p className="card-text">{props.body}</p>
        </div>

        {props.isOwner ? (
          <div className="card-footer">
            Author: {props.author}
            <br />
            <Link to={props.edit}>Edit</Link>
            <br />
            <Link to={props.delete}>Delete</Link>
          </div>
        ) : (
          <div className="card-footer">Author: {props.author}</div>
        )}
      </div>
    </div>
  );
}
