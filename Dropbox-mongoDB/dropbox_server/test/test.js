var assert = require('assert');
var app = require('../src/App');
var request = require('supertest');
var assert = require('chai').assert;
it('should respond with success flag on', function(done) {
    request(app)
      .post('/api/signUp')
      .send({
        "uname":"test",
        "email":Math.random()+"@admin.com",
    	  "pass":"admin",
    	  "fname":"admin",
    	  "lname":"admin"})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        assert.equal(res.body.success, true);
        done();
      });
 });