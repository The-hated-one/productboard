import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Loader } from 'components/Loader';
import { showError } from 'components/Notification';
// import { Board } from 'pages/Board';
// import { CreateProject } from 'pages/CreateProject';
// import { CreateTask } from 'pages/CreateTask';
// import { EditProfile } from 'pages/EditProfile';
// import { Landing } from 'pages/Landing';
// import { Projects } from 'pages/Projects';
// import { Tasks } from 'pages/Tasks';
// import { TestProfile } from 'pages/TestProfile';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthenticatedRoutes } from 'routes/AuthenticatedRoutes';
import { UnauthenticatedRoutes } from 'routes/Unauthenticated';
import { baseURL, endpoints } from 'shared/urls';
import { setUserProfile } from 'store/actions/userActions';
interface Props {

}

export const Routes: React.FC<Props> = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { user: userAith0, isAuthenticated, getAccessTokenSilently, user, isLoading } = useAuth0();
  // const [user, setUser] = useState();
  const [appLoading, setAppLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    if (isAuthenticated && !(location.pathname === '/edit-profile')) {
      // if ((user && !(location.pathname === '/edit-profile') || !isLoading)) {
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          const { data } = await axios({
            url: `${baseURL}${endpoints.profile}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const username = data?.user?.username;
          const firstName = data?.user?.firstName;
          const lastName = data?.user?.lastName;
          if (!username || !firstName || !lastName) {
            history.push('/create-profile');
            setAppLoading(false);
          } else {
            dispatch(setUserProfile(data.user));
            setAuthenticated(true);
            setAppLoading(false);
            // setUser(data.user);
          }
        } catch (e) {
          if (!(location.pathname === '/')) {
            showError('Could not fetch your profile. Please try again sometime later.', 'Profile Error');
          }
        } finally {
          setAppLoading(false);
        }
      })();
    }
    // else {
    //   setAppLoading(false);
    // }
  }, [userAith0, getAccessTokenSilently, isAuthenticated, location.pathname, history, dispatch, appLoading, user, isLoading]);

  // if (appLoading || isLoading) return <Loader fullScreen />;
  if (isLoading) return <Loader fullScreen />;

  return (
    <>
      {authenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes setAuthenticated={setAuthenticated} />}
      {/* <Route path='/' exact component={Landing} />
      <PrivateRoute condition={(!!user && !authenticated)} path='/edit-profile' redirectRoute='/' component={(props: any) => <EditProfile setAuthenticated={setAuthenticated} {...props} />} />
      <PrivateRoute condition={authenticated} path='/projects' redirectRoute='/' component={Projects} />
      <PrivateRoute condition={authenticated} path='/create-project' redirectRoute='/' component={CreateProject} />
      <PrivateRoute condition={authenticated} path='/projects/:id/tasks' redirectRoute='/' component={Tasks} />
      <PrivateRoute condition={authenticated} path='/board' redirectRoute='/' component={Board} />
      <PrivateRoute condition={authenticated} path='/create-task' redirectRoute='/' component={CreateTask} />
      <PrivateRoute condition={authenticated} path='/profile' redirectRoute='/' component={TestProfile} /> */}
    </>
  );
};
