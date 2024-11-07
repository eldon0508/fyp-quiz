import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CategoryCreate } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Categories - ${CONFIG.appName}`}</title>
      </Helmet>

      <CategoryCreate />
    </>
  );
}
