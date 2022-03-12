import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BackDrop from "../BackDrop/BackDrop";
import CreatePostBtn from "../CreatePostBtn/CreatePostBtn";
import axios from "axios";
import "./BlogPage.css";

const BlogPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listOfPost, setListOfPost] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPost(response.data);
    }).finally(() => {
      setIsLoading(false);
    });
  },[]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
      setListOfPost(listOfPost.map((post) => {
        if (response.data.id === post.id) {
          return response.data;
        }
        return post;
      }));
    });
  }

  return (
    <div>
      <BackDrop isLoading={isLoading} />
      <CreatePostBtn/>
      <div className="postsContainer">
        {listOfPost.map((value, key) => {
          return (
            <div className="post">
              <div className="title">
                <div>{value.firstName}</div>
                <IconButton aria-label="delete" size="large">
                  <DeleteIcon onClick={() => onDelete(value.id)} color="error" />
                </IconButton>
              </div>
              <div className="contentContainer">
                <div onClick={() => {navigate(`/post/${value.id}`)}} >{value.description}</div>
                <div className="imageContainer">
                  {
                    <img className="image" src={`http://localhost:3001/images/${value.file}`} />
                  }
                </div>
              </div>
              <div className="footer">{value.updatedAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
