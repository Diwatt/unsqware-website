import React from "react";
import { NavLink } from "react-router-dom";
import "./_Navbar.scss";

export const Navbar = (): React.ReactElement => {
    const isActiveCallback = ({ isActive }) => isActive ? "navbar-item active" : "navbar-item"

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a>

            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to="/about" className={isActiveCallback}>
                        About
                    </NavLink>

                    <NavLink to="/gigs" className={isActiveCallback}>
                        Gigs / Concerts
                    </NavLink>

                    <NavLink to="/media" className={isActiveCallback}>
                        Media
                    </NavLink>


                    <NavLink to="/contact" className={isActiveCallback}>
                    Contact
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="https://www.youtube.com/@unsqware" className="button is-danger is-light">
                                <span className="icon has-text-danger">
                                    <i className="fa fa-lg fa-youtube"></i>
                                </span>
                            </a>
                            <a href="https://www.instagram.com/unsqware" className="button is-link is-light">
                                <span className="icon has-text-dark">
                                    <i className="fa fa-lg fa-instagram"></i>
                                </span>
                            </a>
                           <a href="https://www.facebook.com/unsqwaremusique" className="button is-info is-light">
                                <span className="icon has-text-link">
                                    <i className="fa fa-lg fa-facebook"></i>
                                </span>
                            </a>
                            <a href="mailto: unsqwaremusique@gmail.com" className="button is-link is-light">
                                <span className="icon has-text-dark">
                                    <i className="fa fa-lg fa-paper-plane"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}