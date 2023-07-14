import React from "react";
import CommentHeader from "@components/CommentHeader";
import CommentButtons from "@components/CommentButtons";
import CommentLike from "@components/CommentLike";
import CommentText from "@components/CommentText";
import AddComment from "@components/AddComment";
import { getDateFormat } from "@utils/getDateFormat";
import styles from "./styles.module.css";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplying: false,
      dateFormat: null,
      timerDelayDateFormat: {},
    };

    // Info needed if someone replies to this comment or reply
    this.replyComment = {
      replyingTo: this.props.user.username,
      replyingToCommentId: this.props.replyingToCommentId || this.props.id,
      hideAddCommentBox: this.hideAddCommentBox,
    };
  }

  componentDidMount() {
    // If createdAt is a value of Date.now()
    if (Number.isInteger(this.props.createdAt)) {
      this.updateDateFormat();
    }
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.timerDelayDateFormat.id !== this.state.timerDelayDateFormat.id
    ) {
      this.timer = setTimeout(
        this.updateDateFormat,
        this.state.timerDelayDateFormat.value
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateDateFormat = () => {
    const { dateFormat, timerDelay: timerDelayDateFormat } = getDateFormat(
      this.props.createdAt
    );
    this.setState({ dateFormat, timerDelayDateFormat });
  };

  hideAddCommentBox = () => {
    this.setState({ isReplying: false });
  };

  onClickReplyBtn = () => {
    const isReplying = !this.state.isReplying;

    this.setState({ isReplying });
  };

  render() {
    return (
      <>
        <div id={this.props.id} className={styles["comment"]}>
          <CommentHeader
            currentUser={this.props.currentUser}
            user={this.props.user}
            dateFormat={this.state.dateFormat}
            createdAt={this.props.createdAt}
          />

          <CommentButtons
            currentUser={this.props.currentUser}
            user={this.props.user}
            onClickReplyBtn={this.onClickReplyBtn}
          />

          <CommentLike score={this.props.score} />

          <CommentText
            replyingTo={this.props.replyingTo}
            content={this.props.content}
          />
        </div>

        {this.state.isReplying && (
          <AddComment
            currentUser={this.props.currentUser}
            replyComment={this.replyComment}
            onWritingComment={this.props.onWritingComment}
            onAddReply={this.props.onAddReply}
          />
        )}
      </>
    );
  }
}

export default Comment;
