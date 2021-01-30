import  mocha  from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import Person from '../src/person.js';

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao 20000 2000-01-01 2021-01-01'
      );
      
      const expected = {
        from: '2000-01-01',
        to: '2021-01-01',
        kmTraveled: '20000',
        vehicles: ['Bike','Aviao'],
        id: '1'
      }

      expect(person).to.be.deep.equal(expected);
  })

  it('should format values', () => {
    const person = new Person({
      from: '2000-01-01',
      to: '2021-01-01',
      kmTraveled: '20000',
      vehicles: ['Bike','Aviao'],
      id: '1'
    });

    const result = person.formatted('pt-br');
    
    const expected = {
      id: 1,
      vehicles: 'Bike e Aviao',
      kmTraveled: '20.000 km',
      from: '01 de janeiro de 2000',
      to: '01 de janeiro de 2021'
    }

    expect(result).to.be.deep.equal(expected);
  })
})