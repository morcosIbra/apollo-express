import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Launch from './launch';
import Launches from './launches';
import Cart from './cart';
import Profile from './profile';
import { Footer, PageContainer } from '../components';
import { useTranslation } from 'react-i18next';
import history from '../routing';

export default function Pages() {
  const { t } = useTranslation(['common']);
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment} history={history}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
          <Cart path="cart" />
          <Profile path="profile" />
        </Router>
      </PageContainer>
      <Footer />
    </Fragment>
  );
}
