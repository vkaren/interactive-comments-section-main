import { Component } from "react";
import { AppContext } from "context";
import { getData, setData } from "@utils/myLocalStorage";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import styles from "./styles.module.css";

class CommentLike extends Component {
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
    const vote = e.currentTarget.getAttribute("data-vote-type");

    if (vote !== this.state.vote) {
      this.onVoteComment(vote);
      this.setState({ vote });
    }
  };

  onVoteComment = (vote) => {
    const { searchAndUpdateComment } = this.context;
    let newScore = this.props.score;

    if (vote === "upvote") {
      newScore++;
    } else {
      newScore--;
    }

    searchAndUpdateComment({
      commentId: this.props.id,
      propertyToUpdate: "score",
      newValue: newScore,
    });

    this.saveVotedCommentStorage(vote);
  };

  saveVotedCommentStorage = (vote) => {
    const { currentUser } = this.context;
    const users = getData("users");
    const commentId = this.props.id;

    const currentUserVotedComments = users.find(
      (user) => user.username === currentUser.username
    ).votedComments;

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

    setData("users", users);
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
