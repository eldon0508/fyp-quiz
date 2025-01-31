import { Helmet } from "react-helmet-async";

import { AnswerEdit } from "src/sections/answer/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Answer - Edit</title>
      </Helmet>

      <AnswerEdit />
    </>
  );
}
