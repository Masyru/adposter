import React from "react";
import '../styles/Dashboard.css';
import '../styles/Library.css';
import '../styles/Modal.css';
import Button from "react-bootstrap/cjs/Button";
import Loading from "./Loading";
import Upload from "./Upload";

export class Modal extends React.Component{
    constructor(props) {
        super(props);
        this.deleteImage = this.deleteImage.bind(this);
    }

    deleteImage(name){
        let conf = confirm('Вы уверены, что хотите удалить данное объявление?')
        if (conf){
            fetch('/delete/?type=image&name=' + name,
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
                        window.location.href = '/library';
                    });
            }).catch(function (error) {
                console.log('error: ', error);
            })
        }
    }

    render() {
        let modal = this.props.mode ?
            <div className={`_modal downloader`}  onClick={this.props.onHide}>
                <div className="_modal__dialog" onClick={event => event.stopPropagation()}>
                   <Upload />
                </div>
            </div>
                    :
            <div className={`_modal library-modal`}  onClick={this.props.onHide}>
                <div className="_modal__dialog" onClick={event => event.stopPropagation()}>
                        <div className='photo-modal'>
                            <img src={`/public/uploads/${this.props.data.url}`} alt="Изображение не загрузилось" className="photo-modal__picture"/>
                            <div className="photo-modal__description">
                                <span className="date">
                                    Дата загрузки: {new Date(this.props.data.datetime * 1000).toISOString().split('.')[0].split('T').join(' ')}
                                </span>
                                <br />
                                <span className="where">
                                    Объявления: <span style={{fontWeight: '300', lineHeight: '1.1'}}>{this.props.data.offers.join('; ') || 'Пусто'}</span>
                                </span>
                                <br />
                                <Button variant={'danger'} className={'mt-5'} size={'sm'} onClick={() => this.deleteImage(this.props.data.url)}>Удалить изображение</Button>
                            </div>
                        </div>
                </div>
            </div>;

        return(modal)
    }
}

class PhotoCard extends React.Component{
    render() {
        let photo =
            // <div className='photo col-xl-2 col-lg-2 col-md-4 col-sm-12'
            //      style={{
            //         backgroundColor: '#eaeaea',
            //         backgroundImage: `url('/public/uploads/${this.props.data.url}')`,
            //         backgroundSize: 'cover cover',
            //         backgroundPosition: 'center center'
            //     }}
            //     onClick={() => this.props.showInfo(this.props.data)}
            // />
            <img
                src={`/public/uploads/${this.props.data.url}`}
                alt="Изображение не загрузилось"
                className="photo"
                onClick={() => this.props.showInfo(this.props.data)}
            />;

        return(photo)
    }
}

class Gallery extends React.Component{
    render() {
        return(
            <div className={'gallery'}>
                {this.props.children}
            </div>
        )
    }
}

export default class Library extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            photo: null,
            upload: false,
        }

        this.fetchPhotos = this.fetchPhotos.bind(this);
    }

    componentDidMount() {
        this.fetchPhotos();
    }

    fetchPhotos(){
        const _this = this;
        fetch('/upload/?obj=true',
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
                        <a onClick={() => this.setState({upload: true})}> <i className="fa fa-plus-circle" aria-hidden="true"></i> Загрузить фото </a>
                    </div>
                        <div className={'row'} style={{
                            paddingBottom: '20px'
                        }}>
                            {
                                this.state.data.length ?
                                    this.state.data.map((obj, i) => <PhotoCard data={obj} key={i} showInfo={(item) => this.setState({photo: item})}/>)
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
                                    }}>Здесь еще нет фотографий, загрузите их.</div>
                            }

                    </div>
                    {
                        this.state.photo ?
                            <Modal mode={0} data={this.state.photo} onHide={() => this.setState({photo: null})}/>
                            :
                            null
                    }
                    {
                        this.state.upload ?
                            <Modal mode={1} onHide={() => this.setState({upload: false})}/>
                            :
                            null
                    }
                </Loading>
            </>
        )
    }
}
