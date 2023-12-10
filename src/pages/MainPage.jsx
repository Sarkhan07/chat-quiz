import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signOut, auth, listenToMessagesFromFirestore, sendMessageToFirestore } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS } from '../actions';
import { useNavigate } from "react-router-dom";
import { Input, Button, Typography } from 'antd';
import ReadyForQuiz from './ReadyForQuiz'

const { Title } = Typography;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f3f4f6;
`;

const UserAccountSection = styled.div`
  background-color: #1c1e21;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
`;

const ChatSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuizSection = styled.div`
  background-color: #1c1e21;
  padding: 20px;
  color: #ffffff;
`;

const MessageContainer = styled.div`
  margin-top: 20px;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;

const StyledButton = styled(Button)`
  background-color: #3f8ae0;
  border-color: #3f8ae0;

  &:hover {
    background-color: #3067a8;
    border-color: #3067a8;
  }
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

  const sendMessage = async () => {
    try {
      await sendMessageToFirestore(message, user.displayName);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = listenToMessagesFromFirestore((newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <UserAccountSection>
        {user ? (
          <Title level={3} style={{ color: '#ffffff' }}>Welcome, {user.displayName}!</Title>
        ) : (
          <Title level={3}>You are signed out!</Title>
        )}
        <Button type="primary" onClick={signOutUser}>
          Sign Out
        </Button>
      </UserAccountSection>

      <ChatSection>
        <Title level={3} style={{ color: 'blue' }}>LiveChat for Education</Title>
        <MessageContainer>
          {messages.map((msg) => (
            <MessageItem key={msg.id}>
              <strong>{msg.user}</strong>: {msg.text}
            </MessageItem>
          ))}
        </MessageContainer>
        <InputContainer>
          <StyledInput
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <StyledButton type="primary" onClick={sendMessage}>
          Send
        </StyledButton>
        </InputContainer>
       
      </ChatSection>

      <QuizSection>
        <Title level={3} style={{ color: '#ffffff' }}>Quiz</Title>
         <ReadyForQuiz/>
      </QuizSection>
    </Container>
  );
};

export default MainPage;