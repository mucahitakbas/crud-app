import { api } from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TextList = (props) => {
  const [textList, setTextList] = useState([]);
  useEffect(() => {
    api()
      .get("/posts")
      .then((response) => {
        setTextList(response.data);
      });
  }, []);
  return (
    <div className="ui relaxed divided list">
      {textList.map((text) => {
        return (
          <div key={text.id} className="item">
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${text.id}`} className="header">
                {text.title}
              </Link>
              <div className="description">{text.created_at}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TextList;
