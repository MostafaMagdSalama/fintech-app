import request from 'supertest';
import app from '../app';

describe('users', () => {
  describe('POST /login', () => {
    // test success login
    it('should return 200 and a token when the user logs in', async () => {
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const response = await request(app).post('/login').send(user);
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
    // test invalid login
    it('should return 401 when the user logs in with invalid credentials', async () => {
      const user = {
        email: 'invalid.email@gmail.com',
        password: 'invalidpassword',
      };
      const response = await request(app).post('/login').send(user);
      expect(response.status).toBe(401);
    });
  });

  describe('POST /signup', () => {
    // test success signup
    it('should return 201 when the user signs up', async () => {
      // should be unique email and phone
      // can be impelemented with faker
      const user = {
        email: `mostafa${Math.floor(Math.random() * 1000)}@gmail.com`,
        password: '123456',
        name: 'Mostafa Salama',
        phone: `01005246${Math.floor(Math.random() * 1000)}`,
      };
      const response = await request(app).post('/signup').send(user);
      expect(response.status).toBe(201);
    });
    // test invalid signup
    it('should return 400 when the user signs up with invalid data', async () => {
      const user = {
        email: 'mostafa1@gmail.com',
        password: '123456',
      };
      const response = await request(app).post('/signup').send(user);
      expect(response.status).toBe(400);
    });
  });
});

describe('account', () => {
  describe('POST /open', () => {
    it('should return 201 and account object when the account is created', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const response = await request(app).post('/account/open').set('Authorization', `Bearer ${userResponse.body.token} `).send({});
      expect(response.status).toBe(201);
    });
  });
  describe('POST /deposit', () => {
    // test success deposit
    it('should return 201 when the deposit is done', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const account = {
        accountId: '8e47f9ff-3e42-4a85-a14e-8500e65541d1',
        amount: 100,
      };
      const response = await request(app).post('/account/deposit').set('Authorization', `Bearer ${userResponse.body.token} `).send(account);
      expect(response.status).toBe(201);
    });
    // test invalid deposit
    it('should return 400 when the deposit is done', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const account = {
        accountId: '123',
        amount: 100,
      };
      const response = await request(app).post('/account/deposit').set('Authorization', `Bearer ${userResponse.body.token} `).send(account);
      expect(response.status).toBe(400);
    });
  });
  describe('POST /withdraw', () => {
    // test success withdraw
    it('should return 201 when the withdraw is done', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const account = {
        accountId: '8e47f9ff-3e42-4a85-a14e-8500e65541d1',
        amount: 100,
      };
      const response = await request(app).post('/account/withdraw').set('Authorization', `Bearer ${userResponse.body.token} `).send(account);
      expect(response.status).toBe(201);
    });
    // test invalid withdraw
    it('should return 400 when the withdraw is done', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const account = {
        accountId: '',
        amount: 100,
      };
      const response = await request(app).post('/account/withdraw').set('Authorization', `Bearer ${userResponse.body.token} `).send(account);
      expect(response.status).toBe(400);
    });
    it('should return 400 when withdraw amout greater that balance  is done', async () => {
      //   login with account to recieve valid token
      const user = {
        email: 'mostafa.salama@gmail.com',
        password: '123456',
      };
      const userResponse = await request(app).post('/login').send(user);
      const account = {
        accountId: '',
        amount: 10000000,
      };
      const response = await request(app).post('/account/withdraw').set('Authorization', `Bearer ${userResponse.body.token} `).send(account);
      expect(response.status).toBe(400);
    });
  });
});
