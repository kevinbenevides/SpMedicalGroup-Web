import React, { Component } from 'react';
import './Login.css'
import Axios from 'axios'
import { parse } from 'path';
import { parseJwt } from '../services/auth';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            senha: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value })
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value })
    }

    fazerLogin(event) {
        event.preventDefault();

        Axios.post("https://projetospmedicalgroupwebapi.azurewebsites.net/api/Login", {
            email: this.state.email,
            senha: this.state.senha
        })

            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    localStorage.setItem("usuario-Spmedgroup", data.data.token);
                    console.log(parseJwt().Role);
                    if (parseJwt().Role === "Administrador") {
                        this.props.history.push("/homeadmin");
                    } else if (parseJwt().Role === "Medico") {
                        this.props.history.push("/homemedico")
                    } else if (parseJwt().Role === "Paciente") {
                        this.props.history.push("/homepaciente")
                    }
                } else {
                    alert('Email ou senha inválido')
                }
            })
            .catch(erro => {
                console.log(erro);
                this.setState({ erroMensegem: 'Email ou senha inválido' })
            })
    }


    render() {
        return (
            <div>

                <section className="main-cadastro" >
                    <div className="main-div__cadastro">
                            <div className="img__login"><div className="img__overlay"></div></div>

                            <div className="item__login container-formulario">
                                <div className="main-div__content">
                                <div className="row">
                                    <div className="item titulo-formulario" id="item__title">
                                        <h2 className="text__login" id="item__description">
                                            Login
                                        </h2>
                                    </div>
                                    <form onSubmit={this.fazerLogin.bind(this)}>
                                        <div className="item item-formulario">
                                            <p>E-mail</p>
                                            <input
                                                className="input__login"
                                                placeholder="Digite seu e-mail"
                                                type="text"
                                                value={this.state.email}
                                                onChange={this.atualizaEstadoEmail.bind(this)}
                                                name="username"
                                                id="login__email"
                                            />
                                        </div>
                                        <div className="item item-formulario">
                                            <p>Senha</p>
                                            <input
                                                className="input__login"
                                                placeholder="Digite sua senha"
                                                type="password"
                                                value={this.state.senha}
                                                onChange={this.atualizaEstadoSenha.bind(this)}
                                                name="password"
                                                id="login__password"
                                            />
                                        </div>
                                        <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensegem}</p>
                                        <div className="item item-formulario-btn">

                                            <button type="submit" className="btn btn__login" id="btn__login">
                                                Login
                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default Login