const req = require('express/lib/request');
const {User, Token, Sequelize} = require('../models/index.js');
const {Op} = Sequelize;
const transporter = require("../config/nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/config.json');

const UserController = {

    create(req, res) {
        if (/^[a-zA-Z]\w{3,14}$/i.test(req.body.password) !== true) {
            return res.send(
              "El primer carácter de la contraseña debe ser una letra, debe contener al  menos 4 caracteres y no más de 15 caracteres y no se pueden usar más  caracteres que letras, números y guiones bajos."
            );
          }
        req.body.role = req.body.role ? req.body.role : "user";
        const hash = bcrypt.hashSync(req.body.password,10)
        User.create({...req.body, password:hash, confirmed: false})
            .then(user => { 
                const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
                const url = 'http://localhost:4000/users/confirm/'+ emailToken
                transporter.sendMail({
                    to: req.body.email,
                    subject: "Confirme su registro",
                    html: `<div style = 'background-image: url("${urlbackground}"); height:100vh;'><h3 style = "color:white; font-size:30px;">Bienvenido ${req.body.name}, estás a un paso de registrarte </h3>
                    <a href="${url}"> Click para confirmar tu registro</a></div>`,
                }).then()
                res.status(201).send({ message: 'Te hemos enviado un correo para confirmar el registro.', user })})
            .catch(err =>{
                console.error(err);
                res.status(400).send({ msg: err.errors[0].message });
            })
    },
    login(req,res){
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then(user=>{
            if(!user.confirmed){
                return res.status(400).send({message:"Debes confirmar tu correo"})
            }
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            token = jwt.sign({ id: user.id }, jwt_secret);
            Token.create({ token, UserId: user.id });
            res.send({ message: 'Bienvenid@' + user.name, user, token });
        })
    },
    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    },
    async confirm(req,res){
        try {
          const token = req.params.emailToken;
          const payload = jwt.verify(token,jwt_secret)
          await User.update({confirmed:true},{
            where:{
              email: payload.email
            }
          })
          res.status(201).send("Usuario confirmado con exito" );
        } catch (error) {
          console.error(error)
        }
    },
    
    
};

module.exports = UserController;