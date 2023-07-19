import { createContext, useState, useEffect, createRef } from "react";
import { debounce } from "@utils/debounce";
import { deepCopyList } from "@utils/deepCopyList";
import { getData, setData } from "@utils/myLocalStorage";

const AppContext = createContext({});

function AppProvider({ children, user }) {
  const currentUser = user;

  const [comments, setComments] = useState(getData("comments"));

  // Id for a new comment or reply
  const [lastCommentId, setLastCommentId] = useState(null);

  // States to create or update comments and replies
  const [commentContent, setCommentContent] = useState("");
  const [newCommentData, setNewCommentData] = useState({});
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const textarea = createRef();

  // States to delete comments or replies
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => setLastCommentId(getLastCommentId()), []);

  useEffect(() => {
    if (isEnterPressed) {
      if (newCommentData?.type === "reply") {
        onAddReply(newCommentData);
      } else if (newCommentData?.type === "edit") {
        onEditComment(newCommentData);
      } else {
        onAddComment();
      }
      setIsEnterPressed(false);
    }
  }, [isEnterPressed]);

  // Create, add and edit comments
  const onWritingComment = (newCommentData) => {
    /**
     * Use a debounce function to update commentContent
     * and calls onAddComment, onAddReply or onEditComment if the Enter key is pressed
     *
     * @param {object} newCommentData, info needed to edit or add comments
     */

    const updateCommentContent = (e) => {
      const commentContent = e.target.value;
      const isEnterPressed = e.key === "Enter";

      setCommentContent(commentContent);
      setNewCommentData(newCommentData);
      setIsEnterPressed(isEnterPressed);
    };

    return debounce(updateCommentContent, 500);
  };

  const onAddComment = () => {
    const commentToAdd = {
      id: lastCommentId + 1,
      content: commentContent,
      createdAt: Date.now(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    const newComments = [...comments, commentToAdd];

    updateComments({ comments: newComments, lastCommentId: commentToAdd.id });
    clearTextarea();
  };

  const onAddReply = ({ replyComment }) => {
    const replyToAdd = {
      id: lastCommentId + 1,
      content: commentContent,
      createdAt: Date.now(),
      score: 0,
      user: currentUser,
      replyingTo: replyComment.replyingTo,
    };

    const commentsCopy = deepCopyList(comments);

    for (let i = 0; i < commentsCopy.length; i++) {
      const comment = commentsCopy[i];

      if (comment.id == replyComment.replyingToCommentId) {
        comment.replies.push(replyToAdd);
        break;
      }
    }

    updateComments({ comments: commentsCopy, lastCommentId: replyToAdd.id });
    replyComment.hideReplyState();
  };

  const onEditComment = ({ commentToEdit }) => {
    if (commentContent) {
      searchAndUpdateComment({
        commentId: commentToEdit.id,
        propertyToUpdate: "content",
        newValue: commentContent,
      });
    }

    commentToEdit.hideEditState();
  };

  // Vote comments
  const onVoteComment = ({ comment, vote }) => {
    let newScore = comment.score;

    if (vote === "upvote") {
      newScore++;
    } else {
      newScore--;
    }

    searchAndUpdateComment({
      commentId: comment.id,
      propertyToUpdate: "score",
      newValue: newScore,
    });

    saveVotedComment({ commentId: comment.id, vote });
  };

  const saveVotedComment = ({ commentId, vote }) => {
    const users = getData("users");

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

  // Delete comments
  const onClickDelete = (commentId) => {
    setIsDeleting(true);
    setCommentToDelete(commentId);
  };

  const onDeleteComment = () => {
    const deleteComment = ({ comments, index }) => {
      comments.splice(index, 1);
    };

    searchComment({
      commentId: commentToDelete,
      callback: deleteComment,
    });

    setIsDeleting(false);
    setCommentToDelete(null);
  };

  const onCancelDeleteComment = () => {
    setIsDeleting(false);
  };

  const getLastCommentId = () => {
    return comments.flatMap((c) =>
      c.replies.length > 0 ? [c, c.replies].flat() : [c]
    ).length;
  };
  const updateComments = ({ comments, lastCommentId = null }) => {
    if (lastCommentId) {
      setLastCommentId(lastCommentId);
    }
    setComments(comments);
    setCommentContent(null);
    setData("comments", comments);
  };
  const searchComment = ({ commentId, callback }) => {
    /**
     * A function to search and manipulate a comment or reply
     * and then update the list of comments
     *
     * @param {number} commentId, required to find the comment or reply
     * @param {function} callback, the function that will manipulate the comment or reply
     */

    const commentsCopy = deepCopyList(comments);

    for (let i = 0; i < commentsCopy.length; i++) {
      const comment = commentsCopy[i];
      const isAComment = comment.id == commentId;

      if (isAComment) {
        callback({ comment, comments: commentsCopy, index: i });
        break;
      }

      for (let j = 0; j < comment.replies.length; j++) {
        const reply = comment.replies[j];
        const isAReply = reply.id == commentId;

        if (isAReply) {
          callback({ comment: reply, comments: comment.replies, index: j });
          break;
        }
      }
    }
    updateComments({ comments: commentsCopy });
  };
  const searchAndUpdateComment = ({
    commentId,
    propertyToUpdate,
    newValue,
  }) => {
    const updateComment = ({ comment }) =>
      (comment[propertyToUpdate] = newValue);

    searchComment({
      commentId,
      callback: updateComment,
    });
  };
  const clearTextarea = () => {
    textarea.current.value = "";
  };
  const preventDefaultBehaviourEnter = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <AppContext.Provider
      value={{
        comments,
        currentUser,
        isDeleting,
        textarea,
        onWritingComment,
        onAddComment,
        onAddReply,
        onEditComment,
        onClickDelete,
        onDeleteComment,
        onCancelDeleteComment,
        onVoteComment,
        preventDefaultBehaviourEnter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
