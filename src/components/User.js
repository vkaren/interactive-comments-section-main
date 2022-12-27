import React from "react";

function User(props) {
  return (
    <div className="user">
      <div className="username-img">
        <img src={props.image} alt={props.username} />
      </div>

      {props.currentUser === props.username ? (
        <span className="currentuser">you</span>
      ) : null}

      <span className="username">{props.username}</span>
      <span className="time">{props.createdAt} </span>
    </div>
  );
}

export default User;
