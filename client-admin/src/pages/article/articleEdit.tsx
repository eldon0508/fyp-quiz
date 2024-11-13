import { Helmet } from "react-helmet-async";

import { ArticleEdit } from "../../sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Article - Edit</title>
      </Helmet>

      <ArticleEdit />
    </>
  );
}
