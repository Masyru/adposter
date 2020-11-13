import React from "react";
import { MobileScreenOn, setHideBodyOverflow } from "./Utils";

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export class Burger extends React.Component {

    render(){
        let burger =
            <div className='burger-nav'>
                <header>
                    <button onClick={() => this.props.onHide()}><i className="fa fa-long-arrow-left" aria-hidden="true"></i> Назад</button>
                </header>
                <main>
                    <a href="/dashboard">Главная</a>
                    <a href="/library">Библиотека</a>
                </main>
            </div>;

        return(burger);
    }
}

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showBurger: false,
        }
    }

    exit(){
        fetch('/logout',
       {
                method: 'GET',
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            })
            .then(
                function(response) {
                // Define fetch errors
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                if(response.status === 500){
                    console.log("Status: 500");
                    return;
                }
                // Un-jsonify data
                response.json().then(
                    function(data) {
                        // Doing something with response
                        if(data){
                            window.location.href = '/';
                        }
                    });
            }).catch(function (error) {
                console.log('error: ', error);
            })
    }

    render() {

        console.log(MobileScreenOn());

        let navbar = MobileScreenOn() ?
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li>
                        <a onClick={() => this.setState({ showBurger: true })} style={{ fontSize: '16px' }}>
                            <i className="zmdi zmdi-view-headline"></i>
                        </a>
                    </li>
                    <li style={{marginLeft: 'auto'}}><a onClick={this.exit}>Выйти</a></li>
                </ul>
                {
                    this.state.showBurger ? <Burger onHide={() => this.setState({ showBurger: false })}/> : null
                }
            </div>
            :
            <div className="container-fluid">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href={''} onClick={this.exit}>Выйти</a></li>
                </ul>
            </div>;

        return(
            navbar
        )
    }
}
