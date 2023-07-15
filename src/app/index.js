import React from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: JSON.parse(localStorage.getItem("comments")),
      commentContent: null,
      lastCommentId: null,
    };
    this.currentUser = this.props.user;
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
      user: this.currentUser,
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
      user: this.currentUser,
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
      this.searchAndUpdateComment({
        commentId: commentToEdit.id,
        propertyToUpdate: "content",
        newValue: newCommentContent,
      });
    }

    commentToEdit.hideEditState();
  };

  onDeleteComment = () => {};

  onVoteComment = ({ comment, vote }) => {
    let newScore = comment.score;

    if (vote === "upvote") {
      newScore++;
    } else {
      newScore--;
    }

    this.searchAndUpdateComment({
      commentId: comment.id,
      propertyToUpdate: "score",
      newValue: newScore,
    });

    this.saveVotedComment({ commentId: comment.id, vote });
  };

  searchAndUpdateComment = ({ commentId, propertyToUpdate, newValue }) => {
    const comments = this.state.comments;

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const isAComment = comment.id == commentId;
      if (isAComment) {
        comment[propertyToUpdate] = newValue;
        break;
      }

      for (let i = 0; i < comment.replies.length; i++) {
        const replyToEdit = comment.replies[i];
        const isAReply = replyToEdit.id == commentId;

        if (isAReply) {
          replyToEdit[propertyToUpdate] = newValue;
          break;
        }
      }
    }

    this.updateComments({ comments });
  };

  saveVotedComment = ({ commentId, vote }) => {
    const users = JSON.parse(localStorage.getItem("users"));

    const currentUser = users.find(
      (user) => user.username === this.currentUser.username
    );

    const currentUserVotedComments = currentUser.votedComments;

    for (let i = 0; i < currentUserVotedComments.length + 1; i++) {
      const votedCommentSaved = currentUserVotedComments[i];

      if (votedCommentSaved?.commentId === commentId) {
        votedCommentSaved.vote = vote;
        break;
      } else if (i === currentUserVotedComments.length) {
        currentUserVotedComments[i] = {
          commentId,
          vote,
        };
        break;
      }
    }

    localStorage.setItem("users", JSON.stringify(users));
  };

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
          currentUser={this.currentUser}
          comments={this.state.comments}
          onAddReply={this.onAddReply}
          onWritingComment={this.onWritingComment}
          onEditComment={this.onEditComment}
          onVoteComment={this.onVoteComment}
        />
        <AddComment
          currentUser={this.currentUser}
          onAddComment={this.onAddComment}
          onWritingComment={this.onWritingComment}
        />
      </>
    );
  }
}

export default App;
