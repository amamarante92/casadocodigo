//módulo que configura a autenticação do sistema

const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/usuario-dao');
const db = require('./database');
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
            const usuarioDao = new UsuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                    //Se não houver nenhum usuário, ou se a senha for
                    //diferente da senha correta:
                    if(!usuario || senha != usuario.senha){
                        //erro, usuário, objeto contendo informações
                        return done(null, false, {
                            mensagem: 'Login ou senha incorretos!'
                        });
                    }

                    //Aqui o usuario é autenticado com sucesso
                    return done(null, usuario);
                })
                .catch(erro => done(erro,false));
        }
    ));
    //serializando a sessão
    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        };
        done(null, usuarioSessao);
    })

    //deserialização
    passport.deserializeUser((usuarioSessao, done)=>{
        done(null, usuarioSessao);
    });

    //informações da sessão em si
    app.use(sessao({
        //string da autenticação, gerada de forma aleatória
        secret: 'node alura',
        genid: function(req) {
            return uuid();
        },
        resave: false,
        saveUninitialized:false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (req, resp, next){
        req.passport = passport;
        next();
    })

};