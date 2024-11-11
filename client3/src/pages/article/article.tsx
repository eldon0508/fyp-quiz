import { Helmet } from "react-helmet-async";

import { ArticleView } from "../../sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Articles</title>
      </Helmet>

      <ArticleView />
    </>
  );
}
