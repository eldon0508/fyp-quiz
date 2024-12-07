import { Helmet } from "react-helmet-async";

import { SignInView } from "src/sections/auth";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Admin | Sign in</title>
      </Helmet>

      <SignInView />
    </>
  );
}
