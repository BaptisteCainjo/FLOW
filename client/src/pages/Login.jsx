import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flowWhite from "../assets/images/flow_white.svg";
import google from "../assets/images/google.svg";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [upLabelEmail, setUpLabelEmail] = useState(false);
  const [upLabelPassword, setUpLabelPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleClickLabelEmail = (e) => {
    setUpLabelEmail(!upLabelEmail);
    if (e.target.value !== '') {
      setUpLabelEmail(true);
    }
  }

  const handleClickLabelPassword = (e) => {
    setUpLabelPassword(!upLabelPassword);
    if (e.target.value !== '') {
      setUpLabelPassword(true);
    }
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post(`http://localhost:8000/api/users/login`, {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage('Veuillez remplir tous les champs');
      }else if (error.response.status === 401) {
        setErrorMessage('Email ou mot de passe incorrect');
      } else {
        setErrorMessage('Une erreur est survenue');
      }
      console.error('Erreur lors de la connexion', error)
    }
  }

  return (
    <div className="login">
      <section>
        <div className="flow-logo">
          <img src={flowWhite} alt="Logo de l'application Flow'" />
        </div>

        <div className="line"></div>
        <div className="login-form">
          <div className="header">
            <h1>Bon retour sur Flow !</h1>
            <p>Merci d'entrer vos informations</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div>
                <input type="email" name="email" id="email" onFocus={handleClickLabelEmail} onBlur={(e) => (e.target.value === '') && setUpLabelEmail(false)} onChange={handleClickLabelEmail} />
                <label htmlFor="email" className={upLabelEmail ? 'up-label' : ''}>Email</label>
              </div>
              <div>
                <input type="password" name="password" id="password" onFocus={handleClickLabelPassword} onBlur={(e) => (e.target.value === '') && setUpLabelPassword(false)} onChange={handleClickLabelPassword} />
                <label htmlFor="password" className={upLabelPassword ? 'up-label' : ''}>Mot de passe</label>
                <p>{errorMessage}</p>
              </div>
            </div>
            <div className="end-form">
              <div>
                <input type="checkbox" name="memory-check" id="memory-check" />
                <label htmlFor="memory-check">Se souvenir</label>
              </div>
              <Link to="password-reset" className="underline">Mot de passe oublié ?</Link>
            </div>
            <div className="buttons">
              <button type="submit" className="large-button pink">Se connecter</button>
              <Link to="/" className="large-button">
                <img src={google} alt="icon de Google" /> Se connecter avec Google
              </Link>
            </div>
          </form>
          <p>Pas de compte ? <Link to="/register" className="underline">S'inscrire</Link></p>
        </div>
      </section>
    </div>
  );
}