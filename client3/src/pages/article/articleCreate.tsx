import { Helmet } from "react-helmet-async";

import { ArticleCreate } from "../../sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Article - Create</title>
      </Helmet>

      <ArticleCreate />
    </>
  );
}
