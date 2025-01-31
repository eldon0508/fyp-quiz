import { Helmet } from "react-helmet-async";

import { QuestionEdit } from "src/sections/question/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Question - Edit</title>
      </Helmet>

      <QuestionEdit />
    </>
  );
}
