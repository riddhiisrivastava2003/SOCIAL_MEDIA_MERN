import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/Register/register.jsx";
import Login from "./pages/login/Login.jsx";
import CreatePost from "./pages/Post/Createpost.jsx";
import Post from "./components/post/Post.jsx";
import Feed from "./components/feed/Feed.jsx";
import DisplayPosts from "./pages/Displaypost/displaypost.jsx";
import UserProfile from "./pages/Profilepage/Proiflepage.jsx";
function App() {
  return (

    <Router>
      <Routes>
      <Route path="/" element={<Feed />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Post" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/displaypost" element={<DisplayPosts />}/>
        <Route path="/profilepage" element={<UserProfile />}/>
      </Routes>
    </Router>
  );
}

export default App;
