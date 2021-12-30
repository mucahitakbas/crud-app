import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const YaziDetayi = (props) => {
  const params = useParams();
  const [yaziDetayi, setYaziDetayi] = useState({});
  useEffect(() => {
    axios
      .get(`https://react-yazi-yorum.herokuapp.com/posts/${params.id}`)
      .then((response) => {
        console.log(response);
        setYaziDetayi(response.data);
      });
  }, []);

  return (
    <>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <p>{yaziDetayi.content}</p>
    </>
  );
};
export default YaziDetayi;
