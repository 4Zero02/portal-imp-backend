const request = require('supertest');
const express = require('express');
//const bcrypt = require('bcrypt');
const app = require('../app');

const { login } = require('../controller/authController');
const user = {
        login: "62277318620",
        password: "62277318620"
};
const fakeUser = {
    login:"62277318620",
    password: "62294518384"
};

// verificar que parametros posso testar e utilizar para avaliação
// elaborar testes para todos endpoints

describe('Login', () => {
    it('Autenticação de usuario', async () => {
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send(user);
        expect(response.statusCode).toBe(200);
    });

    it('Autenticação falha com credenciais inválidas', async () => {
        
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send(fakeUser);
        expect(response.statusCode).toBe(400);
      });
});

describe('Titles', () => {
    it('Buscar todos titulos', async () => {
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send(user);
        const token = response.body.token;
        
        const responseTitle = await request(app)
        .get('/admin/titles')
        .set('Authorization', token);
        // const data = Object.keys(responseTitle.body);
        // const quantidadeDeItens = data.length;
        // console.log(data);
        // console.log(quantidadeDeItens);
        //console.log(body);
        expect(responseTitle.statusCode).toBe(200);
    });

    it('Buscar titulo por id', async () => {
        app.post('/auth/login', login);
        const response = await request(app)
        .post('/auth/login')
        .send(user)

        const token = response.body.token;

        const responseTitle = await request(app)
        .get('/admin/titles/1')
        .set('Authorization', token);

        // const data = responseTitle.body;
        //console.log(data);
        // console.log(quantidadeDeItens);
        const data = Object.keys(responseTitle.body);
        const quantidadeDeItens = data.length;
        expect(data[0]).toBe('id');
    });

    // não entendi esse
    it('Listagem não autorizada', async () => {
        const responseTitle = await request(app)
        .get('/admin/titles')
        expect(responseTitle.statusCode).toBe(401); 
    });
});


