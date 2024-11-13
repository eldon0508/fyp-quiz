import { Helmet } from "react-helmet-async";

import { CategoryView } from "../../sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Categories</title>
      </Helmet>

      <CategoryView />
    </>
  );
}
