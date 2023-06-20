import { Link, NavLink } from "react-router-dom"
import classNames from "classnames"
import { Container, Nav, Navbar } from "react-bootstrap"

export function Header() {
   return (
      <Navbar className="shadow" bg="light" variant="light" sticky="top">
         <Container>
            <Navbar.Brand as={Link} to="/">
               Conduit
            </Navbar.Brand>

            <Navbar.Collapse>
               <Nav className="ms-auto">
                  {[
                     ["Home", "/", true],
                     ["Sign in", "/login"],
                     ["Sign up", "/register"]
                  ].map(([text, path, end]: any, index) => (
                     <Nav.Link key={index} as={NavLink} to={path} end={end}>
                        {text}
                     </Nav.Link>
                  ))}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}
