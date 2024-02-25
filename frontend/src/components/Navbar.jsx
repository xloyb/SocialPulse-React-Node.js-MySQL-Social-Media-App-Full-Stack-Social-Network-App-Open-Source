import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { makeRequest } from "../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  //   const queryClient = useQueryClient();
  //   // Logout mutation
  //   const logoutMutaion = useMutation({

  //     mutationFn: () => makeRequest.logout(),

  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries({ queryKey: ["auth"] });
  //     },

  //   });

  // const handleLogout =()=>{
  //   // console.log("button working")
  //   logoutMutaion.mutate();
  // }

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await makeRequest.post("/auth/logout");
        localStorage.removeItem("user"); // just for testing
        return response.data;
      } catch (error) {
        throw new Error(error.response.data.message || "Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      navigate("/login");
    },
  });

  const handleLogout = () => {
    console.log("Logging out...");
    logoutMutation.mutate();
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 ">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-xl"
            style={{ textDecoration: "none" }}
          >
            MyDevify
          </Link>
          <Link
            to="/">

          <HomeIcon />
            </Link>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={handleToggle}
              type="checkbox"
              className="theme-controller"
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          <GridViewIcon />
          <div className="navbar-center form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>

        <div className="flex-none gap-2">
          <PermIdentityIcon />
          <NotificationsNoneIcon />
          <MailOutlineIcon />
          <span>
            <span>{currentUser.username || "Guest"}</span>
          </span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    currentUser.profilePic
                      ? `http://localhost:5173/uploads/posts/${currentUser.profilePic}`
                      : "http://localhost:5173/default/default_profile.png"
                  }
                  alt="Profile Picture"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
              <NavLink
                  to={`/profile/${currentUser.id}`}
                  
                >
                <a className="justify-between">
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
                  </NavLink>
              </li>
              <li>
              <NavLink
                  to={`/profile/${currentUser.id}`}
                  
                >
                <a className="justify-between">
                Settings
                  {/* <span className="badge">New</span> */}
                </a>
                  </NavLink>
                
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
