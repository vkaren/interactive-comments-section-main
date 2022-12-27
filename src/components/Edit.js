import React from "react";
import Button from "./Button";
import Score from "./Score";
import User from "./User";

function Edit(props) {
  return (
    <div className="editing">
      <Score
        score={props.score}
        scoreInc={props.scoreInc}
        scoreDec={props.scoreDec}
        disabledInc={props.disabledInc}
        disabledDec={props.disabledDec}
      />
      <User
        currentUser={props.currentUser}
        image={props.image}
        username={props.username}
        createdAt={props.createdAt}
      />
      <Button
        className="delete-bttn"
        innerText="Delete"
        onClick={props.onClickDelete}
        image="./images/icon-delete.svg"
        alt="delete"
      />
      <textarea value={props.value} onInput={props.onInput}></textarea>
      <button className="update-bttn" onClick={props.onClickUpdate}>
        Update
      </button>
    </div>
  );
}

export default Edit;
