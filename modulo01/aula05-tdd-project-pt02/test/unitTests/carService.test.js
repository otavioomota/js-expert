const { describe, it, before } = require('mocha');
const { join  } = require('path')
const CarService = require('../../src/service/carService');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('CarService Suite Tests', () => {

  let carService = {};

  before(() => {
     carService = new CarService({
      cars: carsDatabase
    })
  })

  it('given a carCategory it should return an available car', async () => {
    const result = await carService.test();
  })
})