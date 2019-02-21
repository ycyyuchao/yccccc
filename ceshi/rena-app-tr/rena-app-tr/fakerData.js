var faker =require('faker');
var lodash = require('lodash');
faker.locale = "zh_CN";

module.exports = function(){
    return {
      people: lodash.times(100,function (n) {
        return {
          id: n,
          name: faker.name.findName(),
          avatar:faker.internet.avatar(),
          img: faker.image.image(),
          time:faker.date.past(),
          text:faker.lorem.text(),
          num:faker.random.number()
        }
      })
    }
  }