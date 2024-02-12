import { useContext } from "react";
import dynamic from "next/dynamic";
import { AppContext } from "context";
import CommentThreadSkeleton from "@components/Skeletons/CommentThreadSkeleton";
import AddCommentSkeleton from "@components/Skeletons/AddCommentSkeleton";

const CommentThread = dynamic(() => import("@components/CommentThread"), {
  loading: () => <CommentThreadSkeleton />,
});

const AddComment = dynamic(() => import("@components/AddComment"), {
  loading: () => <AddCommentSkeleton />,
});

const DeleteComment = dynamic(() => import("@components/DeleteComment"));

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
