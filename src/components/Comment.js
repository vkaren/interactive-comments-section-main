import React from "react";
import Button from "./Button";
import Delete from "./Delete";
import Edit from "./Edit";
import Score from "./Score";
import User from "./User";

class Comment extends React.Component {
  state = {
    score: this.props.score,
    disabledInc: false,
    disabledDec: false,
    createdAt: "now",
    timerDelay: 30000,
    content: this.props.content,
    editedContent:
      this.props.className === "reply"
        ? `@${this.props.replyingTo} ${this.props.content}`
        : `${this.props.content}`,
    editing: false,
    delete: false,
  };

  componentDidMount() {
    if (
      this.props.currentUser === this.props.username &&
      !isNaN(this.props.createdAt)
    ) {
      this.timer = setInterval(this.date, this.state.timerDelay);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  date = () => {
    let date = Math.floor((Date.now() - this.props.createdAt) / 1000);
    let createdAt = this.state.createdAt;
    let timerDelay = this.state.timerDelay;

    let time = {
      year: 31536000,
      month: 2629800,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let key in time) {
      if (date >= time[key]) {
        let newTime = Math.floor(date / time[key]);
        createdAt = `${newTime}  ${newTime > 1 ? ` ${key}s` : ` ${key}`} ago`;
        timerDelay = key === "second" ? 30000 : time[key] * 1000;
        this.setState({ createdAt, timerDelay });
        return;
      }
    }
  };

  scoreInc = () => {
    let score = this.state.score;
    score++;
    this.setState({ score, disabledInc: true, disabledDec: false });
  };

  scoreDec = () => {
    let score = this.state.score;
    score--;
    this.setState({ score, disabledInc: false, disabledDec: true });
  };

  edit = () => {
    this.setState({ editing: true });
  };

  onInputEdit = (e) => {
    let editedContent = e.currentTarget.value;
    this.setState({ editedContent });
  };

  update = () => {
    let editedContent = this.state.editedContent;
    let replyingTo = this.props.replyingTo;

    if (this.props.className === "reply") {
      editedContent = editedContent.substring(replyingTo.length + 1);
    }

    this.setState({ content: editedContent, editing: false });
  };

  deleting = () => {
    this.setState({ delete: true });
  };

  cancelDelete = (e) => {
    if (
      e.target.className === "cancel-bttn" ||
      e.target.className === "deleting-overlay"
    ) {
      this.setState({ delete: false });
    }
  };

  delete = () => {
    this.props.onDelete(this.props.index);
    this.setState({ delete: false });
  };

  render() {
    return [
      !this.state.editing ? (
        <div
          className={this.props.className}
          key={`${this.props.className}-${this.props.uniqueKey}`}
        >
          <Score
            key={`score-${this.props.className}-${this.props.uniqueKey}`}
            score={this.state.score}
            scoreInc={this.scoreInc}
            scoreDec={this.scoreDec}
            disabledInc={this.state.disabledInc}
            disabledDec={this.state.disabledDec}
          />

          <User
            key={`user-${this.props.className}-${this.props.uniqueKey}`}
            currentUser={this.props.currentUser}
            image={this.props.image}
            username={this.props.username}
            createdAt={
              this.props.currentUser === this.props.username &&
              !isNaN(this.props.createdAt)
                ? this.state.createdAt
                : this.props.createdAt
            }
          />

          {this.props.currentUser === this.props.username ? (
            <div
              className="currentuser-features"
              key={`currentuser-features-${this.props.className}-${this.props.uniqueKey}`}
            >
              <Button
                key={`delete-bttn-${this.props.className}-${this.props.uniqueKey}`}
                className="delete-bttn"
                innerText="Delete"
                onClick={this.deleting}
                image="./images/icon-delete.svg"
                alt="delete"
              />
              <Button
                key={`edit-bttn-${this.props.className}-${this.props.uniqueKey}`}
                className="edit-bttn"
                innerText="Edit"
                onClick={this.edit}
                image="./images/icon-edit.svg"
                alt="edit"
              />
            </div>
          ) : (
            <Button
              key={`reply-bttn-${this.props.className}-${this.props.uniqueKey}`}
              className="reply-bttn"
              innerText="Reply"
              onClick={() => this.props.reply(this.props.username)}
              image="./images/icon-reply.svg"
              alt="reply"
            />
          )}

          <div
            className="content"
            key={`content-${this.props.className}-${this.props.uniqueKey}`}
          >
            {this.props.className === "reply" ? (
              <span className="replied-to">@{this.props.replyingTo} </span>
            ) : null}

            {this.state.content}
          </div>
        </div>
      ) : (
        <Edit
          key={`edit-${this.props.className}-${this.props.uniqueKey}`}
          score={this.state.score}
          scoreInc={this.scoreInc}
          scoreDec={this.scoreDec}
          disabledInc={this.state.disabledInc}
          disabledDec={this.state.disabledDec}
          currentUser={this.props.currentUser}
          image={this.props.image}
          username={this.props.username}
          createdAt={
            this.props.currentUser === this.props.username &&
            !isNaN(this.props.createdAt)
              ? this.state.createdAt
              : this.props.createdAt
          }
          onClickDelete={this.props.deleting}
          value={this.state.editedContent}
          onInput={this.onInputEdit}
          onClickUpdate={this.update}
        />
      ),
      this.state.delete ? (
        <Delete
          key="delete"
          cancelDelete={this.cancelDelete}
          delete={this.delete}
        />
      ) : null,
    ];
  }
}

export default Comment;
