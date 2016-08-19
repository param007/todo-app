var express = require('express'),
  app = express(),
  router = express.Router(),
  path = require('path'),
  user = require('../model/user'),
  jwt = require('jsonwebtoken');

app.set('superSecret', 'abcdef');
router.post('/login', function (req, res) {
  'use strict';

  var obj = req.body,
    res_obj = {
      success: false,
      msg: ''
    },
    token;

  user.select(obj, function (response, err) {
    if (err) {
      res_obj.msg = 'something error occured';
      res.send(res_obj);
    } else if (response.length === 0) {
      res_obj.msg = 'user name doesnt exist';
      res.send(res_obj);
    } else {
      res_obj.success = true;
      token = jwt.sign({userid: response[0].id}, app.get('superSecret'),
      {
        expiresIn: 1440
      });
      res_obj.token = token;
      res.send(res_obj);
    }
  });
});

router.get('/todo', function (req, res) {
  'use strict';

  res.sendFile(path.join(__dirname + '/../views/todo.html'));
});

router.post('/fetch', function (req, res) {
  'use strict';

  var token = req.body.token,
    userid,
    res_obj = {
      success: false,
      msg: ''
    };

  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        res.send(res_obj);
      } else {
        // if everything is good, save to request for use in other routes
        res_obj.success = true;
        userid = decoded.userid;
        user.searchtodo(userid, function (response, error) {
          if (!error) {
            res_obj.user = response;
            res.send(res_obj);
          }
        });
      }
    });
  } else {
    /* if there is no token
    return an error*/
    res.send(res_obj);
  }
});

module.exports = router;
