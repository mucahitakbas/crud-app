import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import { api } from "../../api";
const TextDetail = (props) => {
  const params = useParams();
  const [textDetail, setTextDetail] = useState({});

  useEffect(() => {
    api()
      .get(`/posts/${params.id}`)
      .then((response) => {
        setTextDetail(response.data);
      });
  }, []);

  return (
    <>
      <h2 className="ui header">{textDetail.title}</h2>
      <p>{textDetail.created_at}</p>
      <p>{textDetail.content}</p>
      <Link to={`/posts/${params.id}/EditText`} className="ui inverted green button">Edit</Link>
      <button className="ui inverted red button">Delete</button>
      <Comments />
    </>
  );
};
export default TextDetail;
