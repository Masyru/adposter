import React from "react";
import Loading from "./Loading";
import '../styles/Dashboard.css';
import '../styles/Card.css';
import '../styles/Modal.css'


class Info extends React.Component{
    constructor(props) {
        super(props);

        this.deleteOffer = this.deleteOffer.bind(this);
    }

    deleteOffer(id){
        let conf = confirm('Вы уверены, что хотите удалить данное объявление?')
        if (conf){
            fetch('/delete/?type=offer&id=' + id,
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
                        window.location.href = '/dashboard/';
                    });
            }).catch(function (error) {
                console.log('error: ', error);
            })
        }
    }


    render() {
        let info = this.props.data;

        let modal =
            <div className={`info-modal`}  onClick={this.props.onHide}>
                <div className="info-modal__dialog" onClick={event => event.stopPropagation()}>
                    <header>
                        <img src="/public/img/close1.svg" alt="Закрыть окно" onClick={this.props.onHide}/>
                    </header>
                    <main>
                        <div className="gallery">
                            {
                                info.photos.length ? info.photos.map((path, i) =>
                                         <div key={i} className="photo"
                                              style={{
                                                    backgroundImage: `url('/public/uploads/${path}')`,
                                                    backgroundPosition: 'center center',
                                                    backgroundSize: 'cover',
                                    }}/>) : null
                            }
                        </div>
                        <div className="offer">
                            {
                                info.amount ? <h6>Кол-во: {info.amount}</h6> : null
                            }
                            <h2>{info.title}</h2>

                            <p>{info.description}</p>
                            <br />
                            <span className="price">{info.price === 0 ? 'Договорная' : `${info.price} ₽`}</span>
                            <div className="offer-group-btn">
                                <button type={'button'} className={'sold-offer'} onClick={() => this.deleteOffer(info.id)}>Удалить/Закрыть предложение</button>
                            </div>
                        </div>
                    </main>
                    {/*<footer>*/}
                    {/*    {*/}
                    {/*        info.links.map((link, i) => <a key={i} href={link[1]}>{link[0]}</a>)*/}
                    {/*    }*/}
                    {/*</footer>*/}
                </div>
            </div>

        return(modal)
    }
}


class Card extends React.Component{
    render() {
        let card =
            <div className="courses-container">
                {
                    this.props.data.length ?
                        this.props.data.map((obj, i) =>
                            <div className="course" key={i} onClick={() => this.props.setInfo(obj)}>
                                <div className="course-preview" style={ obj.photos.length ? {
                                    backgroundImage: `url('/public/uploads/${obj.photos[0]}')`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                } : null }>
                                    <h6>Главное фото</h6>
                                    <a href="#">Посмотреть все <i className="fa fa-angle-right" aria-hidden="true"></i></a>
                                </div>
                                <div className="course-info">
                                    <h6>Кол-во: {obj.amount || 1}</h6>
                                    <h2>{obj.title}</h2>
                                    <p>
                                        {
                                            obj.description.split('\n')
                                                .map((text, j) =>
                                                    <>
                                                        {text}<br />
                                                    </>
                                                )
                                        }
                                    </p>
                                    <span className="price">{ obj.price ? 'Договорная' : `${obj.price} ₽`}</span>
                                </div>
                            </div>)
                            :
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontWeight: '500',
                                        fontSize: '14pt',
                                        color: '#BDBDBD',
                                    }}>Здесь еще нет объявлений, создайте их.</div>
                }
            </div>;

        return(card)
    }
}


export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.timerId = null;
        this.state = {
            data: [],
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.timerId = setInterval(this.fetchData, 60 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    fetchData(){
        const _this = this;
        fetch('/dashboard/?fetch=True',
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
                    if (data.length){
                        _this.setState({
                            data: data,
                        });
                    } else {
                        _this.setState({
                            data: [],
                        })
                    }
                });
        }).catch(function (error) {
            console.log('error: ', error);
        })
    }

    render() {
        return(
            <>
                <Loading>
                    <div className="create-offer-btn">
                    <a href="/offer"><i className="fa fa-plus-circle my-3" aria-hidden="true"></i> Создать объявление</a>
                    </div>
                    <Card data={this.state.data} setInfo={(data) => this.setState({showInfo: data})}/>
                    {
                        !this.state.showInfo || <Info data={this.state.showInfo} onHide={() => this.setState({showInfo: null})}/>
                    }
                </Loading>
            </>
        )
    }
}
