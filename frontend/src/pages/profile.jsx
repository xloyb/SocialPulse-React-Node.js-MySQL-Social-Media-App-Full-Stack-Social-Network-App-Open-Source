import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";


const Profile = () => {
  return (
    <div>
      <div className="container mx-auto mt-8 p-4  rounded-lg shadow-md">
        {/* Profile Header with Larger Background Image */}
        <div
          className="flex-1 relative mb-6 h-32"
          style={{
            backgroundImage: `url('https://via.placeholder.com/800x400')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0.5rem",
          }}
        >
          <div className="flex items-center justify-center h-full p-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile Picture"
              className="w-20 h-20 rounded-full border-4 border-white bg-white"
            />
          </div>
        </div>

        <div className="navbar bg-base-100">
          <div className="navbar-start space-x-4">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Item 1</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn btn-primary">Add Friend</a>
          </div>
        </div>

        {/* Profile Content */}
        <div>
          <h2 className="card-title">About Me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero.
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Profile;
