import { Helmet } from "react-helmet-async";

import { ArticleEdit } from "src/sections/article/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Article - Edit</title>
      </Helmet>

      <ArticleEdit />
    </>
  );
}
