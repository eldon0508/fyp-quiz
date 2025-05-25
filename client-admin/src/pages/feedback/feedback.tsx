import { Helmet } from "react-helmet-async";

import { FeedbackView } from "src/sections/feedback/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Feedbacks</title>
      </Helmet>

      <FeedbackView />
    </>
  );
}
