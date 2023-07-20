import React from "react";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import { AppContext } from "context";
import styles from "./styles.module.css";

class CommentLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: null,
    };
  }

  componentDidMount() {
    const currentUserVote = this.getCurrentUserVote();
    if (currentUserVote) {
      this.setState({ vote: currentUserVote });
    }
  }

  getCurrentUserVote = () => {
    const { currentUser } = this.context;

    return currentUser.votedComments.find(
      (comment) => comment.commentId === this.props.id
    )?.vote;
  };

  onClickVote = (e) => {
    const { onVoteComment } = this.context;
    const vote = e.currentTarget.getAttribute("data-vote-type");

    if (vote !== this.state.vote) {
      const comment = {
        id: this.props.id,
        score: this.props.score,
      };
      onVoteComment({ comment, vote });
      this.setState({ vote });
    }
  };

  render() {
    return (
      <div className={styles["comment_like"]}>
        <button
          className={`${styles["comment_like-btn"]} ${
            this.state.vote === "upvote" && styles["active"]
          }`}
          onClick={this.onClickVote}
          data-vote-type="upvote"
          aria-label="Upvote comment"
        >
          <PlusIcon />
        </button>

        <span className={styles["comment_likes"]}>{this.props.score}</span>

        <button
          className={`${styles["comment_like-btn"]} ${
            this.state.vote === "downvote" && styles["active"]
          }`}
          onClick={this.onClickVote}
          data-vote-type="downvote"
          aria-label="Downvote comment"
        >
          <MinusIcon />
        </button>
      </div>
    );
  }
}

CommentLike.contextType = AppContext;

export default CommentLike;
