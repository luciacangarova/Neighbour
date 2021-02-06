
import './App.scss';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Route, Switch } from 'react-router';
import HomePage from './components/pages/homepage';
import Profile from './components/pages/profile';
function App() {

  const pages = [
    {route: '/profile', page: <Profile />},
    {route: '/', page: <HomePage />},
    
  ]

  const renderPages = () => {
    return pages.map( p => <Route key={p.route} path={p.route}>{p.page}</Route>);
  }




  return (
    <div className="App">
      {/* <AmplifySignOut /> */}
      <div className="body">
        <Switch>
          {renderPages()}
        </Switch>
      </div>
    </div>
  );
}

export default App; 

// export default withAuthenticator(App);
