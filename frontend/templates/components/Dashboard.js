import React from "react";
import '../styles/Dashboard.css';
import '../styles/Card.css';
import '../styles/Modal.css'
import { Modal, Button } from "react-bootstrap";


class Info extends React.Component{
    render() {
        let info = this.props.data;

        // let modal =
        //     <Modal
        //         show={this.props.show}
        //         onHide={this.props.onHide}
        //         bsSize="large"
        //         aria-labelledby="contained-modal-title-lg"
        //         centered
        //     >
        //         <Modal.Header closeButton>
        //             Вот
        //         </Modal.Header>
        //         <Modal.Body>
        //             <div className="modal-photo">
        //                 {/*{*/}
        //                 {/*    info.map((path, i) =>*/}
        //                 {/*        <div key={i} className="modal-photo__item" style={{*/}
        //                 {/*            backgroundImage: `url('/public/uploads/${path}')`,*/}
        //                 {/*            backgroundPosition: 'center center',*/}
        //                 {/*            backgroundSize: 'cover',*/}
        //                 {/*        }}></div>*/}
        //                 {/*    )*/}
        //                 {/*}*/}
        //             </div>
        //             <div className="modal-info">
        //                 <h6>Кол-во: {info.amount}</h6>
        //                 <h2>{info.title}</h2>
        //                 <p>{info.description}</p>
        //                 <div className="views">{info.views}</div>
        //             </div>
        //             <div className="close-offer">
        //                 <Button onClick={this.props.onHide}>Close</Button>
        //             </div>
        //         </Modal.Body>
        //         <Modal.Footer>
        //             {/*<div className="links">*/}
        //             {/*    {*/}
        //             {/*        info.links.map((link, i) => <a key={i} href={`${link[1]}`}>{link[0]}</a>)*/}
        //             {/*    }*/}
        //             {/*</div>*/}
        //         </Modal.Footer>
        //     </Modal>

        let modal =
            <div className="modal-content">
                <label htmlFor="modal" className="close">
                    <i className="fa fa-times" aria-hidden="true"/>
                </label>
                <header>
                    <h2>So This is a Modal</h2>
                </header>
                <article className="content">
                    <p>Pellentesque habitant morbi tristique senectus et netus et </p>
                </article>
                <footer>
                    <a href="http://geekstudios.co" target="_parent" className="button success">Accept</a>
                    <label htmlFor="modal" className="button danger">Decline</label>
                </footer>
            </div>;


        return(modal)
    }
}


class Card extends React.Component{
    render() {
        let card =
            <div className="courses-container">
                {
                    this.props.data.map((obj, i) =>
                        <div className="course" key={i} onClick={(obj) => this.props.setInfo(obj)}>
                            <div className="course-preview" style={{
                                backgroundImage: `url('/public/uploads/${obj.img[0]}')`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                            }}>
                                <h6>Главное фото</h6>
                                <a href="#">Посмотреть все <i className="fa fa-angle-right" aria-hidden="true"></i></a>
                            </div>
                            <div className="course-info">
                                <h6>Кол-во: {obj.amount}</h6>
                                <h2>{obj.title}</h2>
                                <p>{obj.description}</p>
                            </div>
                            <div className="price">{ obj.price === 0 ? 'Договорная' : `${obj.price} ₽`}</div>
                        </div>
                    )
                }
            </div>;

        return(card)
    }
}


export default class Account extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                img: ['1.png', "1.png", "1.png"],
                title: 'Кузов Land Cruiser 100, 105 правый руль 202 цвет, 2006г во Владивостоке',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                price: 0,
                amount: 7,
                links: [['Farpost', 'farpost.ru'], ['Avito', "avito.ru"]],
                views: 134,
            }],
            showInfo: null,
        }
    }


    render() {
        return(
            <>
                <Card data={this.state.data} setInfo={(data) => this.setState({showInfo: data})}/>
                {!this.state.showInfo || <Info data={this.state.showInfo} show={true} onHide={() => this.setState({showInfo: null})}/>}
            </>
        )
    }
}
