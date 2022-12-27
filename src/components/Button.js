import React from "react";

function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      <div>
        <img src={props.image} alt={props.alt} />
      </div>
      {props.innerText}
    </button>
  );
}

export default Button;
