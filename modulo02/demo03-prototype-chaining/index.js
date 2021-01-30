const { deepStrictEqual } = require('assert');

const arr = [];
const obj = {};
const fn = () => {};

//internamente, ojetos literais viram funcões explicitas

console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__);

//__proto__ é a referencia do objeto que possui as propriedades nele
console.log('new Object() is {}?', obj.__proto__ === Object.prototype);
deepStrictEqual(obj.__proto__, Object.prototype)

// o __proto__ de Array é {}
console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype);
deepStrictEqual(arr.__proto__, Array.prototype)


// o __proto__ de Function é {}
console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype),
deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__ === null' ,obj.__proto__.__proto__ === null );
deepStrictEqual(obj.__proto__.__proto__, null);

// Como era implementadas as Classes no es5
function Employee(){}
Employee.prototype.salary = () => 'salary'

function Supervisor(){}
// herda a instância de employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare';

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses';

//podemos chamar via prototype, mas tentar chamar direto dá erro;
console.log('Manager.prototype.salary()', Manager.prototype.salary());
// console.log('Manager.salary()', Manager.salary()); ERRO

//se nao chamar o  'new', o primeiro __proto__ vai ser sempre
// a instancia de Function, sem herdar nossas classes
// Para acessar as classes sem o new, pode acessar via prototype;

console.log('Manager.prototype.__proto__ === Supervisor.prototype', Manager.prototype.__proto__ === Supervisor.prototype);
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary());
deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager();
console.log('manager.salary()', manager.salary());
console.log('manager.profitShare()', manager.profitShare());
console.log('manager.monthlyBonuses()', manager.monthlyBonuses());

deepStrictEqual(manager.__proto__, Manager.prototype);
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)


class T1 {
  ping() { return 'ping'}
}

class T2 extends T1 {
  pong() { return 'pong'} 
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3();

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
deepStrictEqual(t3.__proto__, T3.prototype);
deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);


