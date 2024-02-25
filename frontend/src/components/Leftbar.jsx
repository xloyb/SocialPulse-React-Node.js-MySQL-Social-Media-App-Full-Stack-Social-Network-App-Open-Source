import Friends from "../assets/icons/1.png";
import Groups from "../assets/icons/2.png";
import Market from "../assets/icons/3.png";
import Watch from "../assets/icons/4.png";
import Memories from "../assets/icons/5.png";
import Events from "../assets/icons/6.png";
import Gaming from "../assets/icons/7.png";
import Gallery from "../assets/icons/8.png";
import Videos from "../assets/icons/9.png";
import Messages from "../assets/icons/10.png";
import Tutorials from "../assets/icons/11.png";
import Courses from "../assets/icons/12.png";
import Fund from "../assets/icons/13.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Leftbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div id="responsive" className="sticky top-0 z-30">
      <div  className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div  className="drawer-side" >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            
            
            <Link
                  to={`/profile/${currentUser.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >

            
            <div className="w-10 mb-3 avatar">
              <img
                alt=""
                className="rounded-full"
                src={currentUser.profilePic ? `http://localhost:5173/uploads/posts/${currentUser.profilePic}` : "http://localhost:5173/default/default_profile.png"}
                />
              <li>
                <span>{currentUser.username}</span>
              </li>
            </div>
                </Link>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Friends} />
              <li>
                <span>Friends</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Groups} />
              <li>
                <span>Groups</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Market} />
              <li>
                <span>Marketplace</span>
              </li>
            </div>

            <div className="divider"></div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Watch} />
              <li>
                <span>Watch</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Memories} />
              <li>
                <span>Memories</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Events} />
              <li>
                <span>Evenets</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Gaming} />
              <li>
                <span>Gaming</span>
              </li>
            </div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Gallery} />
              <li>
                <span>Gallery</span>
              </li>
            </div>

            <div className="divider"></div>

            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Videos} />
              <li>
                <span>Videos</span>
              </li>
            </div>
            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Messages} />
              <li>
                <span>Messages</span>
              </li>
            </div>
            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Fund} />
              <li>
                <span>Fundraiser</span>
              </li>
            </div>
            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Tutorials} />
              <li>
                <span>Tutorials</span>
              </li>
            </div>
            <div className="w-10 mb-3 avatar">
              <img alt="" className="rounded-full" src={Courses} />
              <li>
                <span>Courses</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
