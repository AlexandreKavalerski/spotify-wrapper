var expect = require('chai').expect;

describe('Main', function(){
    var arr;

    //roda uma vez antes de cada bloco
    beforeEach(function(){
        arr = [1, 2, 3];
    });

    //teste de tipos ou se existe:  smoke test
    it('should be an array', () => {
        expect(arr).to.be.an('array');
    });

    it('should have a size 4 when push another value to the array', function(){
        arr.push(4);
        expect(arr).to.have.lengthOf(4);
        
    });

    it('should have a size of 2 when pop a value from the array', function(){
        arr.pop();
        expect(arr).to.have.lengthOf(2);
    });

    it('should remove the value 3 when use pop in the array', function(){
        arr.pop();
        expect(arr).to.not.include(3);
    });
});
