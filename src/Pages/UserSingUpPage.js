import React, {useState} from "react";
import ButtonWithProgress from "../Components/ButtonWithProgress";
import Input from '../Components/Input'

const UserSignUpPage = (props) => {
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [errors, setErrors] = useState({});

    const onChangeDisplayName = (e) => {
        const merrors = { ...errors }
        delete merrors.displayName
        setDisplayName(e.target.value)
        setErrors(merrors)
    }

    const onChangeUserName = (e) => {
        const merrors = { ...errors }
        delete merrors.userName
        setUserName(e.target.value)
        setErrors(merrors)
    }

    const onChangePassword = (e) => {
        const merrors = { ...errors }
        delete merrors.password
        setPassword(e.target.value)
        setErrors(merrors)
    }

    const onClickSignUp = () => {
        setPendingApiCall(true)
        const user = {
            displayName,
            userName,
            password
        }

        props.actions.postSignUp(user)
            .then((response) => {
                setPendingApiCall(false)
            })
            .catch(e => {
                let merrors = {}
                if (e.response && e.response.data && e.response.data.validationErrors) {
                    merrors = { ...e.response.data.validationErrors }
                }
                setErrors(merrors)
                setPendingApiCall(false)
            })
    }

    return (
        <div className="container">
            <h1 className="text-center">Sign up</h1>
            <div className="col-12 mb-3">
                <Input
                    label='Display Name'
                    onChange={onChangeDisplayName}
                    value={displayName}
                    placeholder='Your Display Name'
                    hasError={errors.displayName && true}
                    error={errors.displayName}
                />
            </div>

            <div className="col-12 mb-3">
                <Input
                    label="User Name"
                    value={userName}
                    onChange={onChangeUserName}
                    placeholder="Your username"
                    hasError={errors.userName && true}
                    error={errors.userName}
                />
            </div>

            <div className="col-12 mb-3">
                <Input
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                    placeholder="Your password"
                    hasError={errors.password && true}
                    error={errors.password}
                />
            </div>
            <div className="col-12 mb-3 text-center">
                <ButtonWithProgress
                    disabled={pendingApiCall}
                    onClick={onClickSignUp}
                    text="Sign Up"
                    showProgress={pendingApiCall}
                />
            </div>
        </div>
    )
}

export default UserSignUpPage;
//shift alt F