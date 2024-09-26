const seedrandom = require('seedrandom');

function createRandomGenerator(seed, page) {
  const combinedSeed = `${seed}-${page}`;
  return seedrandom(combinedSeed);
}

module.exports = { createRandomGenerator };
  