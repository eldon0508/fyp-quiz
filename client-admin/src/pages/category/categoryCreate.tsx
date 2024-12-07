import { Helmet } from "react-helmet-async";

import { CategoryCreate } from "src/sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Category - Create</title>
      </Helmet>

      <CategoryCreate />
    </>
  );
}
