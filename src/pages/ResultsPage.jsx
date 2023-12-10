import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Title } = Typography;

const StyledResultsPage = styled.div`
text-align: center;
margin: 50px auto;
max-width: 600px;
padding: 20px;
background-color: #4CAF50; 
color: white;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledResultsText = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  color: white;
`;

const StyledButton = styled(Button)`
  background-color: #1890ff; /* Ant Design primary color */
  color: white;

  &:hover,
  &:focus {
    background-color: #096dd9; /* Darker shade on hover/focus */
  }
`;


const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizResults = location.state?.quizResults || { correctCount: 0, incorrectCount: 0 };

  const backToMainPage = () => {
    navigate('/main');
  };

  return (
    <StyledResultsPage>
        <Title level={2}>Results Page</Title>

        <StyledResultsText>{`Correct: ${quizResults.correctCount}`}</StyledResultsText>
        <StyledResultsText>{`Incorrect: ${quizResults.incorrectCount}`}</StyledResultsText>

        <StyledButton type="primary" onClick={backToMainPage}>
          Back to Chat page
        </StyledButton>
      </StyledResultsPage>
  );
};

export default ResultsPage;
