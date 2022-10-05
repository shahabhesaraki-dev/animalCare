import styled from "styled-components";
import {
  FiHome,
  FiBookmark,
  FiMessageSquare,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const respond = await fetch(`/api/getUser/${userId}`);
        const result = await respond.json();
        setUserData(result.data);
      };
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  const logOutHandler = () => {
    window.localStorage.removeItem("userId");
    history.push("/");
    window.location.reload();
  };

  return (
    <Wrapper>
      <nav>
        <ul>
          <Li>
            <StyledNavlink to="/home">
              <StyledFiHome size={30} />
              Home
            </StyledNavlink>
          </Li>
          <Li>
            <StyledNavlink to="/bookmarks">
              <StyledFiBookmark size={30} />
              Bookmarks
            </StyledNavlink>
          </Li>
          <Li>
            <StyledNavlink to="/messages">
              <StyledFiMessageSquare size={30} />
              Messages
            </StyledNavlink>
          </Li>
          <Li>
            <StyledNavlink to="/profile">
              <StyledFiUser size={30} />
              Profile
            </StyledNavlink>
          </Li>
          <Li>
            <LogoutBox onClick={logOutHandler}>
              <FiLogOut size={25} style={{ position: "relative" }} />
              <Logout>LogOut({userData ? userData.firstName : null})</Logout>
            </LogoutBox>
          </Li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30%;
`;

const Li = styled.li`
  text-decoration: none;
  padding: 10px 20px;
  margin-bottom: 2px;
`;

const StyledFiHome = styled(FiHome)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiBookmark = styled(FiBookmark)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiMessageSquare = styled(FiMessageSquare)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledFiUser = styled(FiUser)`
  margin-right: 20px;
  position: relative;
  top: 7px;
`;

const StyledNavlink = styled(NavLink)`
  font-family: "Abel";
  font-size: 22px;
  text-decoration: none;
  color: black;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &.active {
    font-weight: bold;
  }
  &:hover {
    background-color: #f0f0f0;
  }
`;

const LogoutBox = styled.div`
  padding: 10px;
  border-radius: 10px;
  width: 50%;
  margin-bottom: 20px;
  position: relative;
  left: 4px;
  cursor: pointer;
`;

const Logout = styled.p`
  font-family: "Abel";
  font-size: 22px;
  position: absolute;
  left: 46px;
  right: 0;
  top: 10px;
  bottom: 0;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: darkred;
  }
`;

export default Header;
