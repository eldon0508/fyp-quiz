import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";

const correctPrompts = [
  "Woohoo! You got it!",
  "Bingo! Right on the money!",
  "Nailed it! You're a social engineering smarty-pants!",
  "High five! You're a security pro!",
  "Awesome sauce! You're one step ahead of the scammers!",
];
const wrongPrompts = [
  "Oops! Not quite. Let's see what happened...",
  "Hmm... not the best choice. Let's investigate further!",
  "Whoops-a-daisy! Let's learn why that wasn't the safest option.",
  "Not exactly! Let's dig deeper and find out why.",
  "Uh oh! That might not be the best approach. Let's explore why.",
];

function getRandomPrompt(isCorrect) {
  const prompts = isCorrect ? correctPrompts : wrongPrompts;
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

export default function Questions() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [optionDisabled, setOptionDisabled] = useState(false);
  const [showSubmit, setShowsubmit] = useState(false);
  const [start, setStart] = useState(false);
  const [feedback, setFeedback] = useState();
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState({});
  const [questionsLength, setQuesionLength] = useState(-1);
  const [quiz, setQuiz] = useState({});
  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
  const [vulRate, setVulRate] = useState(0);
  const [correct, setCorrect] = useState(null);
  const [questionCorrect, setQuestionCorrect] = useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const res = await axios.get(window.location.pathname);
      if (res.status === 401 || res.status === 403) {
        navigate("/signin");
      }
      if (res.data.success) {
        setQuestions(res.data.questions);
        setQuesionLength(Object.keys(res.data.questions).length);
        setQuiz(res.data.quiz);
        setAttemptId(res.data.attempt_id);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/signin");
      }
    }
  };

  const handleStart = () => setStart(true);

  const handleCheck = async (question_id) => {
    try {
      setCheckDisabled(true);
      setNextDisabled(false);
      setOptionDisabled(true);

      const res = await axios.post("/quiz-question-check", {
        question_id,
        answer_id: Number(selectedAnswerId),
        attempt_id: attemptId,
      });
      if (res.data.success) {
        setFeedback(res.data.bestAnswer.feedback);
        setVulRate((prev) => prev + res.data.rate);
        setShowFeedback(true);
        if (res.data.correctness) {
          setQuestionCorrect(questionCorrect + 1);
        }
        setCorrect(res.data.correctness);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowFeedback(false);
    setCheckDisabled(true);
    setNextDisabled(true);
    setOptionDisabled(false);
    setFeedback();
    setCorrect(null);

    if (currentQuestionIndex + 2 >= questionsLength) {
      setShowsubmit(true);
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswerId(parseInt(event.target.value, 10));
    setCheckDisabled(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/quiz-submit", {
        attempt_id: attemptId,
        vulRate,
        questionCorrect,
      });
      if (res.data.success) {
        console.log(`Test result is: ${res.data.vulRate}%.`);
        alert(`Your vulnerability rate is ${res.data.vulRate}%.`);
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container id="quiz-container" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box marginBottom={2}>
        <Typography variant="h3" gutterBottom sx={{ color: "text.primary" }}>
          {quiz.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {quiz.description}
        </Typography>
      </Box>
      {start ? (
        <Stack
          spacing={1}
          border={"solid 0.5px"}
          borderRadius={1}
          padding="1.5rem"
        >
          <FormControl sx={{ m: 3 }} variant="standard">
            <FormLabel id="question-title">
              <Typography variant="subtitle1" gutterBottom>
                [{currentQuestionIndex + 1}]{". "}
                {questions[currentQuestionIndex].question_text}
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="question-title"
              name="radio-buttons-group"
              value={selectedAnswerId}
              onChange={handleAnswerChange}
            >
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer.answer_id}
                  control={<Radio />}
                  label={answer.answer_text}
                  disabled={optionDisabled}
                />
              ))}
            </RadioGroup>
            <Stack spacing={2} direction="row" marginTop={"1rem"}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  handleCheck(questions[currentQuestionIndex].question_id)
                }
                disabled={checkDisabled}
              >
                Check
              </Button>
              {showSubmit ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={nextDisabled}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={nextDisabled}
                >
                  Next
                </Button>
              )}
            </Stack>
          </FormControl>
          {showFeedback ? (
            <Stack spacing={2}>
              <Divider sx={{ paddingY: "1rem" }} />
              <Box>
                <Typography variant="h3" color={correct ? "success" : "error"}>
                  {getRandomPrompt(correct)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">{feedback}</Typography>
              </Box>
            </Stack>
          ) : null}
        </Stack>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Quiz
          </Button>
        </>
      )}
    </Container>
  );
}
