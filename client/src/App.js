import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./frontend/quiz-page/QuizPage";
import QuizTaking from "./frontend/quiz-taking/QuizTaking";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Profile from "./frontend/profile/Profile";
import Custom404 from "./frontend/layout/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz-taking/:attempt_id" element={<QuizTaking />} />

        {/* Catch all non-exist route */}
        <Route path="*" element={<Custom404 replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
