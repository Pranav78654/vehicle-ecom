const { Country } = require('../../models');

const resolvers = {
  Query: {
    getCountries: async () => await Country.findAll(),
  },
  Mutation: {
    addCountries: async (_, { countries }) => {
      return await Country.bulkCreate(countries.map(country => ({ name: country.name })));
    },
  }
};

module.exports = resolvers;
