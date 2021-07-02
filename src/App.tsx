// React Imports
import React from 'react';
// 3rd Party Imports
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
// Material UI Imports
// Local Imports
import Header from './componets/common/Header'
import Footer from './componets/common/Footer'
import Homepage from './Pages/Homepage'
import RoomPage from './Pages/RoomPage'
import BookingPage from './Pages/BookingPage'
import SignInPage from './Pages/SignInPage'
import CheckinOut from './Pages/CheckinOut'
import Profile from './Pages/Profile'
import BoBookingsPage from './Pages/backoffice/BookingsPage'
import BoUserList from './Pages/backoffice/UserListPage'
import BoUserDetail from './Pages/backoffice/UserDetailPage'

function App() {

  const queryClient = new QueryClient()

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
            <Switch>            
              <Route exact path='/' component={ Homepage } />
              <Route exact path='/login' component={ SignInPage }/>
              <Route exact path='/profile' component={ Profile }/>
              <Route exact path='/checkinout' component={ CheckinOut }/>
              <Route exact path='/backoffice/bookings' component={ BoBookingsPage } />
              <Route exact path='/backoffice/users' component={ BoUserList } />
              <Route exact path='/backoffice/users/:id' component={ BoUserDetail } />
              <Route exact path='/:activity' component={ Homepage }/>
              <Route exact path='/:activity/:room' component={ RoomPage }/>
              <Route exact path='/:activity/:room/booking' component={ BookingPage }/>            
            </Switch>          
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
