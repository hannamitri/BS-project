import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId = '1092910563903-qv6jqr7okondoc736k2ivfr2to2e2bp4.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logout made successfully d');
    };
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}
export default Logout;