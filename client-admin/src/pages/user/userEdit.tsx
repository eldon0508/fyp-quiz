import { Helmet } from "react-helmet-async";

import { UserEdit } from "src/sections/user/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | User - Edit</title>
      </Helmet>

      <UserEdit />
    </>
  );
}
