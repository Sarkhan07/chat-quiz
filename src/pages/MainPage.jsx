import React from 'react';
import { signOut, auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS } from '../actions';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <p>You are signed out!</p>
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