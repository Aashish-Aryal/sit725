const expect = require("chai").expect;
const request = require("request");

describe('User API', function() {
    const url = 'http://localhost:3040';

    let testUser = {
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "TestPassword"
    };

    it('should sign up a new user', function(done) {
        request.post({
            url: `${url}/api/signup`,
            json: true,
            body: testUser
        }, (err, res, body) => {
            if (err) {
                console.error("Error during request:", err);
                return done(err);
            }
            console.log("Response body:", body);
            expect(res.statusCode).to.equal(201);
            expect(body).to.be.an('object');
            expect(body.message).to.equal('Sign Up Successful');
            done();
        });
    });

    it('should get all users', function(done) {
        request.get({
            url: `${url}/api/users`,
            json: true
        }, (err, res, body) => {
            if (err) {
                console.error("Error during request:", err);
                return done(err);
            }
            expect(res.statusCode).to.equal(200);
            expect(body).to.be.an('array');
            expect(body.length).to.be.above(0);
            done();
        });
    });

    it('should delete the user', function(done) {
        request.delete({
            url: `${url}/api/delete`,
            json: true,
            body: { email: testUser.email }
        }, (err, res, body) => {
            if (err) {
                console.error("Error during request:", err);
                return done(err);
            }
            expect(res.statusCode).to.equal(200);
            expect(body).to.be.an('object');
            expect(body.message).to.equal('User deleted successfully');
            done();
        });
    });
});
