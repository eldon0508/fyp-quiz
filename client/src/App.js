import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Article from "./frontend/article/Article";
import QuizTaking from "./frontend/quiz-taking/QuizTaking";
import Profile from "./frontend/profile/Profile";
import QuizPage from "./frontend/quiz-page/QuizPage";
import Custom404 from "./frontend/layout/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/articles/:id" element={<ArticlePage />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/" element={<QuizPage />} />
        <Route path="/quiz-taking/:attempt_id" element={<QuizTaking />} />

        {/* Catch all non-exist route */}
        <Route path="*" element={<Custom404 replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
