import React from "react";

export default class Navbar extends React.Component{
    render() {
        return(
            <div className="container-fluid">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <a href="#"><i className="zmdi zmdi-notifications"></i>
                        </a>
                    </li>
                    <li><a href="/">Выйти</a></li>
                </ul>
            </div>
        )
    }
}
