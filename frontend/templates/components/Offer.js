import React from "react";
import "../styles/Offer.css"
import {InputGroup, FormControl, Button, ButtonGroup, Row, Col, DropdownButton, Dropdown} from "react-bootstrap";

export default class Offer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            services: [],
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
                    <InputGroup className="mb-3" as={Row}>
                        <FormControl
                            size={'lg'}
                            placeholder="Название"
                            aria-label="title"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3" as={Row}>
                        <FormControl
                            placeholder="Описание"
                            aria-label="description"
                            aria-describedby="textarea"
                            as='textarea'
                            rows={'7'}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3" as={Row}>
                        <Col sm={6} lg={6} xl={6} md={6}></Col>
                        <FormControl
                            placeholder="Кол-во"
                            aria-label="price"
                            aria-describedby="basic-addon3"
                            type={'number'}
                        />
                        <FormControl
                            sm={3} lg={3} xl={3} md={3}
                            placeholder="Цена"
                            aria-label="price"
                            aria-describedby="basic-addon3"
                            id={'price'}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">₽</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <InputGroup className="mb-3" as={Row} sm={12} lg={12} xl={12} md={12}>
                        <Button variant="primary" size="sm" block>Добавить фото</Button>
                    </InputGroup>

                    <InputGroup className="mb-3" as={Row}>
                        {
                            ['Farpost', 'Japancars', 'Avito'].map((name, i) => <button
                                className={`mx-2 service-btn${this.state.services.includes(name) ? ' added' : ''}`}
                                type={'button'}
                                key={i}
                                onClick={() => {
                                    let res = this.state.services
                                    if(this.state.services.includes(name)){
                                        res = res.filter(obj => obj !== name)
                                    } else {
                                        res.push(name)
                                    }
                                    this.setState({services: res})
                                }}>{!this.state.services.includes(name) && <i className="fa fa-plus" aria-hidden="true"></i>} {name}</button>)
                        }
                    </InputGroup>

                    <InputGroup className="mb-5">
                        {
                            this.state.services.map((name, i) =>
                                <DropdownButton key={i} id="dropdown-item-button" title={name} className={'my-3'} variant={'secondary'}>
                                    <Dropdown.ItemText>Выберите категорию товара.</Dropdown.ItemText>
                                    <Dropdown.Item as="button">{1}) Автомобили <i className="fa fa-arrow-right" aria-hidden="true"></i> Запчасти</Dropdown.Item>
                                    <Dropdown.Item as="button">{2}) Автомобили <i className="fa fa-arrow-right" aria-hidden="true"></i> Другое</Dropdown.Item>
                                </DropdownButton>
                            )
                        }
                    </InputGroup>

                    <InputGroup as={Row} style={{
                        marginTop: '150px'
                    }}>
                        <Col sm={8} lg={8} xl={8} md={8}></Col>
                        <ButtonGroup sm={4} lg={4} xl={4} md={4} as={Col}>
                            <Button variant={'warning'}>Создать</Button>
                            <Button variant={'outline-danger'}>Отмена</Button>
                        </ButtonGroup>
                    </InputGroup>
                </div>
            </>;

        return(offer)
    }
}