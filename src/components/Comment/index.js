import React from "react";
import Image from "next/image";
import AddComment from "@components/AddComment";
import { getDateFormat } from "@utils/getDateFormat";
import PlusIcon from "@icons/icon-plus.svg";
import MinusIcon from "@icons/icon-minus.svg";
import ReplyIcon from "@icons/icon-reply.svg";
import DeleteIcon from "@icons/icon-delete.svg";
import EditIcon from "@icons/icon-edit.svg";
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
          <header className={styles["comment_header"]}>
            <div className={styles["comment_profile-photo"]}>
              <Image src={this.props.user.image.png} width={25} height={25} />
            </div>

            <span className={styles["comment_username"]}>
              {this.props.user.username}
            </span>

            {this.props.currentUser.username === this.props.user.username && (
              <span className={styles["comment_current-user"]}>you</span>
            )}

            <span className={styles["comment_time"]}>
              {this.state.dateFormat || this.props.createdAt}
            </span>
          </header>

          {this.props.currentUser.username === this.props.user.username ? (
            <>
              <button className={styles["comment_delete-btn"]}>
                <DeleteIcon />
                <span>Delete</span>
              </button>
              <button className={styles["comment_edit-btn"]}>
                <EditIcon />
                <span>Edit</span>
              </button>
            </>
          ) : (
            <button
              className={styles["comment_reply-btn"]}
              onClick={this.onClickReplyBtn}
            >
              <ReplyIcon />
              <span>Reply</span>
            </button>
          )}

          <div className={styles["comment_like"]}>
            <button className={styles["comment_like-up"]}>
              <PlusIcon />
            </button>

            <span className={styles["comment_likes"]}>{this.props.score}</span>

            <button className={styles["comment_like-down"]}>
              <MinusIcon />
            </button>
          </div>

          <div className={styles["comment_text"]}>
            <p>
              <span className={styles["comment_text_replyingTo"]}>
                {this.props.replyingTo && `@${this.props.replyingTo} `}
              </span>
              {this.props.content}
            </p>
          </div>
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
