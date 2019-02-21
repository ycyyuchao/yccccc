var faker = require('faker');
var lodash = require('lodash');
faker.locale = "zh_CN";

module.exports = function () {
  return {
    people: lodash.times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        age: faker.random.number(),
        avatar: faker.internet.avatar(),
        phone:faker.phone.phoneNumber(),
        email:faker.internet.email(),
        text: faker.lorem.text(),
        address: faker.address.city()
      }
    }),
    news: lodash.times(500, function (n) {
      return {
        id: n,
        title: faker.name.title(),
        date: faker.date.weekday(),
        text: faker.lorem.text(),
      }
    })
  }
}
