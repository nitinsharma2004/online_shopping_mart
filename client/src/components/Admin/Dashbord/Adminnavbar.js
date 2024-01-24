// VerticalNavbar.js
import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../../context/logincontext';

const Adminnavbar = () => {
  const history = useNavigate();
  const [usertype, setusertype] = useLoginContext();

  const handleLogout = async () => {
    setusertype({
      ...usertype,
      user: null,
      token: '',
    });
    localStorage.removeItem("usertype");
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 201) {
        history('/login');
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
    <Sidebar>
      <VerticalNavbarContainer>
        <StyledNavLink to="/Admin/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/Admin/cartdetail">Order Product</StyledNavLink>
        <StyledNavLink to="/Admin/history">Order History</StyledNavLink>
        <Stylednavlink  onClick={handleLogout}>Logout</Stylednavlink>
      </VerticalNavbarContainer>
      </Sidebar>

    </>
  );
};

const VerticalNavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  height:100vh;
`;

const Sidebar = styled.div`
width: 250px;
background-color:#2c2d2d;
color: #ecf0f1;
padding: 20px;
`;
const Stylednavlink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  font-size: 18px;
  &:hover {
    background-color: #00fff1;
  }
`;
const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  font-size: 18px;

  &:hover {
    background-color: #00fff1;
  }

  &.active {
    background-color: #ff7800; 
  }
`;

export default Adminnavbar;
