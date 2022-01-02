import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "./Comments";
import { api } from "../../api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const TextDetail = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

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
        setOpen(false);
        navigate("/");
      });
  };

  return (
    <div>
      <h2 className="ui header">{textDetail.title}</h2>
      <p>{textDetail.created_at}</p>
      <p>{textDetail.content}</p>

      <Button
        variant="outlined"
        onClick={() => navigate(`/posts/${params.id}/EditText`)}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This post will be deleted if you approve!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={deleteHandlerText} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Comments />
    </div>
  );
};
export default TextDetail;
