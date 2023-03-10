import "./Home.css";
import { AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { BsClockFill } from "react-icons/bs";
import { useAppSelector } from "../store/hooks";
import { USER_TYPE } from "../utils/enums";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown, Navbar, Stack, Row, Col, Container } from "react-bootstrap";
import { BiMenu } from "react-icons/bi";
import { MdMenuOpen } from "react-icons/md";

export function Home() {
  const loginData = useAppSelector((state) => state.loginReducer.data);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const hideMenu = () => {
      setShowMenu(false);
    };
    if (showMenu) {
      document.addEventListener("click", hideMenu);
    }
    return () => {
      document.removeEventListener("click", hideMenu);
    };
  }, [showMenu]);

  const handleMenuClick = (event: any) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
    setIsOpen(!isOpen);
  };
  const handleLogoutClick = () => {
    // handle logout logic
    setIsOpen(!isOpen);
    navigate("/logout");
  };

  return (
    <>
      {loginData && loginData.type !== USER_TYPE.GUEST ? (
        <div
          onClick={() => {
            isOpen == false ? setIsOpen(!isOpen) : "";
          }}
        >
          <Navbar.Brand className="home-title fs-1 fs-md-2 text-wrap text-white">{loginData.username} is logged in</Navbar.Brand>
          <Navbar fixed="top" expand="lg" className="home-nav">
            <Stack>
              {isOpen ? (
                <BiMenu
                  type="button"
                  className="menu"
                  onClick={handleMenuClick}
                />
              ) : (
                <MdMenuOpen
                  type="button"
                  className="menu"
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}{" "}
              {showMenu && (
                <Dropdown className="home-dropdown">
                  <Dropdown.Item
                    className="dropdown1"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Dropdown.Item>
                  {/* <Dropdown.Item onClick={()=>{setIsOpen(!isOpen)}} className="dropdown2">Return</Dropdown.Item> */}
                </Dropdown>
              )}
            </Stack>
          </Navbar>{" "}
          <Container fluid className="home-icons">
            <Row xs={1} md={loginData?.type === USER_TYPE.PANELLIST ? 2 : 3} className="g-4">
              <Col>
                <Container className="Containers-1" onClick={() => { navigate("/meeting-list"); }}>
                  <BsClockFill className="icon-1" />
                  <div className="words ">Current Meeting</div>
                </Container>
              </Col>
              {loginData?.type !== USER_TYPE.STUDENT && (
                <Col>
                  <Container className="Containers-1" onClick={() => { navigate("/create-meeting"); }}>
                    <AiOutlinePlus className="icon-1" />
                    <div className="words">Creating Meeting</div>
                  </Container>
                </Col>
              )}
              {loginData?.type === USER_TYPE.ADMIN && (
                <Col>
                  <Container className="Containers-1" onClick={() => { navigate("/users-home"); }}>
                    <AiFillEdit className="icon-1" />
                    <div className="word-2">Users</div>
                  </Container>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      ) : (
        <p>not available</p>
      )}
    </>
  );
}
