const request = require('supertest');  
const app = require('../app'); // Import the app for testing  

describe('Subscription Level Checks', () => {  
    it('should allow Omnia users to access premium features', async () => {  
        const response = await request(app)  
            .post('/premium-feature')  
            .send({ userId: 'user2' });  
        expect(response.statusCode).toBe(200);  
        expect(response.body.message).toBe('Accessed premium feature!');  
    });  

    it('should not allow Free users to access premium features', async () => {  
        const response = await request(app)  
            .post('/premium-feature')  
            .send({ userId: 'user1' }); // Free user  
        expect(response.statusCode).toBe(403);  
        expect(response.body.message).toBe('Insufficient subscription level');  
    });  

    it('should allow Pro users to access pro features', async () => {  
        const response = await request(app)  
            .post('/pro-feature')  
            .send({ userId: 'user4' });  
        expect(response.statusCode).toBe(200);  
        expect(response.body.message).toBe('Accessed pro feature!');  
    });  

    it('should not allow Ultimate users to access Pro features', async () => {  
        const response = await request(app)  
            .post('/pro-feature')  
            .send({ userId: 'user3' }); // Ultimate user  
        expect(response.statusCode).toBe(403);  
        expect(response.body.message).toBe('Insufficient subscription level');  
    });  
});