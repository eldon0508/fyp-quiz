import { Helmet } from "react-helmet-async";

import { UserCreate } from "src/sections/user/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | User - Create</title>
      </Helmet>

      <UserCreate />
    </>
  );
}
