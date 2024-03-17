import React from "react";
import { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/NavBar.css";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default function NavBar() {
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (window.scrollY > 50) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   }

  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [])

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/game">Game</CustomLink>
        <CustomLink to="/credits">Credits</CustomLink>
      </ul>
    </nav>

    // <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="ms-auto site-title">
    //       <CustomLink to="/">Home</CustomLink>
    //       <CustomLink to="/grid">Grid</CustomLink>
    //       <CustomLink to="/credits">Credits</CustomLink>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}
