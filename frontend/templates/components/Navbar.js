import React from "react";

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

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.deleteCookie = this.deleteCookie.bind(this);
    }

    deleteCookie(){
        setCookie('token', "", {
            'max-age': -1
        })
    }

    exit(){
        const _this = this;
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
                        _this.deleteCookie();
                        window.location.href = '/';
                    });
            }).catch(function (error) {
                console.log('error: ', error);
            })
    }

    render() {
        return(
            <div className="container-fluid">
                <ul className="nav navbar-nav navbar-right">
                    {/*<li>*/}
                    {/*    <a href="#"><i className="zmdi zmdi-notifications"></i>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li><a href="/">Выйти</a></li>
                </ul>
            </div>
        )
    }
}
