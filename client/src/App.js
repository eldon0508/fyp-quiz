import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Article from "./frontend/article/Article";
import MarketingPage from "./frontend/marketing-page/MarketingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/quiz" element={<MarketingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
