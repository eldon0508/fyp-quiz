import React, { useEffect, useState } from "react";
import axios from "axios";

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
import Button from "@mui/material/Button";

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

export default function Attempts() {
  const [attempts, setAttempts] = useState([]);

  const loadAttempts = async () => {
    const res = await axios.get("/profile-attempts");
    if (res.data.success) {
      setAttempts(res.data.data);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  return (
    <Stack spacing={2}>
      {attempts.map((attempt, index) => (
        <Accordion key={`attempt-${index}`}>
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
            </Stack>
          </AccordionDetails>
          <AccordionActions>
            <Button>Print</Button>
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
  );
}
