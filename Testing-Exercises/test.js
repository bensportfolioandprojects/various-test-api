const mocha = require('mocha');
const chai = require('chai');
const maths = require('./math');
const index = require('./index')

mocha.describe('Test adding', () => {
  mocha.it('should equal 2', () => {
    chai.expect(2).to.equal(maths.add(1, 1));
  });
  mocha.it('should equal 4', () => {
    chai.expect(4).to.equal(maths.add(2, 2));
  });
  mocha.it.skip('should equal 10', () => {
    chai.expect(10).to.equal(maths.add(5, 6));
  });
});


mocha.describe('Test factorial', () => {
  mocha.it('should equal 1', () => {
    chai.expect(1).to.equal(index.add(1, 1));
  });
  mocha.it('should equal 4', () => {
    chai.expect(4).to.equal(maths.add(2, 2));
  });
  mocha.it.skip('should equal 10', () => {
    chai.expect(10).to.equal(maths.add(5, 6));
  });
});