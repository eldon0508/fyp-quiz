import { Helmet } from "react-helmet-async";

import { QuizEdit } from "src/sections/quiz/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Quiz - Edit</title>
      </Helmet>

      <QuizEdit />
    </>
  );
}
