import React from "react";

export function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}

export default class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cookie: null,
            loading: true,
        };

        this.getCookie = this.getCookie.bind(this);
        this.sendCookieToServer = this.sendCookieToServer.bind(this);
    }

    componentDidMount() {
        const cookie = this.getCookie('token');
        sleep(2000);
        if (cookie !== '' && cookie !== null && cookie !== undefined) {
            this.sendCookieToServer(cookie);
        }
    }



    sendCookieToServer(param){
        const _this = this;
        fetch('/check_cookie/' + param,
   {
            method: 'get',
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
            }
            if(response.status === 500){
                console.log("Status: 500");
                return;
            }
            // Un-jsonify data
            response.json().then(
                function(data) {
                    // Doing something with response
                    if (data){
                        _this.setState({
                            loading: false,
                        });
                    } else {
                        window.location.href = '/';
                    }
                });

        }).catch(function (error) {
                console.log('error: ', error);
        })

    }


    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined
    }


    render() {
        let loading =
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999',
                position: 'absolute',
                top: '0',
                left: '0',
                background: '#fff',
                color: '#0d0d0d',
            }}>
                Загрузка...
            </div>;

        return(this.state.loading ? loading : this.props.children)
    }
}