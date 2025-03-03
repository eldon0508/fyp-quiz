import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppAppBar from "../layout/AppAppBar";
import AppTheme from "../shared-theme/AppTheme";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack, Typography } from "@mui/material";
import Footer from "./Footer";

export default function Custom404(props) {
  const [secondsRemaining, setSecondsRemaining] = React.useState(5);
  const navigate = useNavigate();

  React.useEffect(() => {
    let timer;
    if (secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else {
      navigate("/signin");
    }

    // Cleanup function to clear the timer when the component unmounts or the countdown finishes
    return () => clearTimeout(timer);
  }, [secondsRemaining, navigate]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div id="scaleble-content">
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h1" textAlign="center">
              Page Not Found
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ maxWidth: 600 }}
            >
              Whoa there, adventurer! You've stumbled off the map... literally.
              Hang tight, your trusty internet map is recalibrating... We'll
              have you back on the trail in {secondsRemaining} seconds. Don't
              worry, no dinosaurs here!
            </Typography>
          </Stack>
        </Container>
      </div>
      <Footer />
    </AppTheme>
  );
}
