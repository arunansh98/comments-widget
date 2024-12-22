import Comment from "./Comment";

export default function Comments(props) {
  const { comments, previousIndex } = props;
  const headerText = previousIndex === undefined ? "Comments" : "Replies";
  return (
    <div style={{ marginLeft: "1rem" }}>
      <h1>{headerText} :</h1>
      {comments.map((comment, index) => {
        const commentIndex =
          previousIndex !== undefined ? previousIndex + "," + index : index;
        return <Comment comment={comment} index={commentIndex} />;
      })}
    </div>
  );
}
