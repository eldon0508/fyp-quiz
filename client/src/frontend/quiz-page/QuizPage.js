import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../layout/AppAppBar";
import Hero from "./components/Hero";
import Footer from "../layout/Footer";
import AppTheme from "../shared-theme/AppTheme";
import Container from "@mui/material/Container";
import MainContent from "../article/components/MainContent";
import Latest from "../article/components/Latest";

export default function QuizPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <div id="scaleble-content">
        <Hero />
        <div>
          <Divider />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
            id="scaleble-content"
          >
            <MainContent />
            <Latest />
          </Container>
          <Footer />
        </div>
      </div>
    </AppTheme>
  );
}
