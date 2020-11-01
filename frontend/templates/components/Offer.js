import React from "react";
import "../styles/Offer.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import PhotoChooser from "./Photo-chooser";
import { setHideBodyOverflow } from "./Utils";

const __default = {
    title: '',
    model: '',
    firm: '',
    kuzov: '',
    engine: '',
    dvs: '',
    LR: 'Право',
    UD: 'Верх',
    FB: 'Перед',
    oem: '',
    producer: '',
    description: '',
    s_presence: 'в наличии',
    price: '',

    photos: [],
    showPhotoChooser: false,
}


class Part extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'Берутся из списка, который вышлют при добавлении на Japancars',
            model: 'Берутся из списка, который вышлют при добавлении на Japancars',
            firm: 'Берутся из списка, который вышлют при добавлении на Japancars',
            used: 'новая',
            kuzov: '',
            engine: '',
            dvs: '',
            LR: 'Право',
            UD: 'Верх',
            FB: 'Перед',
            oem: '',
            producer: '',
            description: '',
            s_presence: 'в наличии',
            price: '',

            photos: [],
            showPhotoChooser: false,
        }

        this.updatePhotoSet = this.updatePhotoSet.bind(this);
        this.sendOffer = this.sendOffer.bind(this);
    }

    updatePhotoSet(arr){
        this.setState({
            photos: arr
        })
    }

    sendOffer(){
        const _this = this,
              st = this.state;
        if(
            st.price !== ''
        ){

            let data = {
                ...st,
                state: '2',
            };
            // Берем значения с selectpicker'ов
            data.title = $("button[data-id='title']")[0].title;
            data.firm = $("button[data-id='firm']")[0].title;
            data.model = $("button[data-id='model']")[0].title;
            data.used = $("button[data-id='used']")[0].title;
            data.LR = $("button[data-id='LR']")[0].title;
            data.UD = $("button[data-id='UD']")[0].title;
            data.FB = $("button[data-id='FB']")[0].title;
            data.s_presence = $("button[data-id='s_presence']")[0].title;

            data.showPhotoChooser = undefined;

            fetch('/offer',
       {
                method: 'POST',
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                },
                body: JSON.stringify(data)
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
                        if (data){
                            _this.setState({
                                loading: false,
                            });
                            _this.setState(__default)
                        } else {
                            window.location.href = '/';
                        }
                    });

            }).catch(function (error) {
                    console.log('error: ', error);
            })
        }
    }

    render(){
        const st = this.state

        let part =
            <div style={{
                width: '100%',
                height: '100%',
                display: this.props.show ? 'block' : 'none'
            }}>

                {/*<label htmlFor="f" className={'mt-3'}>Вид: </label>*/}
                {/*<select className="selectpicker mb-3" id={'f'} name={'f'}>*/}
                {/*    {*/}
                {/*        ['автомоби
                ль', 'спец.техника'].map((obj, i) => <option key={i}>{obj}</option>)*/}
                {/*    }*/}
                {/*</select>*/}

                <label htmlFor="title" className={'mt-3'}>Название запчасти: </label>
                <select className="selectpicker mb-3" id={'title'} name={'title'}>
                    {
                        ['Берутся из списка, который вышлют при добавлении на Japancars'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="firm" className={'mt-3'}>Фирма: </label>
                <select className="selectpicker mb-3" id={'firm'} name={'firm'}>
                    {
                        ['Берутся из списка, который вышлют при добавлении на Japancars'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="model" className={'mt-3'}>Модель: </label>
                <select className="selectpicker mb-3" id={'model'} name={'model'}>
                    {
                        ['Берутся из списка, который вышлют при добавлении на Japancars'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="used" className={'mt-3'}>Состояние запчасти: </label>
                <select className="selectpicker mb-3" id={'used'} name={'used'}>
                    {
                        ['новая', 'контрактная'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        title={'Если нет, то оставить поле пустым'}
                        placeholder="Номер кузова"
                        aria-describedby="basic-addon3"
                        value={st.kuzov }
                        onChange={e => this.setState({kuzov : e.target.value})}
                    />
                    <FormControl
                        title={'Если нет, то оставить поле пустым'}
                        placeholder="Номер двигателя"
                        aria-describedby="basic-addon3"
                        value={st.engine}
                        onChange={e => this.setState({engine : e.target.value})}
                    />
                </InputGroup>

                <InputGroup className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        title={'Если нет, то оставить поле пустым'}
                        placeholder="Номер оптики, двс/артикул запчасти"
                        aria-describedby="basic-addon3"
                        value={st.dvs}
                        onChange={e => this.setState({dvs : e.target.value})}
                    />
                </InputGroup>

                <label className={'mt-3'}>Положение запчасти:</label>
                <br />
                <select className="selectpicker mb-3 col-4" id='LR'>
                    {
                        ['Право', 'Лево', '-'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>
                <select className="selectpicker mb-3 col-4" id='UD'>
                    {
                        ['Верх', 'Низ', '-'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>
                <select className="selectpicker mb-3 col-4" id='FB'>
                    {
                        ['Перед', 'Зад', '-'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='my-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        title={'Если нет, то оставить поле пустым'}
                        placeholder="Номер OEM"
                        aria-describedby="basic-addon3"
                        value={st.oem}
                        onChange={e => this.setState({oem : e.target.value})}
                    />
                </InputGroup>

                <InputGroup className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        title={'KYB, 555, TADASHI...'}
                        placeholder="Производитель запчасти"
                        aria-describedby="basic-addon3"
                        value={st.producer}
                        onChange={e => this.setState({producer : e.target.value})}
                    />
                </InputGroup>

                <InputGroup className="mb-3" style={{
                    width: '100%'
                }}>
                    <FormControl
                        placeholder="Описание"
                        aria-label="description"
                        aria-describedby="textarea"
                        as='textarea'
                        rows={'7'}
                        value={st.description}
                        onChange={e => this.setState({description: e.target.value})}
                    />
                </InputGroup>

                <label htmlFor="s_presence">Статус: </label>
                <select className="selectpicker mb-3" id={'s_presence'} name={'s_presence'}>
                    {
                        ['в наличии', 'под заказ', 'в пути'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='my-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="Цена"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.price }
                        onChange={e => this.setState({price: e.target.value})}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <Button variant="primary" size="sm" block onClick={() => this.setState({showPhotoChooser: true})}>Добавить фото</Button>
                </InputGroup>

                <div className="photo-watcher mb-3">
                    {
                        this.state.photos.map((obj, i) =>
                            <div className="photo-watcher__item" key={i} style={{
                                backgroundColor: '#eaeaea',
                                backgroundImage: `url('/public/uploads/${obj}')`,
                                backgroundSize: 'cover cover',
                                backgroundPosition: 'center center',
                            }}>
                            </div>
                        )
                    }
                </div>

                <InputGroup style={{
                    width: '100%',
                    margin: '150px 0 30px 0',
                    display: 'flex'
                }}>
                    <Button variant={'warning'} style={{
                        margin: 'auto 20px auto auto'
                    }}
                            onClick={this.sendOffer}
                    >Создать</Button>
                </InputGroup>

                {
                    this.state.showPhotoChooser &&
                    <PhotoChooser
                        onHide={() => {
                            this.setState({showPhotoChooser: false});
                            setHideBodyOverflow(false);
                        }}
                        setPhotos={(arr) => this.setState({photos: arr})}
                    />
                }

            </div>;

        return(part)
    }
}


const _default = {
    name: '',
    firm: '',
    model: '',
    description: '',
    year: '',
    volume: '',
    fuel_type: 'бенз.',
    transmission: 'авт.',
    probegrf: '',
    probeg: '',
    rul: 'Прав.',
    privod: 'передний',
    pts_record: 'с документами',
    used: 'подержанный',
    price: '',
    currency: 'RUB',
    s_presence: 'в наличии',
    location: '',

    photos: [],
    showPhotoChooser: false,
};


class Car extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            firm: '',
            model: '',
            description: '',
            year: '',
            volume: '',
            fuel_type: 'бенз.',
            transmission: 'авт.',
            probegrf: '',
            probeg: '',
            rul: 'Прав.',
            privod: 'передний',
            pts_record: 'с документами',
            used: 'подержанный',
            price: '',
            currency: 'RUB',
            s_presence: 'в наличии',
            location: '',

            photos: [],
            showPhotoChooser: false,
        };

        this.updatePhotoSet = this.updatePhotoSet.bind(this);
        this.sendOffer = this.sendOffer.bind(this);
    }

    updatePhotoSet(arr){
        this.setState({
            photos: arr
        })
    }

    sendOffer(){
        const _this = this,
              st = this.state;
        if(
            st.title !== '' &&
            st.firm !== '' &&
            st.model !== '' &&
            st.description !== '' &&
            st.year !== '' &&
            st.volume !== '' &&
            st.price !== '' &&
            st.location !== ''
        ){

            let data = {
                ...st,
                state: '1',
            };
            // Берем значения с selectpicker'ов
            data.fuel_type = $("button[data-id='fuel_type']")[0].title;
            data.transmission = $("button[data-id='transmission']")[0].title;
            data.rul = $("button[data-id='rul']")[0].title;
            data.pts_record = $("button[data-id='pts_record']")[0].title;
            data.privod = $("button[data-id='privod']")[0].title;
            data.used = $("button[data-id='used']")[0].title;
            data.s_presence = $("button[data-id='s_presence']")[0].title;

            data.showPhotoChooser = undefined;


            fetch('/offer',
       {
                method: 'POST',
                headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                },
                body: JSON.stringify(data)
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
                        if (data){
                            _this.setState({
                                loading: false,
                            });
                            _this.setState(_default)
                        } else {
                            window.location.href = '/';
                        }
                    });

            }).catch(function (error) {
                    console.log('error: ', error);
            })
        }
    }

    render() {
        const st = this.state;

        let car =
            <div style={{
                width: '100%',
                height: '100%',
                display: this.props.show ? 'block' : 'none'
            }}>

                {/*<label htmlFor="f" className={'mt-3'}>Вид: </label>*/}
                {/*<select className="selectpicker mb-3" id={'f'} name={'f'}>*/}
                {/*    {*/}
                {/*        ['автомобиль', 'спец.техника'].map((obj, i) => <option key={i}>{obj}</option>)*/}
                {/*    }*/}
                {/*</select>*/}

                <InputGroup className="mb-2 mt-5" style={{
                    width: '100%'
                }}>
                        <FormControl
                            required
                            placeholder="Название объявления"
                            aria-label="title"
                            aria-describedby="basic-addon1"
                            value={st.title}
                            onChange={e => this.setState({title: e.target.value})}
                        />

                </InputGroup>

                <InputGroup className="mb-3" style={{
                    width: '100%'
                }}>
                        <FormControl
                            required
                            size={'sm'}
                            placeholder="Марка"
                            aria-label="title"
                            aria-describedby="basic-addon1"
                            value={st.firm}
                            onChange={e => this.setState({firm: e.target.value})}
                        />

                        <FormControl
                            required
                            size={'sm'}
                            placeholder="Модель"
                            aria-label="title"
                            aria-describedby="basic-addon1"
                            value={st.model}
                            onChange={e => this.setState({model: e.target.value})}
                        />

                </InputGroup>


                <InputGroup className="mb-3" style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="Описание"
                        aria-label="description"
                        aria-describedby="textarea"
                        as='textarea'
                        rows={'7'}
                        value={st.description}
                        onChange={e => this.setState({description: e.target.value})}
                    />
                </InputGroup>

                <label htmlFor="fuel_type" className={'mt-3'}>Тип двигателя: </label>
                <select className="selectpicker mb-3" id={'fuel_type'} name={'fuel_type'}>
                    {
                        ['бенз.', 'газ', 'диз.', 'гибрид'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="Объем двигателя ( куб.см )"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.volume }
                        onChange={e => this.setState({volume : e.target.value})}
                    />
                    <FormControl
                        required
                        placeholder="Год выпуска"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.year}
                        onChange={e => this.setState({year : e.target.value})}
                    />
                </InputGroup>

                <label htmlFor="transmission" className={'mt-3'}>Тип кпп: </label>
                <select className="selectpicker mb-3" id={'transmission'} name={'transmission'}>
                    {
                        ['авт.', 'мех', 'вариатор'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="Пробег по РФ"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.probegrf }
                        onChange={e => this.setState({probegrf: e.target.value})}
                    />
                    <FormControl
                        required
                        placeholder="Общий пробег"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.probeg}
                        onChange={e => this.setState({probeg : e.target.value})}
                    />
                </InputGroup>

                <label htmlFor="rul" className={'mt-3'}>Положение руля: </label>
                <select className="selectpicker mb-3" id={'rul'} name={'rul'}>
                    {
                        ['Прав.', 'Лев.', 'Центр'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="s_presence">Статус: </label>
                <select className="selectpicker mb-3" id={'s_presence'} name={'s_presence'}>
                    {
                        ['в наличии', 'под заказ', 'в пути'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="location">Местоположение: </label>
                <InputGroup id={'location'} className='mb-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="город в РФ или страна за рубежом"
                        aria-describedby="basic-addon3"
                        value={st.location}
                        onChange={e => this.setState({location: e.target.value})}
                    />
                </InputGroup>

                <label htmlFor="privod">Привод: </label>
                <select className="selectpicker mb-3" id={'privod'} name={'privod'}>
                    {
                        ['передний', 'задний', '4WD'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="pts_record">Документы ( Авто под ПТС или оформленное ): </label>
                <select className="selectpicker mb-3" id={'pts_record'} name={'pts_record'}>
                    {
                        ['с документами', 'без документами'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <label htmlFor="used">Состояние: </label>
                <select className="selectpicker mb-3" id={'used'} name={'used'}>
                    {
                        ['подержанный', 'битый/аварийный'].map((obj, i) => <option key={i}>{obj}</option>)
                    }
                </select>

                <InputGroup className='my-3' style={{
                    width: '100%'
                }}>
                    <FormControl
                        required
                        placeholder="Цена"
                        aria-describedby="basic-addon3"
                        type={'number'}
                        value={st.price }
                        onChange={e => this.setState({price: e.target.value})}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <Button variant="primary" size="sm" block onClick={() => this.setState({showPhotoChooser: true})}>Добавить фото</Button>
                </InputGroup>

                <div className="photo-watcher mb-3">
                    {
                        this.state.photos.map((obj, i) =>
                            <div className="photo-watcher__item" key={i} style={{
                                backgroundColor: '#eaeaea',
                                backgroundImage: `url('/public/uploads/${obj}')`,
                                backgroundSize: 'cover cover',
                                backgroundPosition: 'center center',
                            }}>
                            </div>
                        )
                    }
                </div>

                <InputGroup style={{
                    width: '100%',
                    margin: '150px 0 30px 0',
                    display: 'flex'
                }}>
                    <Button variant={'warning'} style={{
                        margin: 'auto 20px auto auto'
                    }}
                        onClick={this.sendOffer}
                    >Создать</Button>
                </InputGroup>

                {
                    this.state.showPhotoChooser &&
                    <PhotoChooser
                        onHide={() => {
                            this.setState({showPhotoChooser: false});
                            setHideBodyOverflow(false);
                        }}
                        setPhotos={(arr) => this.setState({photos: arr})}
                    />
                }

            </div>;

        return(car)
    }
}


export default class Offer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            showPhotoChooser: false,
            mode: null,
        }
    }

    render() {

        let offer =
            <>
                <div className="backlink">
                    <a href='/dashboard'><i className="fa fa-long-arrow-left" aria-hidden="true"></i> Назад</a>
                </div>
                <h2 className='my-3'>Создание объявления</h2>
                <div className={'offer-inputs'}>

                    <InputGroup>
                        <Button
                                style={{
                                    width: '50%',
                                    borderTopRightRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    borderRight: 'none',
                                }}
                                variant={this.state.mode === 1 ? "primary" : "outline-secondary"}
                                onClick={() => this.setState({mode: 1})}>
                            Автомобиль
                        </Button>
                        <Button
                                style={{
                                        width: '50%',
                                        borderTopLeftRadius: '0px',
                                        borderBottomLeftRadius: '0px',
                                    }}
                                variant={this.state.mode === 2 ? "primary" : "outline-secondary"}
                                onClick={() => this.setState({mode: 2})}>
                            Запчасти
                        </Button>
                    </InputGroup>

                    <Car show={this.state.mode === 1}/>
                    <Part show={this.state.mode === 2}/>

                </div>
            </>;

        return(offer)
    }
}
