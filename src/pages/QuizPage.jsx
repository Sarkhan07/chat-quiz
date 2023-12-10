import React from 'react';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const QuizPage = () => {
  const navigate = useNavigate();

  const handleFinishQuiz = () => {
    navigate('/main');
  };

  return (
    <div>
      <Title level={2}>Quiz Page</Title>

      <Button type="primary" onClick={handleFinishQuiz}>
        Finish Quiz
      </Button>
    </div>
  );
};

export default QuizPage;
