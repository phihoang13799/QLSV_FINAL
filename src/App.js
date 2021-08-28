import { useState } from "react";

import LoginForm from "./LoginForm";
import Main from './Main';


function App(){
    const adminUser = {
        email: "admin@gmail.com",
        password: "admin123"
    }

const[user, setUser] = useState({name:"", email:"", password:""});
const [error, setError] = useState("");

const Login  = details => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password){
    console.log("Login in")
    setUser({
        // name: details.name,
        email: details.email,
        password: details.password,
    });

    }else{
        console.log("Your email or password is incorrect");
        setError("Your email or password is incorrect");
    }
}

const Logout = () => {
     setUser({email: "",password: "",});
}

return(
    <div >
        {(user.email != "") ? (
            <div className="Welcome">
                <Main handleLogout={Logout} />
                {/* <button onClick={Logout}>Logout</button> */}
            </div>

        ) : (
            <LoginForm Login={Login} error={error} />   
        )}

    </div>
)
}

export default App;