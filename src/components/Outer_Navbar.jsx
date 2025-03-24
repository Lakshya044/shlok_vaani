"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Outer_Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="navbar bg-transparent fixed top-0 left-0 right-0 backdrop-blur-lg z-10 border-b-2 border-gray-700 hover:bg-opacity-90 transition duration-300 ease-in-out">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-[#fbd54e]">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 mr-2"
            />
            ShlokVaani
          </a>
        </div>

        <div className="flex gap-2 items-center">
          {session ? (
            <>
              <p>Hey {session.user?.name || "User"}!</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
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
                    <a onClick={() => signOut()}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button className=" mx-8 px-4 py-2 rounded-lg w-full text-yellow-300 bg-[#f66725] hover:bg-[#ef6e3b]" onClick={() => signIn()}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outer_Navbar;
