import React, {useState} from 'react';
import { Button, Typography } from 'antd';
import { useDispatch, } from 'react-redux';
import { setReadyForQuiz, setNotReadyForQuiz, setUserReadiness, unsetUserReadiness } from '../actions'; // Correct import
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const ReadyForQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCanceled, setIsCanceled] = useState(false);

  const handleStartQuiz = () => {
    dispatch(setReadyForQuiz());
    dispatch(setUserReadiness(true));
    navigate('/quiz');
  };

  const handleCancelQuiz = () => {
    setIsCanceled(true);
    dispatch(setNotReadyForQuiz());
    dispatch(unsetUserReadiness());
  };

  return (
    <div>
    {isCanceled ? (
     <div>
     <Title level={3} style={{color: 'white'}}>Thank you for the answer</Title>
     <Button type="primary" onClick={handleStartQuiz}>
     Start
   </Button>
     
     </div>
    ) : (
      <div>
        <Title level={3} style={{color: 'white'}}>Ready for Quiz?</Title>
        <Button type="primary" onClick={handleStartQuiz}>
          Start
        </Button>
        <Button onClick={handleCancelQuiz}>Cancel</Button>
      </div>
    )}
  </div>
  );
};

export default ReadyForQuiz;
