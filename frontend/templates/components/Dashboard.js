import React from "react";
import Loading from "./Loading";
import '../styles/Dashboard.css';
import '../styles/Card.css';
import '../styles/Modal.css'


class Info extends React.Component{
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
                                info.img.map((path, i) => <div key={i} className="photo" style={{
                                    backgroundImage: `url('/public/uploads/${path}')`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                }}/>)
                            }
                        </div>
                        <div className="offer">
                            <h6>Кол-во: {info.amount}</h6>
                            <h2>{info.title}</h2>
                            <p>{info.description}</p>
                            <div className="views">Просмотров: {info.views}</div>
                            <br />
                            <span className="price">{info.price === 0 ? 'Договорная' : `${info.price} ₽`}</span>
                            <div className="offer-group-btn">
                                <button type={'button'} className={'sold-offer'}>Закрыть предложение</button>
                                <button type={'button'} className={'close-offer'}>Удалить везде</button>
                            </div>
                        </div>
                    </main>
                    <footer>
                        {
                            info.links.map((link, i) => <a key={i} href={link[1]}>{link[0]}</a>)
                        }
                    </footer>
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
                    this.props.data.map((obj, i) =>
                        <div className="course" key={i} onClick={() => this.props.setInfo(obj)}>
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


export default class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                img: ['1.png'],
                title: 'Кузов Land Cruiser 100, 105 правый руль 202 цвет, 2006г во Владивостоке',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                price: 0,
                amount: 7,
                links: [['Farpost', 'https://www.farpost.ru'], ['Avito', "https://www.avito.ru"]],
                views: 134,
            }],
            showInfo: null,
        }
    }


    render() {
        return(
            <>
                <Loading>
                    <div className="create-offer-btn">
                    <a href="/offer"><i className="fa fa-plus-circle" aria-hidden="true"></i> Создать объявление</a>
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
