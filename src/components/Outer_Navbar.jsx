"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Outer_Navbar = () => {
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState(session);
  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const scrollToAuth = () => {
    const authSection = document.getElementById("auth");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth" });
    }
  };
 

  const GoToHome = () =>{
      if(session){
        window.location.href = "/homepage" ;
      }
  };

  return (
    <div>
      <div className="navbar bg-transparent fixed top-0 left-0 right-0 backdrop-blur-lg z-10 border-b-2 border-gray-700 hover:bg-opacity-90 transition duration-300 ease-in-out">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-[#fbd54e]">
          <button onClick={GoToHome} className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-2" />
            ShlokVaani
          </button>
          </a>
        </div>

        <div className="flex gap-2 items-center">
          {userSession ? (
            <>
              <p>Hey {session.user?.name || "User"}!</p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="w-10 rounded-full border-2 border-yellow-400 shadow-md hover:shadow-yellow-500/50">
                    <img
                      alt="User Avatar"
                      src={
                        session.user?.image ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3e] text-gray-200 rounded-lg z-10 mt-3 w-52 p-2 shadow-2xl ring-1 ring-[#fbd54e]/70"
                >
                  <li>
                    <a className="justify-between hover:bg-[#fbd54e]/20 hover:text-[#fbd54e] transition-colors duration-200 p-2 rounded-lg">
                      Profile
                      <span className="badge bg-[#fbd54e] text-black">New</span>
                    </a>
                  </li>                  
                  <li>
                    <a
                       onClick={() => signOut({ callbackUrl: "/" })}
                      className="hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200 p-2 rounded-lg"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              className=" mx-8 px-4 py-2 rounded-lg w-full text-yellow-300 bg-[#f66725] hover:bg-[#ef6e3b]"
              onClick={() => scrollToAuth()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outer_Navbar;
