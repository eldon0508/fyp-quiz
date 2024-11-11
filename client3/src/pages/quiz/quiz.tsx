import { Helmet } from "react-helmet-async";

import { QuizView } from "src/sections/quiz/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Quizzes</title>
      </Helmet>

      <QuizView />
    </>
  );
}
