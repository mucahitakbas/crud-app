import axios from "axios";
import react, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
const YaziListesi = (props) => {
  const [yazilistesi, setYazilistesi] = useState([]);
  useEffect(() => {
    axios
      .get("https://react-yazi-yorum.herokuapp.com/posts")
      .then((response) => {
        setYazilistesi(response.data);
      });
  }, []);
  return (
    <div className="ui relaxed divided list">
      {yazilistesi.map((yazi) => {
        return (
          <div key={yazi.id} className="item">
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${yazi.id}`} className="header">{yazi.title}</Link>
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default YaziListesi;
