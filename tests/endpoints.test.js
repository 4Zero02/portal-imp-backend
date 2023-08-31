const request = require('supertest');
const express = require('express');
//const bcrypt = require('bcrypt');
const app = require('../app');

const { login } = require('../controller/authController');

// verificar que parametros posso testar e utilizar para avaliação
// elaborar testes para todos endpoints

describe('Login', () => {
    it('Autenticação de usuario', async () => {
        //bcrypt.compare = jest.fn().mockResolveValue(true);

        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send({
            login: "62277318620",
            password: "62277318620"
        });
        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    it('Autenticação falha com credenciais inválidas', async () => {
        
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send({
            login: "62277318620",
            password: "13816849"
        });
        //console.log(response);
        expect(response.statusCode).toBe(400);
        //await expect(login(user, password)).rejects.toThrow('Credenciais inválidas');
      });
});

describe('Titles', () => {
    it('Listagem dos titulos', async () => {
        //bcrypt.compare = jest.fn().mockResolveValue(true);
        // posso fazer o seguinte, faço login, dps pego o token e uso pra fazer os tranmites da function
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send({
            login: "62277318620",
            password: "62277318620"
        });
        const token = response.body.token;
        
        const responseTitle = await request(app)
        .get('/admin/titles')
        .set('Authorization', token);
//        console.log(token);
//        console.log(responseTitle);
        expect(responseTitle.statusCode).toBe(200);
    });

    it('Listagem não autorizada', async () => {
        const responseTitle = await request(app)
        .get('/admin/titles')
        expect(responseTitle.statusCode).toBe(401); 
    });
});


