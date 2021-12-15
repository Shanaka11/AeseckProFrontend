// React Imports
import React from 'react';
// 3rd Party Imports
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Material UI Imports
// Local Imports
import Header from './componets/common/Header'
import Footer from './componets/common/Footer'
import Homepage from './Pages/Homepage'
import BookingPage from './Pages/BookingPage'
import SignInPage from './Pages/SignInPage'
import CheckinOut from './Pages/CheckinOut'
import Profile from './Pages/Profile'
import BoBookingsPage from './Pages/backoffice/BookingsPage'
import BoUserList from './Pages/backoffice/UserListPage'
import BoUserDetail from './Pages/backoffice/UserDetailPage'
import BoDashboard from './Pages/backoffice/Dashboard'
import AboutUsPage from './Pages/AboutUsPage';
// Context
import { UserContextProvider } from './context/userContext'
import { OrgContextProvider } from './context/orgContext'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:false,
        refetchOnMount:false,
        refetchOnReconnect:false,
        staleTime: 20 * 60 * 1000
      },
    }
  })

  return (
    <div>
      <OrgContextProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false}/> */}
            <BrowserRouter>
              <UserContextProvider>
                <Header />
                  <Switch>            
                    <Route exact path='/' component={ Homepage } />
                    <Route exact path='/login' component={ SignInPage }/>
                    <Route exact path='/profile' component={ Profile }/>
                    <Route exact path='/checkinout' component={ CheckinOut }/>
                    <Route exact path='/backoffice' component={ BoDashboard } />
                    <Route exact path='/backoffice/bookings' component={ BoBookingsPage } />
                    <Route exact path='/backoffice/users' component={ BoUserList } />
                    <Route exact path='/backoffice/users/:id' component={ BoUserDetail } />
                    <Route exact path='/aboutus' component={AboutUsPage} />
                    <Route exact path='/:activity' component={ Homepage }/>
                    {/* <Route exact path='/:activity/:room' component={ RoomPage }/> */}
                    <Route exact path='/:activity/booking' component={ BookingPage }/>            
                  </Switch>          
                <Footer />
              </UserContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
      </OrgContextProvider>
    </div>
  );
}

export default App;
