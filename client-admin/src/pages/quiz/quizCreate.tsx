import { Helmet } from "react-helmet-async";

import { QuizCreate } from "src/sections/quiz/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Quiz - Create</title>
      </Helmet>

      <QuizCreate />
    </>
  );
}
