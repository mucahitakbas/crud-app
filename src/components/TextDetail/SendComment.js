import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
const COMMENT_START = { display_name: "", body: "" };
const SendComment = ({ comments, setComments }) => {
  const params = useParams();
  const [commentBody, setCommentBody] = useState(COMMENT_START);

  const handleCommentSubmit = (commentBody) => {
    api()
      .post(`/posts/${params.id}/comments`, commentBody)
      .then((response) => {
        setComments([...comments, response.data]);
        setCommentBody(COMMENT_START);
      });
  };
  const handleOnchange = (event) => {
    setCommentBody({ ...commentBody, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h3>Send Comment</h3>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(commentBody);
        }}
      >
        <div className="ui small icon input">
          <input
            name="display_name"
            type="text"
            placeholder="Name..."
            onChange={handleOnchange}
            value={commentBody.display_name}
          />
        </div>
        <textarea
          name="body"
          placeholder="Your comment"
          rows="3"
          onChange={handleOnchange}
          value={commentBody.body}
        ></textarea>
        <button className="ui inverted green button" type="submit">
          Send
        </button>
      </form>
    </>
  );
};
export default SendComment;
