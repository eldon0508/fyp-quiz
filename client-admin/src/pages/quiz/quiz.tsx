import { Helmet } from "react-helmet-async";

import { QuizView } from "src/sections/quiz/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Quizzes</title>
      </Helmet>

      <QuizView />
    </>
  );
}
