import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SendComment from "./SendComment";
import { api } from "../../api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
const Comments = (props) => {
  const params = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api()
      .get(`/posts/${params.id}/comments`)

      .then((response) => {
        setComments(response.data);
      });
  }, []);

  return (
    <>
      <h3>Comments</h3>
      {comments.map((comment) => {
        return (
          <List key={comment.id}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.display_name}
                secondary={comment.body}
              />
            </ListItem>
          </List>
        );
      })}
      <SendComment comments={comments} setComments={setComments} />
    </>
  );
};
export default Comments;
