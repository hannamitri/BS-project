import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Link
} from "react-router-dom";
import { insertUser } from '../api/api'



const Registration = () => {


    const [values, setValues] = useState({
        Name: '',
        Email: '',
        Password: '',
        Location: '',
    });


    let location = useLocation();
    let history = useHistory();


    const registerUser = async (event) => {
        event.preventDefault();

        let User = {
            Name: values.Name,
            Email: values.Email,
            Password: values.Password,
            Location: values.Location,

        }

        const info = await insertUser(User);
        alert(info?.data.msg);
        history.push("/");
    }
    const changeHandlerAll = (username) => event => {
        setValues({ ...values, [username]: event.target.value })
        console.log(values);
    }

    return (
        <div className="container-body-account">

            <div className="row" >
                <div className="col">
                    <Link style={{ marginLeft: "300px", marginTop: "60px" }} className="buttons" to='/login'>Back</Link>
                </div>
            </div>

            <div className="row" style={{ height: "40px" }}>

            </div>
            <div className="row">
                <div className="col text-center">
                    <h4>Please enter the required information to create an account and access the website. </h4>
                </div>
            </div>
            <div className="account-form">
                <form >
                    <div className="row">
                        <div className="col-4">
                            <div class="form-group">
                                <label for="email">Name: </label>
                                <input type="text" class="form-control" id="email" required placeholder="Name" onChange={changeHandlerAll('Name')} />
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
                            <button style={{ marginLeft: "390px" }} className="buttons" onClick={registerUser}>Register</button>
                        </div>
                    </div>
                </form >

            </div>

        </div >

    );
}
export default Registration;