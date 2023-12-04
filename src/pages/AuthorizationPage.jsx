import  React, { useEffect} from 'react';
import { signInWithGoogle, auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../actions.js';

const AuthorizationPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        navigate('/main');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      console.log(user)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Authorization Page</h2>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <div>
          <p>Please sign in:</p>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default AuthorizationPage;

