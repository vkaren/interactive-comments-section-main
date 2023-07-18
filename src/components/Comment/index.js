import React from "react";
import CommentHeader from "@components/Comment/CommentHeader";
import CommentButtons from "@components/Comment/CommentButtons";
import CommentLike from "@components/Comment/CommentLike";
import CommentText from "@components/Comment/CommentText";
import AddComment from "@components/AddComment";
import EditComment from "@components/EditComment";
import { getDateFormat } from "@utils/getDateFormat";
import styles from "./styles.module.css";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReplying: false,
      isEditing: false,
      dateFormat: null,
      timerDelayDateFormat: {},
    };

    // Info needed if someone replies to this comment
    this.replyComment = {
      replyingTo: this.props.user.username,
      replyingToCommentId: this.props.replyingToCommentId || this.props.id,
      hideReplyState: this.hideReplyState,
    };

    // Info needed to edit this comment
    this.commentToEdit = {
      id: this.props.id,
      hideEditState: this.hideEditState,
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

  onClickReplyBtn = () => {
    const isReplying = !this.state.isReplying;

    this.setState({ isReplying });
  };

  hideReplyState = () => {
    this.setState({ isReplying: false });
  };

  onClickEditBtn = () => {
    const isEditing = !this.state.isEditing;

    this.setState({ isEditing });
  };

  hideEditState = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { id, user, content, createdAt, score, replyingTo } = this.props;

    return (
      <>
        <div id={id} className={styles["comment"]}>
          <CommentHeader
            user={user}
            createdAt={this.state.dateFormat || createdAt}
          />

          <CommentButtons
            id={id}
            user={user}
            onClickReplyBtn={this.onClickReplyBtn}
            onClickEditBtn={this.onClickEditBtn}
          />

          <CommentLike id={id} score={score} />

          {this.state.isEditing ? (
            <EditComment content={content} commentToEdit={this.commentToEdit} />
          ) : (
            <CommentText replyingTo={replyingTo} content={content} />
          )}
        </div>

        {this.state.isReplying && (
          <AddComment replyComment={this.replyComment} />
        )}
      </>
    );
  }
}

export default Comment;
