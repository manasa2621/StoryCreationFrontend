import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "./Components/Navbar";
import ReactModal from "react-modal";
import "./WebHomePage.css";
import Form from "./Components/Form";
import AddStory from "./Components/AddStory";
import Categories from "./Components/Categories";
ReactModal.setAppElement("#root");

export default function WebHomePage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [modal, setModal] = useState(false);
  const [addStory, setAddStory] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    setModal(isSignUp);
  }, [isSignUp]);

  useEffect(() => {
    setModal(isLogIn);
  }, [isLogIn]);

  useEffect(() => {
    console.log(showBookmarks);
  }, [showBookmarks]);

  const handleSuccessfulLogin = () => {
    // Navigate to '/home' after successful login
    navigate("/home");
  };

  return (
    <div className="homepage">
      <Navbar
        setIsSignUp={setIsSignUp}
        setIsLogIn={setIsLogIn}
        setAddStory={setAddStory}
        setShowBookmarks={setShowBookmarks}
        bookmarks={showBookmarks}
      />
      <ReactModal
        isOpen={modal}
        onRequestClose={() => {
          setModal(false);
          setIsLogIn(false);
          setIsSignUp(false);
        }}
        className="modal"
        overlayClassName={"modalOverlay"}
      >
        <Form
          isSignUp={isSignUp}
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          onSuccessLogin={handleSuccessfulLogin} // Pass onSuccessLogin callback
        />
      </ReactModal>
    </div>
  );
}
