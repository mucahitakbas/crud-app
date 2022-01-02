import React, { useEffect ,useState} from "react";
import TextForm from "./TextForm";
import { useParams } from "react-router-dom";
import { api } from "../../api";
function EditText(props) {
  const params = useParams();
  const [texts, setTexts] = useState({});

  useEffect(() => {
    api()
      .get(`/posts/${params.id}`)
      .then((response) => {
       
        setTexts({ title: response.data.title, content: response.data.content });
      });
  }, []);

  return <TextForm texts={texts} />;
}
export default EditText;
