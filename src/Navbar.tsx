import React from "react";
import "./_Navbar.scss";

export const Navbar = (): React.ReactElement => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a>

            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        About
                    </a>

                    <a className="navbar-item">
                        Events
                    </a>

                    <a className="navbar-item">
                        Media
                    </a>

                    <a className="navbar-item">
                        Contact
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button">
                                instagram <i className="fas fa-home"></i>
                            </a>
                           <a className="button">
                                facebook
                            </a>
                            <a className="button">
                                mail
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}