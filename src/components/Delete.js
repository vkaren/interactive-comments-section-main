import React from "react";

function Delete(props) {
  return (
    <div className="deleting-overlay" onClick={props.cancelDelete}>
      <div className="deleting-box">
        <h2>Delete Comment</h2>
        <p>
          Are you sure do you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="delete-options">
          <button onClick={props.cancelDelete} className="cancel-bttn">
            No, cancel
          </button>
          <button onClick={props.delete} className="accept-bttn">
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
