import React, { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import "../styles/Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerTime, setAnswerTime] = useState(0);
  const [quizMode, setQuizMode] = useState("");
  const [bonus, setBonus] = useState(0);
  const [jokerUsed, setJokerUsed] = useState(false);
  const [jokerAnswers, setJokerAnswers] = useState([]);

  const funFacts = [
    "JS a été créé en 10 jours !",
    "Le mot 'bug' vient d'un insecte dans un ordinateur.",
    "Python était le langage le plus populaire sur GitHub en 2023.",
    "Le premier site web est toujours en ligne.",
    "Le code 'Hello World' est utilisé par les débutants.",
    "Le premier ordinateur électronique pesait 27 tonnes.",
    "Linux a été créé par Linus Torvalds en 1991.",
    "Un octet stocke une lettre ou un chiffre.",
    "Un bug de la NASA a fait échouer une mission martienne.",
    "Steve Jobs a choisi 'Apple' pour sa simplicité."
  ];

  useEffect(() => {
    if (quizFinished && score >= 10) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [quizFinished]);

  useEffect(() => {
    fetch("http://localhost:3001/quiz/questions")
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Erreur lors du chargement des questions :", err));
  }, []);

  useEffect(() => {
    if (!quizMode || quizFinished || isAnswerSelected) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft, quizMode, quizFinished, isAnswerSelected]);

  const handleUseJoker = () => {
    if (jokerUsed || isAnswerSelected || bonus < 2) return;

    const correct = questions[currentQuestion].correct;
    const allAnswers = [...questions[currentQuestion].answers];

    const wrongAnswers = allAnswers.filter((a) => a !== correct);
    const answersToHide = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
    const filtered = allAnswers.filter(answer => !answersToHide.includes(answer));

    setJokerAnswers(filtered);
    setJokerUsed(true);
    setBonus(prev => prev - 2); 
  };

  const handleStartQuiz = (mode) => {
    setQuizMode(mode);
    setCurrentQuestion(0);
    setScore(0);
    setBonus(0);
    setTimeLeft(25);
    setQuizFinished(false);
  };

  const handleAnswerClick = (answer) => {
    if (isAnswerSelected) return;

    const timeTaken = 25 - timeLeft;
    setAnswerTime(timeTaken);
    setSelectedAnswer(answer);
    setCorrectAnswer(questions[currentQuestion].correct);
    setIsAnswerSelected(true);

    let updatedScore = score;
    let updatedBonus = bonus;

    if (answer === questions[currentQuestion].correct) {
      updatedScore += 1;
      if (quizMode === "challenge") {
        if (timeTaken <= 3) updatedBonus += 2;
        else if (timeTaken <= 7) updatedBonus += 1;
      }
    }

    setScore(updatedScore);
    setBonus(updatedBonus);

    setTimeout(() => {
      handleNextQuestion();
    }, 4000);
  };

  const handleNextQuestion = () => {
    setIsAnswerSelected(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setAnswerTime(0);
    setJokerAnswers([]);
    setJokerUsed(false);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(25);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {

    setQuizMode("");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setBonus(0);
    setTimeLeft(25);
    setQuizFinished(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setIsAnswerSelected(false);

    fetch("http://localhost:3001/quiz/questions")
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Erreur lors du rechargement :", err));
  };

  if (questions.length === 0) {
    return <div className="container">Chargement des questions...</div>;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="container">
      {!quizFinished ? (
        !quizMode ? (
          <div className="mode-selection">
            <h1>Choisissez votre mode :</h1>
            <button className="modeButton" onClick={() => handleStartQuiz("normal")}>
              Mode Normal
            </button>
            <button className="modeButton" onClick={() => handleStartQuiz("challenge")}>
              Mode Challenge
            </button>
          </div>
        ) : (
          <>
            <div key={currentQuestion}>
              <h1 className="title">🧠 Quiz Time !</h1>
              <div className="timer-and-progress-container">
                <div className="progress-bar">
                  <p>Progression : Question {currentQuestion + 1} / {questions.length}</p>
                </div>
                <div className="timer">
                  {quizMode === "challenge" ? (
                    <CircularTimer timeLeft={timeLeft} total={25} />
                  ) : (
                    <NormalTimer timeLeft={timeLeft} total={25} />
                  )}
                </div>
              </div>

              <p className="question">{currentQ.question}</p>

              {quizMode === "challenge" && !jokerUsed && !isAnswerSelected && (
  <button
    className="jokerButton"
    onClick={handleUseJoker}
    disabled={bonus < 2}
    style={{
      opacity: bonus < 2 ? 0.5 : 1,
      cursor: bonus < 2 ? "not-allowed" : "pointer"
    }}
  >
    🃏 Utiliser le Joker 50/50 (2 pts)
  </button>
)}


              <div className="answers">
                {(jokerAnswers.length > 0 ? jokerAnswers : currentQ.answers).map((answer, index) => {
                  const isCorrect = answer === correctAnswer;
                  const isWrong = answer === selectedAnswer && selectedAnswer !== correctAnswer;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer)}
                      className="answerButton"
                      disabled={isAnswerSelected}
                      style={{
                        backgroundColor: isCorrect
                          ? "green"
                          : isWrong
                          ? "red"
                          : "#ffffff",
                        color: isCorrect || isWrong ? "white" : "#2C3E50",
                        border: "2px solid #ccc",
                        transition: "background-color 0.3s ease, color 0.3s ease",
                      }}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>

              {isAnswerSelected && quizMode === "challenge" && selectedAnswer === correctAnswer && (
                <div className="scoreBonus">
                  {answerTime <= 3 && <p>Réponse rapide ! +2 points</p>}
                  {answerTime > 3 && answerTime <= 7 && <p>Bon rythme ! +1 point</p>}
                  {answerTime > 7 && <p>⏳ Trop lent pour le bonus !</p>}
                  <p>Bonus total : {bonus} points</p>
                </div>
              )}
            </div>

            {isAnswerSelected && selectedAnswer === correctAnswer && (
              <div className="funFact">
                <p>🌟 Fun Fact : {funFacts[Math.floor(Math.random() * funFacts.length)]}</p>
              </div>
            )}
          </>
        )
      ) : (
        <div className="result">
          <h2>Quiz terminé !</h2>
          <p>Ton score : {score} / {questions.length}</p>
          <p>Bonus total : {bonus} points</p>
          <button className="modeButton" onClick={handleResetQuiz}>Recommencer</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

// Timer circulaire
const CircularTimer = ({ timeLeft, total }) => {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / total) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e0e0e0"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#3498db"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 1s linear" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="16"
        fill="#2C3E50"
      >
        {timeLeft}s
      </text>
    </svg>
  );
};

const NormalTimer = CircularTimer;