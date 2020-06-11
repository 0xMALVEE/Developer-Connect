import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,UncontrolledDropdown,DropdownToggle,DropdownItem,DropdownMenu
} from 'reactstrap';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { toggleModal } from "../actions/navModalAction";

class AppNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      user: null
    };
  }
 

  componentDidMount(){
    
    
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

 

  render() {
    

    const { isAuthenticated, user } = this.props.auth;
   

    const authLinks = (
      <Fragment>



          {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavItem>
                    <span className='navbar-text mr-3'>
                      <strong>{user ? `User: ${user.name}` : ''}</strong>
                    </span>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
          <Link className="nav-link" to="/create_post">Create Post</Link>
        </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
          <Logout />
        </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}

      <li class="nav-item">
        <Link id="write-a-post" style={{background:"#26d9ca",color:"black",borderRadius:"3px"}} className="nav-link" to="/create_post"><strong>Write A post</strong></Link>
      </li>

      <li class="nav-item">
        <Link id="write-a-post" className="nav-link" to="/connect_dev"><strong>ConnectDev</strong></Link>
      </li>


<li class="nav-item dropdown text-left">
        <a class="account-btn-nav nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Account
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to={user ?`/user/${user.username}` : ""}>
            <NavItem>
            <span className='navbar-text mr-3' style={{color:"white"}}>
              <strong>{user ? `${user.name}` : ''}</strong>
            </span>
            </NavItem>

            <NavItem>
            <span className='navbar-text mr-3'>
              <strong>{user ? `@${user.username}` : ''}</strong>
            </span>

          </NavItem>

       
          </Link>

          

          <div class="dropdown-divider"></div>

          <a class="dropdown-item" href="#">
          <NavItem>
           <Link className="nav-link" to="/create_post">Create Article</Link>
          </NavItem>
          </a>

          <a class="dropdown-item" href="#">
            <NavItem>
            <Link className="nav-link" to="/myarticls">My Articles</Link>
            </NavItem>
          </a>

          <a class="dropdown-item" href="#">
            <NavItem>
              <Link className="nav-link" to={user ? `/complete_profile/${user.username}`: ""}>Complete Profile</Link>
            </NavItem>
          </a>

          <a class="dropdown-item" href="#">
          <NavItem>
            <Logout />
          </NavItem>
          </a>


        </div>
      </li>

      <li class="nav-item">
        <img style={{borderRadius:"50px"}} height="45" width="45" src={user ? `${user.github_profile_img}` : ''}></img>
      </li>




        {/* <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `User: ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        
        <NavItem>
          <Link className="nav-link" to="/create_post">Create Post</Link>
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem> */}



      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal isOpen={this.props.modal.isOpen} toggleIsOpen={this.toggleIsOpen}/>
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5 fixed-top'>
          <Container>
            <NavbarBrand href='/'> <Link to="/" className="dev-brand">Devconnec</Link></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  modal: state.modal
});

export default connect(
  mapStateToProps,
  { toggleModal }
)(AppNavbar);
