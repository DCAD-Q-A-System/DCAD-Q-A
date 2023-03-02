import { useEffect, useState } from "react";
import { Dropdown, Navbar, Stack } from "react-bootstrap";
import { BiMenu } from "react-icons/bi";
import { MdMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type MenuProps={
    path:string,
    isOpen:boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Menu({path,isOpen,setIsOpen}:MenuProps){
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()

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
        <Navbar fixed="top" expand="lg">
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
            <Dropdown>
              <Dropdown.Item
                className="dropdown1"
                onClick={handleLogoutClick}
              >
                Logout
              </Dropdown.Item>
              <Dropdown.Item 
              onClick={()=>{
                setIsOpen(!isOpen)
                navigate(path)
                }} className="dropdown1">Return</Dropdown.Item>
            </Dropdown>
          )}
        </Stack>
      </Navbar>

    )
}