const { faker } = require('@faker-js/faker');
const { createRandomGenerator } = require('../utils/randomGenerator');

function generateFakeData(region, errors, seed, page) {
  const rng = createRandomGenerator(seed, page);
  const records = [];
  const locales = {
    'Poland': 'pl',
    'USA': 'en',
    'Georgia': 'ka',
    'Germany': 'de', 
    'France': 'fr',    
    'Russia': 'ru',    
  };
  
  faker.locale = locales[region];

  // Calculate starting ID based on the page number (page 1 starts at 1, page 2 starts at 21, etc.)
  const startId = page * 20 + 1;

  for (let i = 0; i < 20; i++) {
    let name = faker.name.fullName();
    let address = faker.address.streetAddress();
    let phone = faker.phone.number();

    if (rng() < errors / 10) {
      name = name.split('').reverse().join('');
    }

    records.push({
      id: startId + i, // Adjusted to continue the ID based on the page number
      identifier: faker.datatype.uuid(),
      name,
      address,
      phone,
    });
  }

  return records;
}

module.exports = {
  generateFakeData,
};
