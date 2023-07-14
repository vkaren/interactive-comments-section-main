import React from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.user,
      comments: JSON.parse(localStorage.getItem("comments")),
      commentContentToAdd: "",
      lastCommentId: null,
    };
  }

  componentDidMount() {
    this.setState({ lastCommentId: this.getLastCommentId() });
  }

  getLastCommentId = () => {
    const comments = this.state.comments;

    return comments.flatMap((c) =>
      c.replies.length > 0 ? [c, c.replies].flat() : [c]
    ).length;
  };

  onWritingComment = (replyComment = null) => {
    /**
     * Debounce function to update commentContentToAdd only when the user stop typing
     * and call onAddReply or onAddComment if the Enter key is pressed
     *
     * @params {object} replyComment, required when it's a reply comment
     */

    let timer;

    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }

      const commentContentToAdd = e.currentTarget.value;
      const isEnterPressed = e.key === "Enter";

      timer = setTimeout(() => {
        this.setState({ commentContentToAdd }, () => {
          if (isEnterPressed) {
            replyComment ? this.onAddReply(replyComment) : this.onAddComment();
          }
        });
      }, 500);
    };
  };

  onAddComment = () => {
    const commentToAdd = {
      id: this.state.lastCommentId + 1,
      content: this.state.commentContentToAdd,
      createdAt: Date.now(),
      score: 0,
      user: this.state.currentUser,
      replies: [],
    };

    const comments = this.state.comments;

    comments.push(commentToAdd);

    this.updateComments({ comments, lastCommentId: commentToAdd.id });
  };

  onAddReply = (replyComment) => {
    const commentToAdd = {
      id: this.state.lastCommentId + 1,
      content: this.state.commentContentToAdd,
      createdAt: Date.now(),
      score: 0,
      user: this.state.currentUser,
      replyingTo: replyComment.replyingTo,
    };

    const comments = this.state.comments;

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];

      if (comment.id == replyComment.replyingToCommentId) {
        comment.replies.push(commentToAdd);
        break;
      }
    }

    this.updateComments({ comments, lastCommentId: commentToAdd.id });
    replyComment.hideAddCommentBox();
  };

  updateComments({ comments, lastCommentId }) {
    localStorage.setItem("comments", JSON.stringify(comments));
    this.setState({ comments, lastCommentId });
  }

  onEditComment = () => {};
  onDeleteComment = () => {};
  onLikeComment = () => {};

  render() {
    return (
      <>
        <CommentThread
          currentUser={this.props.user}
          comments={this.state.comments}
          onAddReply={this.onAddReply}
          onWritingComment={this.onWritingComment}
        />
        <AddComment
          currentUser={this.props.user}
          onAddComment={this.onAddComment}
          onWritingComment={this.onWritingComment}
        />
      </>
    );
  }
}

export default App;
