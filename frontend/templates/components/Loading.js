import React from "react";

export default class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cookie: null
        };

        this.getCookie = this.getCookie.bind(this);
        this.sendCookieToServer = this.sendCookieToServer.bind(this);
    }

    componentDidMount() {
        this.getCookie('cookie');
        if(this.state.cookie !== ''){
            this.sendCookieToServer();
        }
    }


    sendCookieToServer(){
        let cookie = this.state.cookie;
        fetch('/check_cookie/' + cookie,
       {
                method: 'get',
                headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
        })
        .then(
        function(response) {
            // Define fetch errors
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
            }
            if(response.status === 500){
                console.log("Status: 500");
                return;
            }
            // Un-jsonify data
            response.json().then(
                function(data) {
                    // Doing something with response
                    console.log(data);

                });

        }).catch(function (error) {
                console.log('error: ', error);
        })
    }


    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        let res =  matches ? decodeURIComponent(matches[1]) : undefined;
        if(res === undefined){
            this.setState({cookie: ''})
        } else {
            this.setState({cookie: res})
        }
    }


    render() {
        return(this.props.children)
    }
}