import React from 'react';

import { Search } from '../Search';

export const Header = () => (
  <header className="header">
    <img className="header-logo" src={require('../../assets/logo.png')} />
    <div style={{ marginLeft: 'auto' }}>
      <Search />
    </div>
  </header>
);
