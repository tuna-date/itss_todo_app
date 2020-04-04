import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input, InputGroup,
  InputGroupAddon,
  InputGroupText,
  Nav,
  NavItem
} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import config from "../../views/Config/strings";
import Spinner from "reactstrap/es/Spinner";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.getCurrentUserInfo();
    let data = JSON.parse(localStorage.getItem("data"));
    let name = data.name;
    let avatar = data.avatar;
    this.setState({name: name, avatar: avatar})
  }

  getCurrentUserInfo() {
    let token = localStorage.getItem('token');
    let url = config.api_url + "/current_user";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token,
      },
      credentials: "same-origin"
    }).then(response => response.json()).then((responseJson) => {
      this.setState({data: responseJson.user, isLoaded: true});
    }, function (error) {
    })
  }


  render() {
    if (!this.state.isLoaded) {
      return <Spinner/>
    } else {
      // eslint-disable-next-line
      const {children, ...attributes} = this.props;

      let data = JSON.parse(localStorage.getItem("data"));

      return (
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile/>
          <AppNavbarBrand
            full={{src: logo, width: 300, height: 25, alt: 'CoreUI Logo'}}
            minimized={{src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo'}}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg"/>

          <Nav className="d-md-down-none" navbar>
            <NavItem className="px-3">
              <InputGroup>
                <Input type="email" id="input2-group1" name="input2-group1" placeholder="Tìm kiếm thông tin"/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar style={{marginRight: 20}}>
            {/*<NavItem className="d-md-down-none">*/}
            {/*  <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
            {/*</NavItem>*/}
            {/*<NavItem className="d-md-down-none">*/}
            {/*  <NavLink to="#" className="nav-link"><i className="icon-settings"></i></NavLink>*/}
            {/*</NavItem>*/}
            <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
                <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                {this.state.name} <i className="fa fa-chevron-down"></i>

              </DropdownToggle>
              <DropdownMenu right style={{right: 'auto'}}>
                {/*<DropdownItem header tag="div" className="text-center"><strong></strong></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge*/}
                {/*  color="success">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-comments"></i> Comments<Badge*/}
                {/*  color="warning">42</Badge></DropdownItem>*/}
                {/*<DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>*/}
                {/*<DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>*/}
                {/*<DropdownItem divider/>*/}
                {/*<DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
                <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </AppHeaderDropdown>
          </Nav>
          {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        </React.Fragment>
      );
    }
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
