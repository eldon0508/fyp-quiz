import React, { useEffect, useState } from "react";
import axios from "axios";

import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type:", detail: "Visa" },
  { name: "Card holder:", detail: "Mr. John Smith" },
  { name: "Card number:", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date:", detail: "04/2024" },
];

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours}h `;
  }

  if (minutes > 0) {
    timeString += `${minutes}m `;
  }

  timeString += `${remainingSeconds}s`;

  return timeString.trim();
}

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Attempts() {
  const [expanded, setExpanded] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [quizId, setQuizId] = useState(-1);

  const loadAttempts = async () => {
    const res = await axios.get("/profile-attempts");
    if (res.data.success) {
      setAttempts(res.data.data);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpen = (id) => {
    setIsOpen(true);
    setQuizId(id);
  };

  const handleClose = () => setIsOpen(false);

  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/profile-quiz-feedback", {
        feedback,
        quizId,
      });
      if (res.data.success) {
        console.log("Feedback submitted");
      }
      handleClose();
    } catch (err) {
      console.error(err);
      handleClose();
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="feedback-dialog-title"
        aria-describedby="feedback-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="feedback-dialog-title">Quiz Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText id="feedback-dialog-description">
              <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="feedback" required>
                  Feedback
                </FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  id="feedback"
                  name="feedback"
                  required
                  onChange={handleFeedback}
                />
              </FormGrid>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ margin: 1 }}>
            <Stack spacing={2} direction="row">
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
      <Stack>
        {attempts.map((attempt, index) => (
          <Accordion
            key={`attempt-${index}`}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Attempt {index + 1}
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Quiz Name" />
                  <Typography variant="body2">{attempt.quiz.name}</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary="Question Correct"
                    secondary={`${attempt.question_number} total`}
                  />
                  <Typography variant="body2">
                    {attempt.question_correct}
                  </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Time Used" />
                  <Typography variant="body2">
                    {secondsToTime(attempt.timeUsed)}
                  </Typography>
                </ListItem>
              </List>
              <Divider />
              {/* <Stack
              direction="column"
              divider={<Divider flexItem />}
              spacing={2}
              sx={{ my: 2 }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Shipment details
                </Typography>
                <Typography gutterBottom>John Smith</Typography>
                <Typography gutterBottom sx={{ color: "text.secondary" }}>
                  {addresses.join(", ")}
                </Typography>
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Payment details
                </Typography>
                <Grid container>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Date Taken
                    </Typography>
                    <Typography variant="body2">
                      {attempt.created_at.split("T")[0]}
                    </Typography>
                  </Stack>
                </Grid>
              </div>
            </Stack> */}
            </AccordionDetails>
            <AccordionActions>
              <IconButton
                aria-label="feedback"
                color="primary"
                onClick={() => handleOpen(attempt.quiz.id)}
              >
                <FeedbackIcon />
              </IconButton>
              <IconButton aria-label="print" color="primary">
                <LocalPrintshopIcon />
              </IconButton>
            </AccordionActions>
          </Accordion>
        ))}

        {/* <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="4 selected" />
          <Typography variant="body2">$134.98</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $144.97
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {addresses.join(", ")}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack> */}
      </Stack>
    </>
  );
}
