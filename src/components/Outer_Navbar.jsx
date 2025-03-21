import React from "react";

const Outer_Navbar = () => {
  return (
    <div>
      <div className="navbar bg-transparent  fixed top-0 left-0 right-0 backdrop-blur-lg z-10 border-b-2 border-gray-700 hover:bg-opacity-90 transition duration-300 ease-in-out">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl  text-[#fbd54e]">
            <img 
              src="/logo.png" // dummy logo image
              alt="Logo"
              className="w-12 h-12 mr-2"
            />
            ShlokVaani
          </a>
        </div>
        <div>
          
        </div>
        <div className="flex gap-2 items-center">
          <p>Hey Sachin!!</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Friends</a>
              </li>
              <li>
                <a>Bookmarks</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outer_Navbar;
