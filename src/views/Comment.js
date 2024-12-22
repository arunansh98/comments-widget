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

  const [editedText, setEditedText] = useState("");

  const [displayEditedTextModal, setDisplayEditedTextModal] = useState(false);

  function handleCommentReply() {
    dispatch({
      type: "add",
      index,
      text: reply,
    });
    setDisplayModal(false);
    setReply("");
  }

  function handleCommentEdit() {
    dispatch({
      type: "edit",
      index,
      text: editedText,
    });
    setDisplayEditedTextModal(false);
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
          <button
            style={{ marginRight: "0.5rem" }}
            onClick={() => {
              setEditedText(text);
              setDisplayEditedTextModal(true);
            }}
          >
            <h3>Edit</h3>
          </button>
          <button
            style={{ marginRight: "0.5rem" }}
            onClick={() =>
              dispatch({
                type: "delete",
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
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <button
                  onClick={() => {
                    setReply("");
                    setDisplayModal(false);
                  }}
                >
                  X
                </button>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
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
                    type="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={() => handleCommentReply()}
                    disabled={!(reply && reply?.length > 0)}
                  >
                    REPLY
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {displayEditedTextModal && (
          <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <button
                  onClick={() => {
                    setEditedText(text);
                    setDisplayEditedTextModal(false);
                  }}
                >
                  X
                </button>
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
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
                    placeholder="Enter text to be edited"
                    value={editedText}
                    onChange={(event) => setEditedText(event.target.value)}
                  />
                  <button
                    type="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={() => handleCommentEdit()}
                    disabled={!(editedText && editedText?.length > 0)}
                  >
                    EDIT
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </>
    </div>
  );
}
