import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import '../../src/styles/Login.scss'
import authServices from "./authServices";



const Login=({onLogin})=>{
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const navigate = useNavigate();


    //este metodo aun no esta siendo usada pero servira para actualizar el estado del componente 
    const handleLogin = async(e) =>{
        e.preventDefault();

        try{
            const data = await authServices.login(usuario , contraseña);
            setAuthenticated(true);
            setuUerRole(data,role);
            
        }catch(error){
            console.error('Registro fallido' , error)
        }
    }    


    const handleSubmit = (e)=>{
        e.preventDefault();

        if(username == 'admin'){
            onLogin('admin');
            navigate('/admin/')
        }else if(username === 'user'){
            onLogin('user');
            navigate('/user/')
        }else{
            alert('Credenciales incorrectas')
        }



    }


    return(
        <div className="login-container">
            <div className="logo-view"></div>
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Secion</h2>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) =>setUsername(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                
            </form>
        </div>
    )
}

export default Login;