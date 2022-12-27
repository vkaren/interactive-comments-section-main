import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

class CommentBox extends React.Component {
  state = {
    replying: false,
    replyingTo: "",
    repliedMessage: "",
    replies: this.props.replies.slice(),
  };

  componentDidMount() {
    let replies = this.state.replies.slice();

    replies.forEach((reply) => {
      reply.key = "reply-" + this.keyReply;
      reply.keyReply = this.keyReply;
      this.keyReply++;
    });

    this.setState({ replies });
  }

  reply = (replyingTo) => {
    this.setState({
      replying: true,
      replyingTo,
      repliedMessage: `@${replyingTo}`,
    });
  };

  onInputReply = (e) => {
    let repliedMessage = e.currentTarget.value;

    if (e.key === "Enter") {
      this.sendReply();
    }

    this.setState({ repliedMessage });
  };

  keyReply = 0;

  sendReply = (reply = {}) => {
    let replies = this.state.replies.slice();
    const replyingTo = reply.replyingTo || this.state.replyingTo;
    const content =
      reply.content ||
      this.state.repliedMessage.substring(replyingTo.length + 1);
    const createdAt = reply.createdAt || Date.now();
    const score = reply.score || 0;

    replies.push({
      key: "reply-" + this.keyReply,
      keyReply: this.keyReply,
      content,
      createdAt,
      score,
      replyingTo,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    });

    this.keyReply++;
    this.setState({ replies, replying: false });
  };

  deleteReply = (reply) => {
    let replies = this.state.replies.slice();

    replies.splice(reply, 1);

    this.setState({ replies });
  };

  render() {
    return [
      <div className="comment-box" key={"comment-box-" + this.props.uniqueKey}>
        <Comment
          key={"comment-" + this.props.uniqueKey}
          uniqueKey={this.props.uniqueKey}
          className="comment"
          index={this.props.index}
          currentUser={this.props.currentUser.username}
          score={this.props.score}
          image={this.props.image}
          username={this.props.username}
          createdAt={this.props.createdAt}
          content={this.props.content}
          reply={this.reply}
          onDelete={this.props.deleteComment}
        />

        <div className="replies">
          {this.state.replies.map((reply, i) => (
            <Comment
              key={reply.key}
              uniqueKey={reply.keyReply}
              className="reply"
              index={i}
              currentUser={this.props.currentUser.username}
              replyingTo={reply.replyingTo}
              score={reply.score}
              image={reply.user.image.png}
              username={reply.user.username}
              createdAt={reply.createdAt}
              content={reply.content}
              reply={this.reply}
              onDelete={this.deleteReply}
            />
          ))}
        </div>

        {this.state.replying ? (
          <AddComment
            key="add-reply"
            className="replying"
            button={{ className: "sendreply-bttn", innerText: "Reply" }}
            image={this.props.currentUser.image.png}
            username={this.props.currentUser.username}
            value={this.state.repliedMessage}
            onInput={this.onInputReply}
            onClick={this.sendReply}
          />
        ) : null}
      </div>,
    ];
  }
}

export default CommentBox;
