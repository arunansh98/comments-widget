import { useContext, useState } from "react";
import { CommentsContext } from "../App";
import Comments from "./Comments";

import Modal from "../components/Modal";
import TextInput from "../components/TextInput";

export default function Comment(props) {
  const { comment, index } = props;

  const { text, comments } = comment;

  const { dispatch } = useContext(CommentsContext);

  const [displayModal, setDisplayModal] = useState(false);

  const [reply, setReply] = useState("");

  function handleCommentReply() {
    dispatch({
      type: "addReply",
      index,
      text: reply,
    });
    setDisplayModal(false);
    setReply("");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        border: "1px solid black",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          margin: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 key={index}>{text}</h2>
        <div>
          <button style={{ marginRight: "0.5rem" }}>
            <h3>Edit</h3>
          </button>
          <button
            style={{ marginRight: "0.5rem" }}
            onClick={() =>
              dispatch({
                type: "deleteReply",
                value: index,
              })
            }
          >
            <h3>Delete</h3>
          </button>
          <button onClick={() => setDisplayModal(true)}>
            <h3>Reply</h3>
          </button>
        </div>
      </div>
      {comments && comments?.length > 0 && (
        <Comments comments={comments} previousIndex={index} />
      )}
      <>
        {displayModal && (
          <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                style={{
                  width: "5rem",
                  marginLeft: "70rem",
                }}
                onClick={() => {
                  setReply("");
                  setDisplayModal(false);
                }}
              >
                X
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10rem",
                  flexDirection: "column",
                }}
              >
                <TextInput
                  placeholder="Enter reply"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                />
                <button
                  style={{ marginTop: "2rem" }}
                  onClick={() => handleCommentReply()}
                >
                  REPLY
                </button>
              </div>
            </div>
          </Modal>
        )}
      </>
    </div>
  );
}
