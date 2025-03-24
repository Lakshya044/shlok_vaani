"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "react-google-button";
import { signIn, signOut } from "next-auth/react";
export default function AuthForm(){
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset message when switching between Sign Up and Log In
    setMessage("");
    setShowMessage(false);
  }, [isSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(e.target);
    const name = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("rePassword");
  
    // Basic validation
    if (isSignUp && password !== confirmPassword) {
      setShowMessage(true);
      setMessage("Passwords do not match. Please re-enter.");
      setError(true);
      setIsLoading(false);
      return;
    }
  
    const userDetails = { name, email, password };
  
    try {
      let endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
  
      const data = await response.json(); // Parse response JSON
  
      // Handle signup
      if (isSignUp && response.ok) {
        setError(false);
        setMessage(data.message || "Account created successfully. Please log in.");
        setShowMessage(true);
        setIsSignUp(false);
      }
  
      // Handle login
      if (!isSignUp && response.ok) {
        setIsLoggedIn(true);
        setError(false);
        setMessage(data.message || "Logged in successfully.");
        router.replace("/homepage");
      }
  
      // Handle errors from API
      if (!response.ok) {
        setError(true);
        setMessage(data.error || "An error occurred. Please try again.");
        setShowMessage(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
      setMessage("Something went wrong. Please try again later.");
      setShowMessage(true);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/homepage");
    }
  }, [isLoggedIn]);

  function changeStatus() {
    setIsSignUp(!isSignUp);
    setMessage("");
    setShowMessage(false);
  }

  const handleInputFocus = () => {
    setMessage("");
    setShowMessage(false);
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        setError(true);
        setMessage("Google Sign In Failed");
        setShowMessage(true);
      } else {
        setIsLoggedIn(true);
        router.replace("/homepage");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setError(true);
      setMessage("Something went wrong with Google Sign In.");
      setShowMessage(true);
    }
  };
  


  return (
    <>
      {/* Large Screen Card */}
      <div className="h-[90%] bg-base-100 flex justify-center items-center p-4 py-20">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10 gap-x-20">
          {/* Left and Right Cards for Larger Screens */}
          <div className="flex-1 p-6 rounded-2xl h-[480px] shadow-lg border-4 border-[#CE3E14] bg-white md:block hidden">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 bg-[#CE3E14] rounded-full px-6 py-2 mb-6">
                <button
                  className={`px-6 py-2 rounded-full ${
                    isSignUp ? "bg-[#FAE6A1] text-[#CE3E14]" : "text-white"
                  }`}
                  onClick={changeStatus}
                >
                  Sign Up
                </button>
                <button
                  className={`px-6 py-2 rounded-full ${
                    !isSignUp ? "bg-[#FAE6A1] text-[#CE3E14]" : "text-white"
                  }`}
                  onClick={changeStatus}
                >
                  Log In
                </button>
              </div>
              <h1 className="text-6xl font-bold text-[#CE3E14] text-left mt-8">
                {isSignUp ? "Sign Up" : "Log In"} <br /> <br />
                <span className="text-[#1e1e1e]">into ShlokVaani</span>
              </h1>
            </div>
          </div>

          <div className="flex-1 p-6 rounded-2xl md:block hidden h-[480px] shadow-lg border border-[#CE3E14] bg-white">
            <div>
              <h2 className="text-3xl font-bold text-[#CE3E14] mb-2">
                {isSignUp ? "Get Started" : "Welcome Back"}
              </h2>
              <p className="text-lg text-[#575757] mb-6">
                {isSignUp
                  ? "Please enter your account details"
                  : "Log in to your account"}
              </p>

              {/* Error and Success message */}
              {showMessage && (
                <p className={error ? "text-red-500" : "text-green-500"}>
                  {message}
                </p>
              )}

              {/* Input Fields */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {isSignUp ? (
                  <div className="h-[254.5px] gap-4 flex flex-col justify-around">
                    <input
                      name="username"
                      type="text"
                      placeholder="Enter username"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                      onFocus={handleInputFocus}
                      required
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                      onFocus={handleInputFocus}
                      required
                    />
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a strong password"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                        onFocus={handleInputFocus}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <img
                          src={
                            showPassword
                              ? "./open-eye.png"
                              : "./close-eye.png"
                          }
                          alt="Toggle Visibility"
                          className="w-6 h-6 text-[#CE3E14]"
                        />
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        name="rePassword"
                        type={showRePassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                        required
                        onFocus={handleInputFocus}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowRePassword(!showRePassword)}
                      >
                        <img
                          src={
                            showRePassword
                              ? "./open-eye.png"
                              : "./close-eye.png"
                          }
                          alt="Toggle Visibility"
                          className="w-6 h-6 text-[#CE3E14]"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[254.5px] gap-4 flex flex-col">
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                      onFocus={handleInputFocus}
                      required
                    />
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter a strong password"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                        onFocus={handleInputFocus}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <img
                          src={
                            showPassword
                              ? "./open-eye.png"
                              : "./close-eye.png"
                          }
                          alt="Toggle Visibility"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                    
                    <div className=" flex flex-row justify-center items-center pt-8">                    
                      <GoogleButton onClick={handleGoogleSignIn}/>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#CE3E14] text-white rounded-lg hover:bg-[#016c4b]"
                >
                  {isLoading
                    ? "Please Wait..."
                    : isSignUp
                    ? "Sign Up"
                    : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Small Screen Card */}
      <div className="md:hidden flex justify-center items-center h-[50%] bg-[#FAE6A1] pb-20">
        <div className="w-[400px] h-[500px] px-6 py-8 bg-white rounded-2xl shadow-md flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-[#CE3E14]">
            {isSignUp ? "Sign Up" : "Log In"}{" "}
            <span className="text-[#1e1e1e]">into ShlokVaani</span>
          </h2>
          <div className="flex gap-4 bg-[#CE3E14] rounded-full px-6 py-2">
            <button
              className={`px-4 py-2 rounded-full ${
                isSignUp ? "bg-[#FAE6A1] text-[#CE3E14]" : "text-white"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                !isSignUp ? "bg-[#FAE6A1] text-[#CE3E14]" : "text-white"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Log In
            </button>
          </div>
          <p className="text-[#575757]">
            {isSignUp
              ? "Please enter your account details"
              : "Log in to your account"}
          </p>

          {/* Error and Success message */}
          {showMessage && (
            <p className={error ? "text-red-500" : "text-green-500"}>
              {message}
            </p>
          )}

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {isSignUp ? (
              <>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                  onFocus={handleInputFocus}
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                  onFocus={handleInputFocus}
                  required
                />
                <div className="relative mb-4">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                    onFocus={handleInputFocus}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={
                        showPassword
                          ? "./open-eye.png"
                          : "./close-eye.png"
                      }
                      alt="Toggle Password Visibility"
                      className="w-6 h-6"
                    />
                  </button>
                </div>

                <div className="relative">
                  <input
                    name="rePassword"
                    type={showRePassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                    onFocus={handleInputFocus}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowRePassword(!showRePassword)}
                  >
                    <img
                      src={
                        showRePassword
                          ? "./open-eye.png"
                          : "./close-eye.png"
                      }
                      alt="Toggle Password Visibility"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </>
            ) : (
              <div className ="relative">
                <input
                  name="email"
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                  onFocus={handleInputFocus}
                  required
                />
                <div className="relative mb-4">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-2 rounded-lg border-2 border-[#CE3E14] text-[#575757]"
                    onFocus={handleInputFocus}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={
                        showPassword
                          ? "./open-eye.png"
                          : "./close-eye.png"
                      }
                      alt="Toggle Password Visibility"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <div className=" flex flex-row justify-center pt-8">                    
                <GoogleButton onClick={handleGoogleSignIn}/>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#CE3E14] text-white rounded-lg hover:bg-[#016c4b]"
            >
              {isLoading ? "Please Wait..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

