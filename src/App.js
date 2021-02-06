
import './App.scss';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Route, Switch } from 'react-router';
import HomePage from './components/pages/homepage';
import Profile from './components/pages/profile';
import SearchPage from './components/pages/searchpage';
import NewRequest from './components/pages/newrequest';
import RequestDetail from './components/pages/requestdetail';
import MyRequest from './components/pages/myrequest';
import MobileNav from './components/common/mobileNav';

function App() {

  const pages = [
    {route: '/newRequest', page: <NewRequest />},
    {route: '/search', page: <SearchPage />},
    {route: '/profile', page: <Profile />},
    {route: '/', page: <HomePage />},
    
  ]

  const renderPages = () => {
    return pages.map( p => <Route key={p.route} path={p.route}>{p.page}</Route>);
  }




  return (
    <div className="App">
      <AmplifySignOut />
      <div className="body">
        <Switch>
          <Route path={'/request/:id'} render={(props)=> <RequestDetail {...props}/>} />
          <Route path={'/myrequest/:id'} render={(props)=> <MyRequest {...props}/>} />
          {renderPages()}
        </Switch>
        <MobileNav />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
