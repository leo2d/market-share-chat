import React from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';

import { HeaderContainer, HeaderContent, SignOutContainer } from './styles';
import Auth from '../../utils/auth';
import Api from '../../services/api';

const Header = () => {
  const history = useHistory();

  const hideHeader = _ => {
    const { pathname } = history.location;

    return pathname === '/' || pathname === '/login';
  };

  if (hideHeader()) return <></>;

  const handleSignOut = async _ => {
    console.log('siging out...');

    const { user } = Auth.getUserData();
    const response = await Api.patch(`/auth/sign_out?userId=${user.id}`).catch(
      error => {
        console.log('Error: ', error);
        return;
      }
    );

    if (response && response.status === 204) {
      Auth.signOut();
      window.location.reload();
    }
  };

  return (
    <HeaderContainer>
      <Navbar style={{ backgroundColor: '#09242B' }} variant="dark">
        <Navbar.Collapse>
          <Container>
            <HeaderContent>
              <Nav className="mr-auto">
                {/* <Nav.Link>Rooms</Nav.Link>
                <Nav.Link>Chat</Nav.Link> */}
              </Nav>
              <SignOutContainer>
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => {
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
              </SignOutContainer>
            </HeaderContent>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
