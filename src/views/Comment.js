import Comments from "./Comments";
import Modal from "../components/Modal";
import TextInput from "../components/TextInput";
import useModal from "../hooks/useModal";

export default function Comment(props) {
  const { comment, index } = props;

  const { text, comments } = comment;

  const useReplyModal = useModal();

  const useEditModal = useModal();

  const useDeleteModal = useModal(false);

  function handleCommentReply() {
    const { handleDispatch, text } = useReplyModal;
    const dispatchObject = {
      type: "add",
      index,
      text,
    };
    handleDispatch(dispatchObject, "", false);
  }

  function handleCommentEdit() {
    const { handleDispatch, text } = useEditModal;
    const dispatchObject = {
      type: "edit",
      index,
      text,
    };
    handleDispatch(dispatchObject, text, false);
  }

  function handleCommentDelete() {
    const { handleDispatch } = useDeleteModal;
    const dispatchObject = {
      type: "delete",
      value: index,
    };
    handleDispatch(dispatchObject, "", false);
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
              useEditModal.setText(text);
              useEditModal.setDisplayModal(true);
            }}
          >
            <h3>Edit</h3>
          </button>
          <button
            style={{ marginRight: "0.5rem" }}
            onClick={() => useDeleteModal.setDisplayModal(true)}
          >
            <h3>Delete</h3>
          </button>
          <button onClick={() => useReplyModal.setDisplayModal(true)}>
            <h3>Reply</h3>
          </button>
        </div>
      </div>
      {comments && comments?.length > 0 && (
        <Comments comments={comments} previousIndex={index} />
      )}
      <>
        {useReplyModal.displayModal && (
          <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <button
                  onClick={() => {
                    useReplyModal.setText("");
                    useReplyModal.setDisplayModal(false);
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
                    value={useReplyModal.text}
                    onChange={(event) =>
                      useReplyModal.setText(event.target.value)
                    }
                  />
                  <button
                    type="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={() => handleCommentReply()}
                    disabled={
                      !(useReplyModal.text && useReplyModal.text?.length > 0)
                    }
                  >
                    REPLY
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {useEditModal?.displayModal && (
          <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <button
                  onClick={() => {
                    useEditModal.setText(text);
                    useEditModal.setDisplayModal(false);
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
                    value={useEditModal.text}
                    onChange={(event) =>
                      useEditModal.setText(event.target.value)
                    }
                  />
                  <button
                    type="submit"
                    style={{ marginTop: "2rem" }}
                    onClick={() => handleCommentEdit()}
                    disabled={
                      !(useEditModal.text && useEditModal.text?.length > 0)
                    }
                  >
                    EDIT
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
        {useDeleteModal?.displayModal && (
          <Modal>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "end",
                }}
              >
                <button
                  onClick={() => {
                    useDeleteModal?.setDisplayModal(false);
                  }}
                >
                  X
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10rem",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Are you sure you want to delete ?
                </div>
                <div>
                  (Warning: All the nested replies will also be deleted !)
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{ marginTop: "2rem", marginRight: "1rem" }}
                    onClick={() => handleCommentDelete()}
                  >
                    YES
                  </button>
                  <button
                    style={{ marginTop: "2rem" }}
                    onClick={() => useDeleteModal.setDisplayModal(false)}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    </div>
  );
}
