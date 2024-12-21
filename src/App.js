import { createContext, useReducer, useState } from "react";
import TextInput from "./components/TextInput";
import Comments from "./views/Comments";

const CommentsContext = createContext();

export default function App() {
  const [commentInput, setCommentInput] = useState("");

  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          ...state,
          comments: [{ text: action.value, comments: [] }, ...state.comments],
        };
      case "delete":
        return {
          ...state,
          comments: [
            ...state.comments.filter(
              (_comment, index) => index !== action.value
            ),
          ],
        };
      case "addReply":
        console.log({ action });
        const { text, index } = action;
        const indexArray = index.toString().split(",");
        return addCommentAtIndex(state, indexArray, text);
      case "deleteReply":
        return deleteCommentAtIndex(state, action.value.toString().split(","));
      default:
        throw new Error("Unknown action!");
    }
  };

  const addCommentAtIndex = (state, indexArray, text) => {
    const recursiveUpdate = (comments, indices) => {
      if (indices.length === 0) {
        // Base case: Append the new comment to the comments array
        return [{ text, comments: [] }, ...comments];
      }

      const [currentIndex, ...remainingIndices] = indices;

      return comments.map((comment, idx) =>
        idx === parseInt(currentIndex, 10)
          ? {
              ...comment,
              comments: recursiveUpdate(comment.comments, remainingIndices),
            }
          : comment
      );
    };

    return {
      ...state,
      comments: recursiveUpdate(state.comments, indexArray),
    };
  };

  const deleteCommentAtIndex = (state, indexArray) => {
    const recursiveDelete = (comments, indices) => {
      if (indices.length === 1) {
        // Base case: Remove the comment at the last index
        const targetIndex = parseInt(indices[0], 10);
        return comments.filter((_comment, idx) => idx !== targetIndex);
      }

      const [currentIndex, ...remainingIndices] = indices;

      return comments.map((comment, idx) =>
        idx === parseInt(currentIndex, 10)
          ? {
              ...comment,
              comments: recursiveDelete(comment.comments, remainingIndices),
            }
          : comment
      );
    };

    return {
      ...state,
      comments: recursiveDelete(state.comments, indexArray),
    };
  };

  const [state, dispatch] = useReducer(reducerFunction, {
    comments: [
      {
        text: "first comment",
        comments: [
          {
            text: "first reply",
            comments: [
              {
                text: "first reply",
                comments: [],
              },
              {
                text: "second reply",
                comments: [],
              },
            ],
          },
          {
            text: "second reply",
            comments: [],
          },
        ],
      },
      {
        text: "second comment",
        comments: [],
      },
    ],
  });

  console.log({ state });

  console.log({ commentInput });

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <CommentsContext.Provider value={{ dispatch, state }}>
      <form onSubmit={handleFormSubmit}>
        <h1>Enter comment : </h1>
        <TextInput
          type="text"
          placeholder="Enter comment"
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
        />
        <button
          type="submit"
          onClick={() =>
            dispatch({
              type: "add",
              value: commentInput,
            })
          }
          disabled={!(commentInput && commentInput?.length > 0)}
        >
          SUBMIT
        </button>
      </form>
      <div>
        <Comments comments={state.comments} />
      </div>
    </CommentsContext.Provider>
  );
}

export { CommentsContext };
