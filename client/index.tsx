import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { FileManager } from './components/FileManager';
import './styles/base.scss';

interface Props {
    children: React.ReactNode;
}

let App = ( props: Props ) => {
  const { children } = props;
  return (
    <div>
      { children }
    </div>
  );
};

if (module.hot) {
  App = hot(module)(App);
}

render(
  <App>
    <FileManager />
  </App>,
  document.getElementById('root'),
);