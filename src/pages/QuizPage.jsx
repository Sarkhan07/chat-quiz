import React, { useState } from 'react';
import { Typography, Button, Radio, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const QuizPage = () => {
  let correctCount = 0;
  let incorrectCount = 0;
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [quizResults, setQuizResults] = useState({ correctCount: 0, incorrectCount: 0 }); 
  const quizData = [
    {
      question: "Which of the following is an example of personal protective equipment (PPE)?",
      options: [
        { label: "a) Fire extinguisher", isCorrect: false },
        { label: "b) Safety goggles", isCorrect: true },
        { label: "c) First aid kit", isCorrect: false },
        { label: "d) Ergonomic chair", isCorrect: false },
      ],
    },
    {
      question: "What is the correct procedure in case of a fire emergency?",
      options: [
        { label: "a) Stay in your workplace until help arrives", isCorrect: false },
        { label: "b) Call a friend to inform them about the fire", isCorrect: false },
        { label: "c) Use the elevator to evacuate the building", isCorrect: false },
        { label: "d) Follow designated escape routes and assemble at a safe location", isCorrect: true },
      ],
    },
    {
      question: " What does the acronym “CPR” stand for?",
      options: [
        { label: "a) Cardiac Pulmonary Resuscitation", isCorrect: false },
        { label: "b) Cardiopulmonary Resuscitation", isCorrect: true },
        { label: "c) Cardiopulmonary Rehabilitation", isCorrect: false },
        { label: "d) Cardiovascular Physical Recovery", isCorrect: false },
      ],
    },
    {
      question: "What should you do if you witness a coworker experiencing an electric shock?",
      options: [
        { label: "a)Touch the person to help them regain consciousness", isCorrect: false },
        { label: "b) Attempt to remove the person from the electrical source", isCorrect: false },
        { label: "c)  Call emergency services and wait for professional assistance", isCorrect: true },
        { label: "d) Ignore the situation as it may resolve on its own", isCorrect: false },
      ],
    },
    {
      question: "What is the primary cause of accidents in the workplace?",
      options: [
        { label: "a) Poor lighting conditions", isCorrect: false },
        { label: "b) Human error", isCorrect: true },
        { label: "c) Inadequate ventilation", isCorrect: false },
        { label: "d) ELack of safety signage", isCorrect: false },
      ],
    },
  ];


  const handleFinishQuiz = () => {
   

    quizData.forEach((questionData, questionIndex) => {
  
      const selectedOptionIndex = selectedAnswers[questionIndex];
      const isCorrect =
        selectedOptionIndex !== undefined && questionData.options[selectedOptionIndex].isCorrect;
      if (isCorrect) {
        return correctCount += 1;
      } else {
        return incorrectCount += 1;
      }
      
    });


    setQuizResults({ correctCount, incorrectCount });
    setResultModalVisible(true);
  };

  const backToMainPage = () => {
    navigate('/main');
  };

  const handleAnswerClick = (questionIndex, optionIndex) => {
    const updatedSelectedAnswers = { ...selectedAnswers };
    updatedSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleModalClose = () => {
    setResultModalVisible(false);
    navigate('/main');
  };

  return (
    <div>
      <Title level={2}>Quiz Page</Title>

      {quizData.map((questionData, questionIndex) => (
        <div key={questionIndex}>
          <Title level={4}>{`${questionIndex + 1}. ${questionData.question}`}</Title>
          {questionData.options.map((option, optionIndex) => (
            <Radio
              key={optionIndex}
              style={{
                backgroundColor:
                  selectedAnswers[questionIndex] === optionIndex
                    ? option.isCorrect
                      ? 'green'
                      : 'red'
                    : 'white',
              }}
              onClick={() => handleAnswerClick(questionIndex, optionIndex)}
            >
              {option.label}
            </Radio>
          ))}
        </div>
      ))}

      <Button type="dashed" onClick={handleFinishQuiz} style={{backgroundColor: 'green', color: 'white', margin: '30px'}} >
        Finish Quiz
      </Button>

      <Button type="primary" onClick={backToMainPage}>
        Back to Chat page
      </Button>
      <Modal
      title="Quiz Results"
      open={resultModalVisible}
      onCancel={handleModalClose}
      onOk={handleModalClose}
    >
    <p>{`Correct: ${quizResults.correctCount}`}</p>
    <p>{`Incorrect: ${quizResults.incorrectCount}`}</p>
    </Modal>
    </div>
  );
};

export default QuizPage;