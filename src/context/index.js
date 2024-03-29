import { createContext, useState, useEffect } from "react";
import { deepCopyList } from "@utils/deepCopyList";
import { getData, setData } from "@utils/myLocalStorage";

const AppContext = createContext({});

function AppProvider({ children, user }) {
  const currentUser = user;
  const [comments, setComments] = useState(getData("comments"));

  // Id for a new comment or reply
  const [lastCommentId, setLastCommentId] = useState(null);

  // States to delete comments or replies
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => setLastCommentId(getLastCommentId()), []);

  const getLastCommentId = () => {
    return comments.flatMap((c) =>
      c.replies.length > 0 ? [c, c.replies].flat() : [c]
    ).length;
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
      updateCommentState: true,
    });

    deleteVotedCommentStorage(commentToDelete);

    setIsDeleting(false);
    setCommentToDelete(null);
  };

  const onCancelDeleteComment = () => {
    setIsDeleting(false);
  };

  const deleteVotedCommentStorage = (commentId) => {
    const users = getData("users");

    const currentUserVotedComments = users.find(
      (user) => user.username === currentUser.username
    ).votedComments;

    const votedCommentToDelete = currentUserVotedComments.findIndex(
      (comment) => comment.commentId === commentId
    );

    if (votedCommentToDelete > -1)
      currentUserVotedComments.splice(votedCommentToDelete, 1);

    setData("users", users);
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

  const searchComment = ({ commentId, callback, updateCommentState }) => {
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
    updateComments({ comments: commentsCopy, updateCommentState });
  };

  const updateComments = ({
    comments,
    lastCommentId = null,
    updateCommentState = false,
  }) => {
    if (lastCommentId) setLastCommentId(lastCommentId);
    if (updateCommentState) setComments(comments);

    setData("comments", comments);
  };

  return (
    <AppContext.Provider
      value={{
        comments,
        currentUser,
        isDeleting,
        lastCommentId,
        updateComments,
        searchAndUpdateComment,
        onClickDelete,
        onDeleteComment,
        onCancelDeleteComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
