import React, { Component, useState } from 'react'
import { resolvePath } from 'react-router-dom';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import Input from "../Components/Input";

//useState
const LoginPage = (props) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [apiError, setApiError] = useState(undefined)
    const [pendingApiCall, setPendingApiCall] = useState(false)

    const onClickLogin = () => {
        setPendingApiCall(true)
        const body = {
            username, password
        }

        props.actions.postLogin(body)
            .then(response => {
                setPendingApiCall(false)
                //navigate to "/"
            })
            .catch(e => {
                if (e.response) {
                    setApiError(e.response.data.message)
                    setPendingApiCall(false)
                }
            })
    }

    const onChangeUserName = (event) => {
        const value = event.target.value
        setUserName(value)
        setApiError(undefined)
    }

    const onChangePassword = (event) => {
        const value = event.target.value
        setPassword(value)
        setApiError(undefined)
    }

    //auto called when the state changed
    let disableSubmit = username === '' || password === ''

    //a functional component is just a regular func 
    //that returns JSX
    return (
        <div className="container">
            <h1 className="text-center">Login</h1>

            <div className="col-12 mb-3">
                <Input
                    value={username}
                    onChange={onChangeUserName}
                    label='User Name'
                    placeholder='Your User Name'
                />
            </div>

            <div className="col-12 mb-3">
                <Input
                    value={password}
                    onChange={onChangePassword}
                    label='Password'
                    placeholder='Your Password'
                    type='password'
                />
            </div>

            <div className='text-center'>
                {
                    apiError &&
                    (
                        <div className='col-12 mb-3'>
                            <div className='alert alert-danger'>
                                {apiError}
                            </div>
                        </div>
                    )
                }
                <ButtonWithProgress
                    showProgress={pendingApiCall}
                    disabled={disableSubmit || pendingApiCall}
                    text="Login"
                    onClick={onClickLogin}
                />
            </div>
        </div>
    )
}

export default LoginPage
