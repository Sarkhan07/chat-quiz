import React from 'react';
import { Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { setReadyForQuiz, setNotReadyForQuiz, setUserReadiness, unsetUserReadiness } from '../actions'; // Correct import

const { Title } = Typography;

const ReadyForQuiz = () => {
  const dispatch = useDispatch();

  const handleStartQuiz = () => {
    dispatch(setReadyForQuiz());
    dispatch(setUserReadiness(true));
  };

  const handleCancelQuiz = () => {
    dispatch(setNotReadyForQuiz());
    dispatch(unsetUserReadiness());
  };

  return (
    <div>
      <Title level={3}>Ready for Quiz?</Title>
      <Button type="primary" onClick={handleStartQuiz}>
        Start
      </Button>
      <Button onClick={handleCancelQuiz}>Cancel</Button>
    </div>
  );
};

export default ReadyForQuiz;
