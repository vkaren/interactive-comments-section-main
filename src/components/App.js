import React from "react";
import AddComment from "./AddComment";
import CommentBox from "./CommentBox";
const data = require("../data.json");

class App extends React.Component {
  state = {
    newComment: "",
    comments: data.comments.slice(),
  };

  keyComment = 0;

  componentDidMount() {
    let comments = this.state.comments.slice();

    comments.forEach((comment) => {
      comment.key = "commentbox-" + this.keyComment;
      comment.keyComment = this.keyComment;
      this.keyComment++;
    });

    this.setState({ comments });
  }

  onInputComment = (e) => {
    let newComment = e.currentTarget.value;

    this.setState({ newComment });

    if (e.key === "Enter") {
      this.sendComment();
      this.setState({ newComment: "" });
    }
  };

  sendComment = () => {
    let comments = this.state.comments.slice();
    let newComment = this.state.newComment;

    comments.push({
      key: "commentbox-" + this.keyComment,
      keyComment: this.keyComment,
      content: newComment,
      createdAt: Date.now(),
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    });

    newComment = "";

    this.keyComment++;

    this.setState({ comments, newComment });
  };

  deleteComment = (comment) => {
    let comments = this.state.comments.slice();

    comments.splice(comment, 1);

    this.setState({ comments });
  };

  render() {
    return [
      this.state.comments.map((comment, i) => (
        <CommentBox
          key={comment.key}
          uniqueKey={comment.keyComment}
          index={i}
          username={comment.user.username}
          image={comment.user.image.png}
          createdAt={comment.createdAt}
          score={comment.score}
          content={comment.content}
          replies={comment.replies}
          currentUser={data.currentUser}
          deleteComment={this.deleteComment}
        />
      )),
      <AddComment
        key="add-comment"
        className="add-comment"
        button={{ className: "send-bttn", innerText: "Send" }}
        image={data.currentUser.image.png}
        username={data.currentUser.username}
        value={this.state.newComment}
        onInput={this.onInputComment}
        onClick={this.sendComment}
      />,
    ];
  }
}
export default App;
