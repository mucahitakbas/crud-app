import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(commentBody);
        }}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="display_name"
          type="text"
          placeholder="Name..."
          onChange={handleOnchange}
          value={commentBody.display_name}
          sx={{ mb: 2, Width: 500 }}
        />

        <TextareaAutosize
          name="body"
          onChange={handleOnchange}
          minRows={10}
          placeholder="Your comment"
          style={{ width: "100%" }}
          value={commentBody.body}
          sx={{ mb: 5 }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
    </>
  );
};
export default SendComment;
