//módulo que configura a autenticação do sistema

const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (app) => {

    //configurando a dependencia que fará a autenticação
    //com uma nova estratégia de autenticação local.
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            //função que executa a lógica de autenticação do usuário
            
        }
    ));

};