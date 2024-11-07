import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./frontend/sign-in-side/SignInSide";
import SignUp from "./frontend/sign-up/SignUp";
import Blog from "./frontend/blog/Blog";

import SignIn from "./backend/sign-in/SignIn";
import Dashboard from "./backend/dashboard/Dashboard";
import ArticleIndex from "./backend/dashboard/article/ArticleIndex";
import ArticleCreate from "./backend/dashboard/article/ArticleCreate";
import ArticleEdit from "./backend/dashboard/article/ArticleEdit";
import CategoryIndex from "./backend/dashboard/category/CategoryIndex";
import CategoryCreate from "./backend/dashboard/category/CategoryCreate";
import CategoryEdit from "./backend/dashboard/category/CategoryEdit";

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

        <Route path="/admin/category" element={<CategoryIndex />} />
        <Route path="/admin/category/create" element={<CategoryCreate />} />
        <Route path="/admin/category/:id/edit" element={<CategoryEdit />} />

        <Route path="/admin/article" element={<ArticleIndex />} />
        <Route path="/admin/article/create" element={<ArticleCreate />} />
        <Route path="/admin/article/:id/edit" element={<ArticleEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
