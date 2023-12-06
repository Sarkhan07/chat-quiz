import  React, { useEffect} from 'react';
import { signInWithGoogle, auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../actions.js';
import { Button, Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const AuthContent = styled(Card)`
  width: 600px;
  height: 200px;
  background-color: blue;
  text-align: center;

`;

const AuthHeading = styled(Title)`
  margin-bottom: 20px;
  background-color: white;
  font-family: ui-serif;
  color: blue;
`;

const AuthText = styled(Text)`
  margin-bottom: 20px;
  font-size: 16px;
  color: white;
  font-family: ui-serif;
`;
const AuthButton = styled(Button)`
  background-color: #4285f4;
  color: #fff;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }
`;

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
    <AuthContainer>
      <AuthContent>
      <AuthHeading>Sign in with google for participation in Chat-Quiz</AuthHeading>
        {user ? (
          <p>Welcome, {user.displayName}!</p>
        ) : (
          <div>
            <AuthText>Please sign in:</AuthText>
            <AuthButton onClick={handleSignIn}>Sign In with Google</AuthButton>
          </div>
        )}
      
      </AuthContent>
      
    </AuthContainer>
  );
};

export default AuthorizationPage;

