import React from 'react';
import { signOut, auth } from '../firebase';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      {auth.currentUser ? (
        <p>Welcome, {auth.currentUser.displayName}!</p>
      ) : (
        <p>You are sign out!</p>
      )}
 
      <h3>Chat Feature</h3>
      <p>Chat functionality</p>

      <h3>Quiz Feature</h3>
      <p>Quiz functionality</p>
      
      <button onClick={() => signOutUser()}>Sign Out</button>
   
    </div>
  );
};

export default MainPage;