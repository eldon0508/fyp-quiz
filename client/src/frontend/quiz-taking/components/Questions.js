import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { RadioGroup, FormControlLabel, Radio, Stack } from "@mui/material";

import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";

import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

// const items = [
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: "Dashboard",
//     description:
//       "This item could provide a snapshot of the most important metrics or data points related to the product.",
//     imageLight: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/dash-light.png")`,
//     imageDark: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/dash-dark.png")`,
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: "Mobile integration",
//     description:
//       "This item could provide information about the mobile app version of the product.",
//     imageLight: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/mobile-light.png")`,
//     imageDark: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/mobile-dark.png")`,
//   },
//   {
//     icon: <DevicesRoundedIcon />,
//     title: "Available on all platforms",
//     description:
//       "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
//     imageLight: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/devices-light.png")`,
//     imageDark: `url("${
//       process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
//     }/static/images/templates/templates-images/devices-dark.png")`,
//   },
// ];

// const Chip = styled(MuiChip)(({ theme }) => ({
//   variants: [
//     {
//       props: ({ selected }) => selected,
//       style: {
//         background:
//           "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
//         color: "hsl(0, 0%, 100%)",
//         borderColor: (theme.vars || theme).palette.primary.light,
//         "& .MuiChip-label": {
//           color: "hsl(0, 0%, 100%)",
//         },
//         ...theme.applyStyles("dark", {
//           borderColor: (theme.vars || theme).palette.primary.dark,
//         }),
//       },
//     },
//   ],
// }));

// function MobileLayout({ selectedItemIndex, handleItemClick, selectedFeature }) {
//   if (!items[selectedItemIndex]) {
//     return null;
//   }

//   return (
//     <Box
//       sx={{
//         display: { xs: "flex", sm: "none" },
//         flexDirection: "column",
//         gap: 2,
//       }}
//     >
//       <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
//         {items.map(({ title }, index) => (
//           <Chip
//             size="medium"
//             key={index}
//             label={title}
//             onClick={() => handleItemClick(index)}
//             selected={selectedItemIndex === index}
//           />
//         ))}
//       </Box>
//       <Card variant="outlined">
//         <Box
//           sx={(theme) => ({
//             mb: 2,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: 280,
//             backgroundImage: "var(--items-imageLight)",
//             ...theme.applyStyles("dark", {
//               backgroundImage: "var(--items-imageDark)",
//             }),
//           })}
//           style={
//             items[selectedItemIndex]
//               ? {
//                   "--items-imageLight": items[selectedItemIndex].imageLight,
//                   "--items-imageDark": items[selectedItemIndex].imageDark,
//                 }
//               : {}
//           }
//         />
//         <Box sx={{ px: 2, pb: 2 }}>
//           <Typography
//             gutterBottom
//             sx={{ color: "text.primary", fontWeight: "medium" }}
//           >
//             {selectedFeature.title}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
//             {selectedFeature.description}
//           </Typography>
//         </Box>
//       </Card>
//     </Box>
//   );
// }

// MobileLayout.propTypes = {
//   handleItemClick: PropTypes.func.isRequired,
//   selectedFeature: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     icon: PropTypes.element,
//     imageDark: PropTypes.string.isRequired,
//     imageLight: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
//   selectedItemIndex: PropTypes.number.isRequired,
// };

// export { MobileLayout };

export default function Questions() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [optionDisabled, setOptionDisabled] = useState(false);
  const [showSubmit, setShowsubmit] = useState(false);
  const [start, setStart] = useState(false);
  const [feedback, setFeedback] = useState({});
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState();
  const [questionsLength, setQuesionLength] = useState(-1);
  const [quiz, setQuiz] = useState({});
  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);

  const loadQuiz = async () => {
    const res = await axios.get(window.location.pathname);
    if (res.data.success) {
      setQuestions(res.data.questions);
      setQuesionLength(Object.keys(res.data.questions).length);
      setQuiz(res.data.quiz);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleStart = async () => {
    const res = await axios.post("/start-quiz", { quiz_id: quiz.id });
    if (res.data.success) {
      setStart(true);
      setAttemptId(res.data.attempt_id);
    }
  };

  const handleCheck = async (question_id) => {
    try {
      setCheckDisabled(true);
      setNextDisabled(false);
      setShowFeedback(true);
      setOptionDisabled(true);

      const res = await axios.post("/quiz-question-check", {
        question_id,
        answer_id: Number(selectedAnswerId),
        attempt_id: attemptId,
      });
      if (res.data.success) {
        setFeedback({
          correct: res.data.correctness,
          feedback: res.data.feedback,
        });
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
    setFeedback({});

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
      });
      if (res.data.success) {
        navigate("/quizzes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {quiz.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          {quiz.description}
        </Typography>
      </Box>
      <div>
        {start ? (
          <>
            <Typography variant="body1" gutterBottom>
              [{currentQuestionIndex + 1}]{". "}
              {questions[currentQuestionIndex].question_text}
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
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
            <Stack spacing={2} direction="row">
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
            {showFeedback ? (
              <>
                <Divider sx={{ marginY: "2rem" }} />
                <Box
                  sx={{
                    bgcolor: feedback.correct ? "success.main" : "error.main",
                  }}
                >
                  <Typography>{feedback.feedback}</Typography>
                </Box>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Quiz
          </Button>
        )}
      </div>
    </Container>
  );
}
