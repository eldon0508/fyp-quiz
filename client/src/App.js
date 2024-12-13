import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Article from "./frontend/article/Article";
import QuizTaking from "./frontend/quiz-taking/QuizTaking";
import Profile from "./frontend/profile/Profile";
import QuizPage from "./frontend/quiz-page/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/articles" element={<Article />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/quizzes" element={<QuizPage />} />
        <Route path="/take-quiz/:quiz" element={<QuizTaking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
