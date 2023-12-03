import  React, { useEffect, useState } from 'react';
import { signInWithGoogle, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AuthorizationPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

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
      {auth.currentUser ? (
        navigate('/main')
       
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

