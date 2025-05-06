import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${
    process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
  }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = React.useState(null);
  const [quesNum, setQuesNum] = React.useState(5);

  const getAuthUser = async () => {
    const res = await axios.get("/getAuthUser");
    if (res.data.success) {
      setAuthUser(res.data.data);
    }
  };

  React.useEffect(() => {
    getAuthUser();
  }, []);

  const handleNumChange = (e) => {
    setQuesNum(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/take-quiz", { quesNum, quiz_id: 1 });
      if (res.data.success) {
        navigate(`/quiz-taking/${res.data.attempt_id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Think&nbsp;you're&nbsp;safe&nbsp;from&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "#f50a0a",
                ...theme.applyStyles("dark", {
                  color: "#f50a0a",
                }),
              })}
            >
              social&nbsp;engineering?
            </Typography>
          </Typography>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              marginTop: "-1rem",
            }}
          >
            Take&nbsp;our&nbsp;quiz&nbsp;to&nbsp;find&nbsp;out!
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Discover your vulnerabilities and learn to protect yourself from sophisticated social engineering tactics.
            Test your awareness and enhance your online security today.
          </Typography>
          {authUser ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                useFlexGap
                sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="question_number"
                  name="question_number"
                  select
                  value={quesNum}
                  onChange={handleNumChange}
                >
                  <MenuItem key={5} value={5}>
                    5
                  </MenuItem>
                  <MenuItem key={10} value={10}>
                    10
                  </MenuItem>
                  <MenuItem key={15} value={15}>
                    15
                  </MenuItem>
                </TextField>
                <Button variant="contained" color="primary" size="small" sx={{ minWidth: "fit-content" }} type="submit">
                  Start&nbsp;Now
                </Button>
              </Stack>
            </form>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
            >
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                id="question_number"
                name="question_number"
                select
                value={quesNum}
                onChange={handleNumChange}
              >
                <MenuItem key={5} value={5}>
                  5
                </MenuItem>
                <MenuItem key={10} value={10}>
                  10
                </MenuItem>
                <MenuItem key={15} value={15}>
                  15
                </MenuItem>
              </TextField>
              <Link href="/signin" color="primary">
                <Button variant="contained" color="primary" size="small" sx={{ minWidth: "fit-content" }}>
                  Start&nbsp;Now
                </Button>
              </Link>
            </Stack>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
