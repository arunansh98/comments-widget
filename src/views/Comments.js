import Comment from "./Comment";

export default function Comments(props) {
  const { comments, previousIndex } = props;
  return (
    <div style={{ marginLeft: "1rem" }}>
      <h1>Comments :</h1>
      {comments.map((comment, index) => {
        const commentIndex =
          previousIndex !== undefined ? previousIndex + "," + index : index;
        console.log({ commentIndex });
        return <Comment comment={comment} index={commentIndex} />;
      })}
    </div>
  );
}
