import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CategoryEdit } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Categories - ${CONFIG.appName}`}</title>
      </Helmet>

      <CategoryEdit />
    </>
  );
}
