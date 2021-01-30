const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

// Modos de executar e aguardar funções generators com loop
// for await(const i of fibonnaci.execute(3)){};
// const [...results] = fibonnaci.execute(3);

(async () => {
  
  {
    const fibonnaci = new Fibonacci();
    const spy = sinon.spy(fibonnaci, fibonnaci.execute.name);

    for await(const i of fibonnaci.execute(3)){};

    const expectedCallCount = 4;
    deepStrictEqual(spy.callCount,expectedCallCount);
  }

  {
    const fibonnaci = new Fibonacci();
    const spy = sinon.spy(fibonnaci, fibonnaci.execute.name);
    const [...results] = fibonnaci.execute(5);
    // [0] input = 5, current = 0, next = 1 
    // [1] input = 4, current = 1, next = 1 
    // [2] input = 3, current = 1, next = 2 
    // [3] input = 2, current = 2, next = 3 
    // [4] input = 1, current = 3, next = 5
    // [0] input = 5 -> para. 

    //Pega o valor da chamada 2
    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    deepStrictEqual(args, expectedParams);
    deepStrictEqual(results, expectedResult);
  }
})();