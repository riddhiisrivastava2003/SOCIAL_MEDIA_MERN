import "./rightbar.css"
import {Users} from "../../dummyData";
import Online from "../../components/online/Online";
// import Home from "./pages/home/Home";

export default function Rightbar(profile){
    const HomeRightbar = () => {
        return(
            <>
            <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                    <b>Virat Kohli</b> and <b> 3 other friends</b> have birthday today.
                </span>
            </div>
            <img className="rightbarAd" src="assets/ad.png" alt=""/>
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
                {Users.map((u) => (
                    <Online key={u.id} user={u} />
                ))}
            </ul>
            </>
        )
    }
    const ProfileRightbar = () => {
        return (
            <>
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoKey">Delhi</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoKey">India</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoKey">Single</span>
                </div>
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src="assets/person/img4.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Mahendra Singh Dhoni</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/img7.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Tom Cruise</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/img6.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Salmaan Khan</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/img3.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Rohit Sharma</span>
                </div>
               <div className="rightbarFollowing">
                    <img src="assets/person/img2.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Christiano Ronaldo</span>
                </div>
                <div className="rightbarFollowing">
                    <img src="assets/person/img9.jpg" alt="" className="rightbarFollowingImg"/>
                    <span className="rightbarFollowingName">Narendra Modi</span>
                </div>
            </div>
            </>
        )
    }
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightbar/>
            </div>
        </div>
    );
}