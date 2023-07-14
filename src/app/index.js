import React from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.user,
      comments: JSON.parse(localStorage.getItem("comments")),
      commentContent: null,
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

  debounce = (callback, wait) => {
    /**
     * Debounce function used for add or update a comment content
     * only when the user stop typing
     */
    let timer;

    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => callback(e), wait);
    };
  };

  onWritingComment = ({ replyComment = null, commentToEdit = null }) => {
    /**
     * Use a debounce function to update commentContent
     * and call onAddReply, onAddComment or onEditComment if the Enter key is pressed
     *
     * @params {object} replyComment, required when it's a reply comment
     */

    const updateCommentContent = (e) => {
      const commentContent = e.target.value;
      const isEnterPressed = e.key === "Enter";

      this.setState({ commentContent }, () => {
        if (isEnterPressed) {
          if (replyComment) {
            this.onAddReply(replyComment);
          } else if (commentToEdit) {
            this.onEditComment(commentToEdit);
          } else {
            this.onAddComment();
          }
        }
      });
    };

    return this.debounce(updateCommentContent, 500);
  };

  onAddComment = () => {
    const commentToAdd = {
      id: this.state.lastCommentId + 1,
      content: this.state.commentContent,
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
      content: this.state.commentContent,
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

  onEditComment = (commentToEdit) => {
    const newCommentContent = this.state.commentContent;

    if (newCommentContent) {
      const comments = this.state.comments;

      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const isAComment = comment.id == commentToEdit.id;

        if (isAComment) {
          comment.content = newCommentContent;
          break;
        }

        for (let i = 0; i < comment.replies.length; i++) {
          const replyToEdit = comment.replies[i];
          const isAReply = replyToEdit.id == commentToEdit.id;

          if (isAReply) {
            replyToEdit.content = newCommentContent;
            break;
          }
        }
      }
      this.updateComments({ comments });
    }

    commentToEdit.hideEditState();
  };

  onDeleteComment = () => {};
  onLikeComment = () => {};

  updateComments({ comments, lastCommentId }) {
    localStorage.setItem("comments", JSON.stringify(comments));

    if (lastCommentId) {
      this.setState({ comments, lastCommentId, commentContent: null });
    } else {
      this.setState({ comments, commentContent: null });
    }
  }
  render() {
    return (
      <>
        <CommentThread
          currentUser={this.props.user}
          comments={this.state.comments}
          onAddReply={this.onAddReply}
          onWritingComment={this.onWritingComment}
          onEditComment={this.onEditComment}
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
