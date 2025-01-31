import { Helmet } from "react-helmet-async";

import { QuestionView } from "src/sections/question/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Questions</title>
      </Helmet>

      <QuestionView />
    </>
  );
}
