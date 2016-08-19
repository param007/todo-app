var knex = require('knex')({
  client: 'mysql',
  connection: {
  host: '127.0.0.1',
  user: 'root',
  password: 'hello',
  database: 'todo'}
});

exports.adduser = function (data, cb) {
  'use strict';

  knex('user').insert({email: data.email,
    password: data.password
  })
  .then(function (ret) {
    console.log(ret);
  })
  .catch(function (error) {
    cb(error);
  });
};

exports.select = function (data, cb) {
  'use strict';

  knex.select().table('user').where({email: data.email,
    password: data.password
    })
  .then(function (ret) {
    cb(ret);
  })
  .catch(function (error) {
    cb(error);
  });
};

exports.addtodo = function (data, cb) {
  'use strict';

  knex('todo').insert({email: data.email,
  date: data.date,
  location: data.location,
  time: data.time
  })
  .then(function (ret) {
    cb(ret);
  })
  .catch(function (error) {
    cb(error);
  });
};

exports.searchtodo = function (data, cb) {
  'use strict';

  knex.select().table('todo').where({user_id: data})
   .then(function (ret) {
     cb(ret);
   })
   .catch(function (error) {
     cb(error);
   });
};
