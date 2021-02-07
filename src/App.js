
import './App.scss';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Route, Switch } from 'react-router';
import HomePage from './components/pages/homepage';
import Profile from './components/pages/profile';
import SearchPage from './components/pages/searchpage';
import NewRequest from './components/pages/newrequest';
import RequestDetail from './components/pages/requestdetail';
import SearchMap from './components/pages/searchmap';
import MobileNav from './components/common/mobileNav';

function App() {

  const pages = [
    {route: '/map', page: <SearchMap />},
    {route: '/newRequest', page: <NewRequest />},
    {route: '/profile', page: <Profile />},
    {route: '/', page: <HomePage />},
    
  ]

  const renderPages = () => {
    return pages.map( p => <Route key={p.route} path={p.route}>{p.page}</Route>);
  }




  return (
    <div className="App">
      <div className="body">
        <Switch>
          <Route path={'/request/:id'} render={(props)=> <RequestDetail {...props}/>} />
          <Route path={'/search'} render={(props)=> <SearchPage {...props}/>} />
          {renderPages()}
        </Switch>
        <MobileNav />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
