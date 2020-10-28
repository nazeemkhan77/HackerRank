var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require("../app");
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);


describe("API /", () => {
it("should respond with 200 status", (done) => {
    chai
    .request(app)
    .get('/')
    .end((err, res) => {
        res.should.have.status(200);
        done();
    });
});
});


// write more unit tests