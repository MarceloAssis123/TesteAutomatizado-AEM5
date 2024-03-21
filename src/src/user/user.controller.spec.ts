import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('UserController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Auth', () => {
        it('(Sucesso) deve retornar o usuário', async () => {
            const userCredentials = { "email": process.env.EMAIL_LOGIN_TEST, "password": process.env.PASSWORD_LOGIN_TEST }
            const responseBody = { 'id': 1, 'role': 'Leader', 'ongid': 1, 'teacherid': null, "email": process.env.EMAIL_LOGIN_TEST, "password": process.env.PASSWORD_LOGIN_TEST }

            const testeSucesso = await request(app.getHttpServer())
                .post('/user/auth')
                .send(userCredentials)
                .then((response) => {
                    expect(response.body).toStrictEqual(responseBody)
                })
            return testeSucesso
        });
    });

    describe('Auth', () => {
        it('(Erro) deve retornar uma chave vazia', async () => {
            const userCredentials = { "email": "a@gmail.com", "password": "falso" }

            const testeErro = await request(app.getHttpServer())
                .post('/user/auth')
                .send(userCredentials)
                .then((response) => {
                    expect(response.body).toStrictEqual({})
                })
            return testeErro
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
