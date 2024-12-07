import { Helmet } from "react-helmet-async";

import { CategoryEdit } from "src/sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Category - Edit</title>
      </Helmet>

      <CategoryEdit />
    </>
  );
}
