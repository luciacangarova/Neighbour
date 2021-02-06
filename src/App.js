
import './App.scss';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Route, Switch } from 'react-router';
import HomePage from './components/pages/homepage';
import Profile from './components/pages/profile';
import SearchPage from './components/pages/searchpage';
import MobileNav from './components/common/mobileNav';
function App() {

  const pages = [
    {route: '/search', page: <SearchPage />},
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
        <MobileNav />
      </div>
    </div>
  );
}

export default App; 

// export default withAuthenticator(App);
