import { api } from "../../api";
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
const TextList = (props) => {
  const navigate = useNavigate();

  const [textList, setTextList] = useState([]);
  useEffect(() => {
    api()
      .get("/posts")
      .then((response) => {
        setTextList(response.data);
      });
  }, []);
  return (
    // <div className="ui relaxed divided list">
    //   {textList.map((text) => {
    //     return (
    //       <div key={text.id} className="item">
    //         <i className="large github middle aligned icon"></i>
    //         <div className="content">
    //           <Link to={`/posts/${text.id}`} className="header">
    //
    //           </Link>
    //           <div className="description"></div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
    textList.map((text) => {
      return (
        <List
          key={text.id}
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <ArticleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              onClick={() => navigate(`/posts/${text.id}`)}
              primary={text.title}
              secondary={text.created_at}
            />
          </ListItemButton>
          <hr></hr>
        </List>
      );
    })
  );
};
export default TextList;
