import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import flowWhite from "../assets/images/flow_white.svg";
import google from "../assets/images/google.svg";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser } from "../features/user/userAction";
import axios from 'axios';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upLabelName, setUpLabelName] = useState(false);
  const [upLabelEmail, setUpLabelEmail] = useState(false);
  const [upLabelPassword, setUpLabelPassword] = useState(false);
  const [upLabelPasswordConfirm, setUpLabelPasswordConfirm] = useState(false);

  const handleClickLabelName = (e) => {
    setUpLabelName(!upLabelName);
    if (e.target.value !== '') {
      setUpLabelName(true);
    }
  }
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
  const handleClickLabelPasswordConfirm = (e) => {
    setUpLabelPasswordConfirm(!upLabelPasswordConfirm);
    if (e.target.value !== '') {
      setUpLabelPasswordConfirm(true);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
      accept_terms: e.target.accept_terms.checked,
      secretKey: '1234',
    };
    dispatch(addUser(formData));
    try {
      await axios.get(`http://localhost:8000/verified?name=${formData.name}&email=${formData.email}&password=${formData.password}&confirm_password=${formData.confirm_password}&accept_terms=${formData.accept_terms}&secretKey=${formData.secretKey}`)
      navigate('/verified');
    } catch (error) {
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
            <h1>Bienvenue sur Flow !</h1>
            <p>Merci d'entrer vos informations</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <div>
                <input type="text" name="name" id="name" onFocus={handleClickLabelName} onBlur={(e) => { (e.target.value === '') && setUpLabelName(false) }} onChange={handleClickLabelName} required />
                <label htmlFor="name" className={upLabelName ? 'up-label' : ''}>Nom</label>
              </div>
              <div>
                <input type="email" name="email" id="email" onFocus={handleClickLabelEmail} onBlur={(e) => { (e.target.value === '') && setUpLabelEmail(false) }} onChange={handleClickLabelEmail} required />
                <label htmlFor="email" className={upLabelEmail ? 'up-label' : ''}>Email</label>
              </div>
              <div>
                <input type="password" name="password" id="password" onFocus={handleClickLabelPassword} onBlur={(e) => { (e.target.value === '') && setUpLabelPassword(false) }} onChange={handleClickLabelPassword} required />
                <label htmlFor="password" className={upLabelPassword ? 'up-label' : ''}>Mot de passe</label>
              </div>
              <div>
                <input type="password" name="confirm_password" id="confirm_password" onFocus={handleClickLabelPasswordConfirm} onBlur={(e) => { (e.target.value === '') && setUpLabelPasswordConfirm(false) }} onChange={handleClickLabelPasswordConfirm} required />
                <label htmlFor="confirm_password" className={upLabelPasswordConfirm ? 'up-label' : ''}>Confirmation du mot de passe</label>
              </div>
            </div>
            <div className="end-form">
              <div>
                <input type="checkbox" name="accept_terms" id="accept_terms" required />
                <label htmlFor="accept_terms">
                  J'accepte les <Link to="/terms-of-use" className="underline"> Conditions Générales </Link>
                </label>
              </div>
            </div>
            <div className="buttons">
              <button type="submit" className="large-button pink">S'incrire</button>

              <Link to="/" className="large-button">
                <img src={google} alt="icon de Google" />
                S'inscrire avec Google
              </Link>
            </div>
          </form>
          <p>Déjà inscrit ? <Link to="/login" className="underline">Se connecter</Link></p>
        </div>
      </section>
    </div>
  );
}
