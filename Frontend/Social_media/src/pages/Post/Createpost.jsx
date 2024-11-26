import React, { useState } from "react";
import Cookies from "js-cookie";
import "./CreatePost.css";
import Navbar from "../Nav.jsx";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [category, setCategory] = useState("personal");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!caption || !postImage) {
      alert("Caption and image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("Postimage", postImage);
    formData.append("Category", category);

    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/users/Postuser", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        setCaption("");
        setPostImage(null);
        setCategory("personal");
      } else {
        alert(data.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-post-container">
        <h2 className="title">Create a Post</h2>
        <form onSubmit={handlePostSubmit} className="post-form">
          <div className="form-group">
            <label>Caption:</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter your caption"
              required
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPostImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Create Post
          </button>
        </form>

        {/* <div className="comments-section">
          <h3 className="section-title">Comments</h3> */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            {/* <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            /> */}
            {/* <button type="submit" className="submit-btn">
              Post Comment
            </button> */}
          </form>
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      {/* </div> */}
    </>
  );
};

export default CreatePost;
