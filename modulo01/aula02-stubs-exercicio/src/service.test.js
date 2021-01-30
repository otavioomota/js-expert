const sinon = require('sinon');
const { deepStrictEqual } = require('assert')
const Service = require('./service');

const BASE_URL_1 = 'https://swapi.dev/api/people/1/';
const BASE_URL_2 = 'https://swapi.dev/api/people/10/';

const mocks = {
  luke: require('../mocks/luke.json'),
  obiwan: require('../mocks/obiwan.json')
};

(async() => {
  { 
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    stub
      .withArgs(BASE_URL_1)
      .resolves(mocks.luke);
    stub
      .withArgs(BASE_URL_2)
      .resolves(mocks.obiwan);

    {
      const results = await service.getCharacteristics(BASE_URL_1);

      const expected = {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        hairColor: "blond",
        eyeColor: "blue",
      }

      deepStrictEqual(expected, results);
    }

    {
      const results = await service.getCharacteristics(BASE_URL_2);

      const expected = {
        "name": "Obi-Wan Kenobi",
        "height": "182",
        "mass": "77",
        hairColor: "auburn, white",
        eyeColor: "blue-gray",
      }

      deepStrictEqual(expected, results);
    }
  }
})();