"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha;

const { expect } = chai;


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