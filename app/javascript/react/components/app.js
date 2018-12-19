import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import MixForm from './MixForm';
import VibeForm from './VibeForm';
import IndexPageContainer from '../containers/IndexPageContainer'
import VibeShowPageContainer from '../containers/VibeShowPageContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path='/' >
          <IndexRoute component={IndexPageContainer} />
          <Route path='vibes/new' component={VibeForm} />
          <Route path='vibes/:id' component={VibeShowPageContainer} />
          <Route path='vibes/:id/mixes/new' component={MixForm} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
