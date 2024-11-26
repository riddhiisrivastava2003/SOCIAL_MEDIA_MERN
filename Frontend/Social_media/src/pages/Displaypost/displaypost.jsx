import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayPosts.css";
import Navbar from "../Nav";
const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/allpost",
          { withCredentials: true }
        );
        setPosts(response.data.allpost);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  
  const handleAddComment = async (postId, writername, targetname, commentText) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/commentbyuser",
        {
          writername,
          targetname,
          comment: commentText,
          postid: postId,
        },
        { withCredentials: true }
      );

      const newComment = response.data.allcomments;

      // Update UI with the new comment
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, newComment],
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Navbar />


      {/* Heading */}
      <h1>All Posts</h1>

      {/* Post Cards */}
      <div className="post-container">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.Postimage} alt="Post" />
            <h3>Caption: {post.caption}</h3>
            <p>
              <strong>Author:</strong> {post.author.username}
            </p>
            <p>
              <strong>Post ID:</strong> {post._id}
            </p>

            {/* Comments Section */}
            <div className="comments-section">
              <h4>Comments:</h4>
              {post.comments?.map((comment, index) => (
                <div key={index} className="comment">
                  <p>
                    <strong>{comment.author}</strong>: {comment.comment}
                  </p>
                </div>
              ))}

              {/* Add Comment Input */}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Your name..."
                  id={`writername-${post._id}`}
                />
                <input
                  type="text"
                  placeholder="Target user..."
                  id={`targetname-${post._id}`}
                />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  id={`comment-${post._id}`}
                />
                <button
                  onClick={() => {
                    const writername = document.getElementById(
                      `writername-${post._id}`
                    ).value;
                    const targetname = document.getElementById(
                      `targetname-${post._id}`
                    ).value;
                    const comment = document.getElementById(
                      `comment-${post._id}`
                    ).value;

                    if (writername && targetname && comment) {
                      handleAddComment(post._id, writername, targetname, comment);
                      document.getElementById(
                        `writername-${post._id}`
                      ).value = "";
                      document.getElementById(
                        `targetname-${post._id}`
                      ).value = "";
                      document.getElementById(`comment-${post._id}`).value = "";
                    } else {
                      alert("All fields are required!");
                    }
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-container">
          <h4>Stay Connected</h4>
          <p>Follow us on social media and stay updated with the latest posts!</p>
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <small>© 2024 Social Media. All Rights Reserved.</small>
        </div>
      </div>

    </>
  );
};

export default DisplayPosts;
