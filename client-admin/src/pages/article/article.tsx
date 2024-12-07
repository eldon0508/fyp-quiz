import { Helmet } from "react-helmet-async";

import { ArticleView } from "src/sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Articles</title>
      </Helmet>

      <ArticleView />
    </>
  );
}
