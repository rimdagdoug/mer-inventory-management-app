import React from 'react';
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
        <Card >
            <div className={styles.form}>
                <div className='--flex-center'>
                    <BiLogIn size={35} color='#999'></BiLogIn>
                </div>
                <h2>Login</h2>

                <form>
                    <input type='text' placeholder='Email' required name='email'></input>
                    <input type='password' placeholder='Password' required name='password'></input>
                    <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
                </form>
                <Link to="/forgot">Forgot Password</Link>
                <samp className={styles.register}>
                    <Link to="/">Home</Link>
                    <p> &nbsp; D'ont have an account? &nbsp;</p>
                    <Link to="/register">Register</Link>
                </samp>
          
            </div>
            
        </Card>
    </div>
  );
};

export default Login; // Ajout du point-virgule ici
