import React from "react";
import '../styles/Modal.css';
import '../styles/Offer.css';
import { Row } from 'react-bootstrap';
import { setHideBodyOverflow } from "./Utils";

class Cards extends React.Component{
    render() {
        const props = this.props;

        return (
            <div className='chooser-block'>
                <Row>
                    {
                        props.data.map((obj, i) =>
                            <div
                                key={i}
                                className="photo-block"
                                style={{
                                    backgroundColor: '#eaeaea',
                                    backgroundImage: `url('/public/uploads/${obj}')`,
                                    backgroundSize: 'cover cover',
                                    backgroundPosition: 'center center',
                                }}
                                onClick={() => props.countCard(obj)}>
                                {
                                    props.chosen_img.includes(obj) ?
                                        <img src="/public/img/check.svg" alt="Выбран"/>
                                        :
                                        <img src="/public/img/circle-shape.svg" alt="Не выбран"/>
                                }
                            </div>
                        )
                    }
                </Row>
            </div>
        )
    }
}


export default class PhotoChooser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            chosen: [],
            photos: null,
        };

        this.amountPhoto = 15

        this.fetchPhotos = this.fetchPhotos.bind(this);
        this.countCard = this.countCard.bind(this);
    }

    componentDidMount() {
        this.fetchPhotos();
        setHideBodyOverflow(true);
    }

    fetchPhotos(){
        const _this = this;
        fetch('/upload',
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
                            photos: data,
                        });
                    } else {
                        _this.setState({
                            photos: [],
                        })
                    }
                });

        }).catch(function (error) {
                console.log('error: ', error);
        })
    }

    countCard(par){
        if (this.state.chosen.includes(par)){
            let arr = this.state.chosen;
            arr = arr.filter(obj => obj !== par);
            this.setState({
                chosen: arr,
            });
        } else if (this.state.chosen.length === this.amountPhoto) {
            this.setState({
                warning: true,
            })
        } else {
            let arr = this.state.chosen;
            arr.push(par);
            this.setState({
                chosen: arr,
            })
        }
    }

    render() {
        let modal =
            <div className="_modal" onClick={this.props.onHide}>
                <div className="_modal__dialog" onClick={e => e.stopPropagation()}>
                    <header>
                        {this.state.chosen.length} из {this.amountPhoto}
                    </header>
                    <main>
                        {
                            this.state.photos === null || this.state.photos === undefined ?
                                <div style={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>Загрузка...</div>
                                :
                                <Cards data={this.state.photos} countCard={this.countCard} chosen_img={this.state.chosen}/>
                        }
                    </main>
                    <button type={'button'} onClick={() => {
                        this.props.setPhotos(this.state.chosen);
                        this.props.onHide();
                    }}>
                        Выбрать
                    </button>
                </div>
            </div>;

        return(modal)
    }
}
