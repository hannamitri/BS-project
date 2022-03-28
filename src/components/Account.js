import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Link, useLocation, useHistory
} from "react-router-dom";
import Contact from './Contact';
import { update } from '../api/api'

const Account = ({ id }) => {

    const [values, setValues] = useState({
        Name: '',
        Email: '',
        Password: '',
        Location: '',
    });


    let location = useLocation();
    let history = useHistory();


    const updateUser = async (event) => {
        event.preventDefault();
        let User = {
            id: id,
            Name: values.Name,
            Email: values.Email,
            Password: values.Password,
            Location: values.Location,
        }
        const info = await update(User);
        alert(info?.data.msg);
        history.push("/account");
    }
    const changeHandlerAll = (username) => event => {
        setValues({ ...values, [username]: event.target.value })
        console.log(values);
    }

    return (
        <div className="container-body-account">
            <div className="account-form">
                <form >
                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label for="email">Name: </label>
                                <input type="text" class="form-control" id="name" required placeholder="Name" onChange={changeHandlerAll('Name')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label for="email">Email: </label>
                                <input type="email" class="form-control" id="pwd" required placeholder="test@exampl.com" onChange={changeHandlerAll('Email')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label for="pwd">Password: </label>
                                <input type="password" class="form-control" id="pwd" required placeholder="Password" onChange={changeHandlerAll('Password')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label for="loc">Location: </label>
                                <input type="text" class="form-control" id="loc" required placeholder="Location" onChange={changeHandlerAll('Location')} />
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}></div>
                    <div className="row">
                        <div className="col">
                            <button style={{ marginLeft: "390px" }} className="btn btn-success" onClick={updateUser}>Save</button>
                        </div>
                    </div>
                    <div style={{ height: '50px' }}></div>
                </form >

            </div>
            <Contact />
        </div >

    );
}
export default Account;