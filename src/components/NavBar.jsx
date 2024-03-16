import React from "react";
import { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import '../styles/NavBar.css'
import logo from '../assets/img/pixel_-cat.svg';

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">Home</Link>
      <img src={logo} alt="Logo" />
      <ul>
        <CustomLink to="/grid">Grid</CustomLink>
        <CustomLink to="/credits">Credits</CustomLink>
      </ul>
    </nav>

  )
}