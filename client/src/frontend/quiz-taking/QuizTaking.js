import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../layout/AppAppBar";
import AppTheme from "../shared-theme/AppTheme";
import Questions from "./components/Questions";

export default function QuizTaking(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div>
        <Questions />
      </div>
    </AppTheme>
  );
}
