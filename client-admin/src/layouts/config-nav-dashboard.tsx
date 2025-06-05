import { Label } from "src/components/label";
import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />;

export const navData = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: icon("ic-analytics"),
  },
  {
    title: "Categories",
    path: "/admin/category",
    icon: icon("ic-category"),
  },
  {
    title: "Articles",
    path: "/admin/article",
    icon: icon("ic-article"),
  },
  {
    title: "Quizzes",
    path: "/admin/quiz",
    icon: icon("ic-quiz"),
  },
  {
    title: "Questions",
    path: "/admin/question",
    icon: icon("ic-question"),
  },
  {
    title: "Users",
    path: "/admin/user",
    icon: icon("ic-user"),
  },
  {
    title: "Feedbacks",
    path: "/admin/feedback",
    icon: icon("ic-feedback"),
  },
  // {
  //   title: "Sign in",
  //   path: "/admin/signin",
  //   icon: icon("ic-lock"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic-disabled"),
  // },
];
