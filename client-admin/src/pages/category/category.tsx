import { Helmet } from "react-helmet-async";

import { CategoryView } from "src/sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Categories</title>
      </Helmet>

      <CategoryView />
    </>
  );
}
