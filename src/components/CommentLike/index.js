import React from "react";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import styles from "./styles.module.css";

class CommentLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: null,
    };

    // Info needed to vote on this comment or reply
    this.comment = {
      id: this.props.id,
      score: this.props.score,
    };
  }

  componentDidMount() {
    const currentUserVote = this.getCurrentUserVote();
    if (currentUserVote) {
      this.setState({ vote: currentUserVote });
    }
  }

  getCurrentUserVote = () => {
    return this.props.currentUser.votedComments.find(
      (comment) => comment.commentId === this.props.id
    )?.vote;
  };

  onClickVote = (e) => {
    const vote = e.currentTarget.id;

    this.props.onVoteComment({ comment: this.comment, vote });
    this.setState({ vote });
  };

  render() {
    return (
      <div className={styles["comment_like"]}>
        <button
          id="upvote"
          className={`${styles["comment_like-btn"]} ${
            this.state.vote === "upvote" && styles["active"]
          }`}
          onClick={this.onClickVote}
        >
          <PlusIcon />
        </button>

        <span className={styles["comment_likes"]}>{this.props.score}</span>

        <button
          id="downvote"
          className={`${styles["comment_like-btn"]} ${
            this.state.vote === "downvote" && styles["active"]
          }`}
          onClick={this.onClickVote}
        >
          <MinusIcon />
        </button>
      </div>
    );
  }
}

export default CommentLike;
