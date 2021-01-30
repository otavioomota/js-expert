const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Otavio Mota",
        "id": 123,
        "profession": "Javascript Student",
        "birthDay": 1995
      },
      {
        "name": "Joaozinho",
        "id": 321,
        "profession": "Student",
        "birthDay": 2003
      },
      {
        "name": "Ronaldinho Gaucho",
        "id": 213,
        "profession": "Football player",
        "birthDay": 1981
      }
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();