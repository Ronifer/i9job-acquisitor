import React, {useContext} from 'react';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import AuthContext from '../contexts/auth';

const Routes = () => {
  const {signed} = useContext(AuthContext);
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
