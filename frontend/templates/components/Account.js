import React from "react";
import '../styles/Account.css';
import Loading from "./Loading";

class Profile extends React.Component{
    render(){
        let profile =
            <div className={'profile my-4'}>
                <span>{this.props.name}: </span>
                <input type="username" placeholder={'Логин'} style={{
                    marginRight: '1px'
                }}/>
                <input type="password" placeholder={'Пароль'}style={{
                    marginLeft: '1px'
                }}/>
                <button type={'button'}>Добавить</button>
            </div>

        return(profile)
    }
}


export default class Account extends React.Component{
    render() {
        return(
            <>
                <Loading>
                    <Profile name={'Farpost'} />
                    <Profile name={'Avito'} />
                    <Profile name={'Japancars'} />
                </Loading>
            </>
        )
    }
}
