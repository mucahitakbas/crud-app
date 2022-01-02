import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
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
  console.log(props.texts);
  return (
    <>
      <div className="ui form">
        <div className="field">
          <h4>Post Title</h4>
          <input
            name="title"
            type="text"
            placeholder="Write a title..."
            onChange={handleOnchange}
            value={text.title}
          />
        </div>
      </div>
      <div className="ui form">
        <div className="field">
          <h4>Text</h4>
          <textarea
            name="content"
            placeholder="Write content..."
            onChange={handleOnchange}
            value={text.content}
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
      >
        Cancel
      </Button>
    </>
  );
};

export default SendText;
