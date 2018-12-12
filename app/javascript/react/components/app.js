import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import AudioContainer from '../containers/AudioContainer';
import MixForm from './MixForm';
import VibeForm from './VibeForm';
import IndexPageContainer from '../containers/IndexPageContainer'

const App = (props) => {
  return (
    <div>
      <Router history={browserHistory}>
        <Route path="/vibes" component={IndexPageContainer} />
        <Route path='/vibes/new' component={VibeForm} />
        <Route path='/vibes/:id' component={AudioContainer} />
        <Route path='/vibes/:id/mixes/new' component={MixForm} />
      </Router>
    </div>
  );
}

export default App;
