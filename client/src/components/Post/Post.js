import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackDrop from "../BackDrop/BackDrop";
import cap from "./cap.jpg"
import "./Post.css";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postObject, setPostObject] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(null);

  const save = () => {
    const data = {description: description};
    axios.put(`http://localhost:3001/posts/edit/${id}`, data,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        navigate("/");
    });
  };

  const sendFile = () => {
    const data = new FormData();
    data.append("file", img);
    axios.patch(`http://localhost:3001/posts/single/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
        accessToken: localStorage.getItem("accessToken"),
      }
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    }).finally(()=> {
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <BackDrop isLoading={isLoading} />
      <div id="individual">
        <div className="title" name="title">{postObject.firstName}</div>
        <div className="body">
          <textarea className="textarea" name="description" defaultValue={postObject.description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
          <div className="imageContainer">
            {
              postObject.file
                ? <img className="logotype" src={`http://localhost:3001/images/${postObject.file}`} alt="logo" />
                : <img className="logotype" src={cap} alt="logo" />
            }
          </div>
        </div>
        <div className="footer">
          <div className="uploadContainer">
            <input type="file" name="file" onChange={(e) => setImg(e.target.files[0])} />
            <input type="submit" value="Upload file" onClick={sendFile}/>
          </div>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
