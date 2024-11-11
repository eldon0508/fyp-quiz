import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

import { varAlpha } from "src/theme/styles";
import { AuthLayout } from "src/layouts/auth";
import { DashboardLayout } from "src/layouts/dashboard";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("src/pages/home"));
export const BlogPage = lazy(() => import("src/pages/blog"));
export const UserPage = lazy(() => import("src/pages/user"));
export const CategoryPage = lazy(() => import("src/pages/category/category"));
export const CategoryCreatePage = lazy(() => import("src/pages/category/categoryCreate"));
export const CategoryEditPage = lazy(() => import("src/pages/category/categoryEdit"));
export const ArticlePage = lazy(() => import("src/pages/article/article"));
export const ArticleCreatePage = lazy(() => import("src/pages/article/articleCreate"));
export const ArticleEditPage = lazy(() => import("src/pages/article/articleEdit"));
export const QuizPage = lazy(() => import("src/pages/quiz/quiz"));
export const QuizCreatePage = lazy(() => import("src/pages/quiz/quizCreate"));
export const QuizEditPage = lazy(() => import("src/pages/quiz/quizEdit"));
export const SignInPage = lazy(() => import("src/pages/sign-in"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: "admin/user", element: <UserPage /> },
        { path: "admin/category", element: <CategoryPage /> },
        { path: "admin/category/create", element: <CategoryCreatePage /> },
        { path: "admin/category/:id/edit", element: <CategoryEditPage /> },
        { path: "admin/article", element: <ArticlePage /> },
        { path: "admin/article/create", element: <ArticleCreatePage /> },
        { path: "admin/article/:id/edit", element: <ArticleEditPage /> },
        { path: "admin/quiz", element: <QuizPage /> },
        { path: "admin/quiz/create", element: <QuizCreatePage /> },
        { path: "admin/quiz/:id/edit", element: <QuizEditPage /> },
        { path: "admin/products", element: <ProductsPage /> },
        { path: "admin/blog", element: <BlogPage /> },
      ],
    },
    {
      path: "sign-in",
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
