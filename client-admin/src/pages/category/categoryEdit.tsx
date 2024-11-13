import { Helmet } from "react-helmet-async";

import { CategoryEdit } from "../../sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Category - Edit</title>
      </Helmet>

      <CategoryEdit />
    </>
  );
}
