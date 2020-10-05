import React from "react";
import '../styles/Dashboard.css';
import '../styles/Library.css';
import '../styles/Modal.css';
import Loading from "./Loading";
import Upload from "./Upload";

export class Modal extends React.Component{
    render() {
        let modal =
            <div className={`_modal`}  onClick={this.props.onHide}>
                <div className="_modal__dialog" onClick={event => event.stopPropagation()}>
                    {
                        this.props.mode ?
                            <Upload />
                            :
                            <div className='photo-modal'>
                                <div className="photo-modal__picture" style={{
                                    backgroundColor: '#eaeaea',
                                    backgroundImage: `/public/uploads${this.props.data.url}`,
                                    backgroundSize: 'cover cover',
                                    backgroundPosition: 'center center'
                                }}>
                                </div>
                                <div className="photo-modal__description">
                                    <span className="date">
                                        Дата загрузки: {this.props.data.date}
                                    </span>
                                    <br />
                                    <span className="where">
                                        Дата загрузки: {this.props.data.offers.join(', ')}
                                    </span>
                                </div>
                            </div>
                    }
                </div>
            </div>;

        return(modal)
    }
}

class PhotoCard extends React.Component{
    render() {
        let photo =
            <div className='photo col-xl-2 col-lg-2 col-md-4 col-sm-12 ' style={{
                backgroundColor: '#eaeaea',
                backgroundImage: `/public/uploads${this.props.data.url}`,
                backgroundSize: 'cover cover',
                backgroundPosition: 'center center'
            }}>
            </div>;

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
            data: [
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                },
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                },
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                },
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                },
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                },
                {
                    url: '1.png',
                    date: '1212121212',
                    offers: ['Название объявления', 'Название объявления №2']
                }
            ],
            photo: null,
            upload: false,
        }
    }

    render() {
        return(
            <>
                <Loading>
                    <div className="create-offer-btn">
                        <a href="#upload_photo" onClick={() => this.setState({upload: true})}> <i className="fa fa-plus-circle" aria-hidden="true"></i> Загрузить фото </a>
                    </div>
                    <Gallery>
                        <div className={'row'}>
                            {
                                this.state.data.map((obj, i) => <PhotoCard data={obj} key={i} onClick={() => this.setState({photo: data})}/>)
                            }
                        </div>
                    </Gallery>
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
