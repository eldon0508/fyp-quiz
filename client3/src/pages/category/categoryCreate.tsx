import { Helmet } from "react-helmet-async";

import { CategoryCreate } from "../../sections/category/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Category - Create</title>
      </Helmet>

      <CategoryCreate />
    </>
  );
}
