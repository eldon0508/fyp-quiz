import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Blog from "./frontend/blog/Blog";
import SignIn from "./backend/sign-in/SignIn";
import Dashboard from "./backend/dashboard/Dashboard";
import Articles from "./backend/articles/Articles";
import ArticleCreate from "./backend/articles/ArticleCreate";
import ArticleEdit from "./backend/articles/ArticleEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/articles" element={<Blog />} />
        <Route path="/quiz" element={<Blog />} />

        <Route path="/admin/login" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/articles" element={<Articles />} />
        <Route path="/admin/articles/create" element={<ArticleCreate />} />
        <Route path="/admin/articles/:id/edit" element={<ArticleEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
