import { useContext, useState } from "react";
import { CommentsContext } from "../App";

export default function useModal(needsText = true) {
  const { dispatch } = useContext(CommentsContext);

  const [displayModal, setDisplayModal] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [text, setText] = needsText ? useState("") : [null, () => {}];

  function handleDispatch(object, setTextValue, setDisplayModalValue) {
    dispatch(object);
    setDisplayModal(setDisplayModalValue);
    setText && setText(setTextValue);
  }

  return { text, setText, setDisplayModal, displayModal, handleDispatch };
}
