import { Helmet } from "react-helmet-async";

import { AnswerView } from "src/sections/answer/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Answers</title>
      </Helmet>

      <AnswerView />
    </>
  );
}
