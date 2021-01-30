const https = require('https');

class Service {
   async makeRequest(url){
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on('data', data => resolve(JSON.parse(data)));
        response.on('error', reject);
      });
    });
  };

  async getCharacteristics(url){
    const response = await this.makeRequest(url);
    return {
      name: response.name,
      height: response.height,
      mass: response.mass,
      hairColor: response.hair_color,
      eyeColor: response.eye_color
    }
  }
};

module.exports = Service;
