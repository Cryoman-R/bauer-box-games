import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { connect } from 'react-redux';
import { LoginAction} from '../../AllApps/Store/Actions/LoginAction';
import { useNavigate } from "react-router-dom";
import { React, useState } from 'react';

const Login = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(<></>);

    const handleChange = (e) => {
        return (
            e.target.name === 'user' ? setUsername(e.target.value) :
            e.target.name === 'pass' ? setPassword(e.target.value) :
            () => {}
        )
    }

    const login = (username, password) => {
        let payload = { username: username, password: password }

        setLoading(
            <div className="card-basic">
                <h5>Logging In...</h5>
            </div>
        )

        props.loginAction(payload).then(result => {
            if (result.success) {
                setLoading(<></>);
                navigate("/bauer.box");
            }
        });        
    }

    const loginClick = (e) => {
        e.preventDefault();
        username.length && password.length && login(username, password);
    }

    return (
        <div>
            <div className='card-basic'>
                <h2>Bauer Box Games</h2>
            </div>
            <div className='card-basic'>
                <h2>Login</h2>
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="user-name">User</InputGroup.Text>
                            <Form.Control
                            aria-label="User"
                            aria-describedby="user-name"
                            placeholder="Enter User Name"
                            name="user"
                            onChange={handleChange}
                            required
                            />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="password">Password</InputGroup.Text>
                            <Form.Control
                            aria-label="Password"
                            aria-describedby="password"
                            placeholder="Enter Password"
                            name="pass"
                            onChange={handleChange}
                            required
                            />
                    </InputGroup>
                    <Button onClick={loginClick}>Login</Button>
                </Form>
            </div>
            {loading}
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log('state', state);

    return {
        userDetails: state.login.userDetails,
    }
}
    
const mapDispatchToProps = {
    loginAction: LoginAction
}
    
export default connect(mapStateToProps, mapDispatchToProps) (Login);
