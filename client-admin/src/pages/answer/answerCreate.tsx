import { Helmet } from "react-helmet-async";

import { AnswerCreate } from "src/sections/answer/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Answer - Create</title>
      </Helmet>

      <AnswerCreate />
    </>
  );
}
