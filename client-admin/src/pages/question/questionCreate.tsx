import { Helmet } from "react-helmet-async";

import { QuestionCreate } from "src/sections/question/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Question - Create</title>
      </Helmet>

      <QuestionCreate />
    </>
  );
}
