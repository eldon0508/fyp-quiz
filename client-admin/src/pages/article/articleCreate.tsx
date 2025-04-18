import { Helmet } from "react-helmet-async";

import { ArticleCreate } from "src/sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Article - Create</title>
      </Helmet>

      <ArticleCreate />
    </>
  );
}
