'use client'

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import SimpleReactLightbox from "simple-react-lightbox";
import { store } from '../redux/store';

type Props = {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <SimpleReactLightbox>
        {children}
      </SimpleReactLightbox>
    </Provider>
  )
}

export default Providers