import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const TEXT_START = {
  title: "",
  content: "",
};
const SendText = (props) => {
  const params = useParams();
  const [text, setText] = useState(TEXT_START);
  const navigate = useNavigate();

  const handleOnchange = (event) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleTextSubmit = (e) => {
    if (isEmpty(text.title) || isEmpty(text.content)) {
      toast.error("name and text field cannot be left empty!", {
        theme: "colored",
      });
    } else {
      if (props.texts?.title) {
        api()
          .put(`/posts/${params.id}`, text)
          .then((response) => {
            navigate("/");
          });
      } else {
        api()
          .post(`/posts`, text)
          .then((response) => {
            navigate("/");
          });
      }
    }
  };
  useEffect(() => {
    if (props.texts?.title && props.texts?.content) setText(props.texts);
  }, [props.texts]);

  return (
    <>
      <div className="ui form">
        <div className="field">
          <h4>Post Title</h4>

          <TextField
            fullWidth
            label="Title"
            id="fullWidth"
            placeholder="Write a title..."
            name="title"
            type="text"
            onChange={handleOnchange}
            sx={{
              maxWidth: "100%",
              mb: 1,
            }}
          />
        </div>
      </div>
      <div className="ui form">
        <div className="field">
          <h4>Text</h4>

          <TextareaAutosize
            name="content"
            onChange={handleOnchange}
            minRows={10}
            placeholder="Write content..."
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <Button
        onClick={handleTextSubmit}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Add
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        endIcon={<CancelIcon />}
        color="error"
        sx={{ m: 1 }}
      >
        Cancel
      </Button>
    </>
  );
};

export default SendText;
