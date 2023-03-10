import { Navbar } from "react-bootstrap";

export function Logo(){
    return (<>
    <Navbar fixed="top" expand="lg" className="logo" >
    <img src="https://logos-download.com/wp-content/uploads/2020/06/Durham_University_Logo.png" className="logo-1"/>    {/* <img src="" className="logo-1"/> */}
    </Navbar>
  <Navbar fixed="top" expand='lg' className="welcome" >Welcome to the online Q&A system </Navbar>
  </>)
}