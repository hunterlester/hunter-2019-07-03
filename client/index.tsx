import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';

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
    <p>Initial view 5</p>
  </App>,
  document.getElementById('root'),
);