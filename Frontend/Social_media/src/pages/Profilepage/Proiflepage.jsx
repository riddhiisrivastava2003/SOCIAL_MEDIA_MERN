import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { MessageSquare, Heart, Bookmark } from 'lucide-react';
import Navbar from '../Nav';
import './UserProfile.css'; // Link to the new CSS file

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie('accessToken');
        if (!token) throw new Error('No access token found');

        const decoded = jwtDecode(token);
        const userId = decoded._id;

        const response = await fetch(`http://localhost:5000/api/v1/users/detailuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="error-message">Error loading user data.</div>;
  }

  const { user, posts } = userData;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {user.map((userInfo) => (
          <div key={userInfo._id} className="profile-header">
            <img
              src={userInfo.Profilephoto || '/placeholder.svg'}
              alt={userInfo.username}
              className="profile-photo"
            />
            <div className="profile-info">
              <p>Username :{userInfo.username}</p>
              <p>Email: {userInfo.Email}</p>
              <button className="follow-btn">Follow</button>
            </div>
          </div>
        ))}

        <h2 className="posts-title">User Posts</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
                 <div className="caption">
               caption :  {post.caption || 'No caption available'}
             </div>
              <img
                src={post.Postimage || '/placeholder.svg'}
                alt={`Post ${post._id}`}
                className="post-image"
              />
              <div className="post-overlay">
                {/* <p>{post.caption || 'No caption available'}</p> */}
                <div className="post-icons">
                  <span>
                    <Heart /> {post.likes || 0}
                  </span>
                  <span>
                    <MessageSquare /> {post.comments || 0}
                  </span>
                  <span>
                    <Bookmark /> {post.saved || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
