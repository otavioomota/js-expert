const Service = require('./service');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');


(async() => {

  const service = new Service();
  
  const spy = sinon.spy(service, service.hasError.name);

  service.execute({
    name: 'Otavio',
    email: 'otavio@exemplo.com'
  });

  service.execute({
    name: 'Otavio2',
    email: 'otavio@exemplo.com'
  });
  
  const expectedCount = 1;
  
  deepStrictEqual(spy.callCount, expectedCount);
  
})();