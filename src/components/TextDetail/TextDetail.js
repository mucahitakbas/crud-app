import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Comments from "./Comments";
import { api } from "../../api";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}
const TextDetail = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });

  const { open, dimmer } = state;

  const params = useParams();
  const [textDetail, setTextDetail] = useState({});

  useEffect(() => {
    api()
      .get(`/posts/${params.id}`)
      .then((response) => {
        setTextDetail(response.data);
      });
  }, []);
  const deleteHandlerText = () => {
    api()
      .delete(`/posts/${params.id}`)
      .then(() => {
        dispatch({ type: "CLOSE_MODAL" });
        navigate("/");
      });
  };
  const test = () => {
    dispatch({ type: "OPEN_MODAL" });
  };
  return (
    <div>
      <h2 className="ui header">{textDetail.title}</h2>
      <p>{textDetail.created_at}</p>
      <p>{textDetail.content}</p>
      <Link
        to={`/posts/${params.id}/EditText`}
        className="ui inverted green button"
      >
        Edit
      </Link>
      <button className="ui inverted red button" onClick={test}>
        Delete
      </button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Delete post?</Modal.Header>
        <Modal.Content>This post will be deleted if you approve!</Modal.Content>
        <Modal.Actions>
          <button
            className="ui red button"
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            Disagree
          </button>

          <button className="ui green button" onClick={deleteHandlerText}>
            Agree
          </button>
        </Modal.Actions>
      </Modal>

      <Comments />
    </div>
  );
};
export default TextDetail;
