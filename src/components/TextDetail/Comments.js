import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SendComment from "./SendComment";
import { api } from "../../api";
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
          <div key={comment.id} className="ui relaxed list">
            <div className="item">
              <img
                className="ui avatar image"
                src="/images/avatar/small/daniel.jpg"
              />
              <div className="content">
                <a className="header">{comment.display_name}</a>
                <div className="description">{comment.body}</div>
              </div>
            </div>
          </div>
        );
      })}
      <SendComment comments={comments} setComments={setComments} />
    </>
  );
};
export default Comments;
