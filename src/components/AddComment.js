import React from "react";

function AddComment(props) {
  return (
    <div className={props.className}>
      <div className="username-img">
        <img src={props.image} alt={props.username} />
      </div>
      <textarea
        value={props.value}
        onInput={props.onInput}
        onKeyDown={props.onInput}
      ></textarea>
      <button className={props.button.className} onClick={props.onClick}>
        {props.button.innerText}
      </button>
    </div>
  );
}

export default AddComment;
