import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import config from "../../views/Config/strings";
import './disabled.css';
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault();
    this.props.history.push('login');
    // this.window.location.href('/login');
    //
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('data');
  }

  checkLogin() {
    let token = localStorage.getItem('token');
    //chưa có token
    // console.log(localStorage.token);
    if (token === null) {
      this.props.history.push('/login');
    }

    //đã có token, kiểm tra xem token có hợp lệ không
    let url = config.api_url + "/current_user/";
    let status = false;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      status = true;
      if(responseJson.errors != null){
        this.props.history.push('/login');
      }
      // console.log(responseJson);
    }, (error) => {
      this.props.history.push('/login');
      //không xác thực được người dùng
    });

    return status;
  }

  componentDidMount() {
    // let loginToken = localStorage.getItem('token');
    this.checkLogin();
  }
  render() {

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )}/>
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside/>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
