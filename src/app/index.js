import React, { useContext } from "react";
import AddComment from "@components/AddComment";
import CommentThread from "@components/CommentThread";
import DeleteComment from "@components/DeleteComment";
import { AppContext } from "context";

const App = () => {
  const { isDeleting } = useContext(AppContext);

  return (
    <>
      <CommentThread />
      <AddComment />
      {isDeleting && <DeleteComment />}
    </>
  );
};

export default App;
