$(document).ready(function () {
  'use strict';

  var add_data_success = function (response) {
    if (!response.success) {
      $('#alert').html(response.msg).show();
    } else {
      localStorage.setItem('token', response.token);
      window.location.href = '/todo';
    }
  },
    add_data_error = function () {
      console.log('ERROR TRIGGERED');
    };

  $('#alert').hide();
  $('#todo-register').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        required: 'Email field can\'t be empty',
        email: 'Insert correct email'
      },
      password: {
        required: 'Choose your password',
        minlength: 'Length should be more than 6.'
      }
    }
  });

  // before login check in browser local data whether token exist or not
  if (localStorage.getItem('token')) {
    window.location.href = '/todo';
  }
  $('#log').on('click', function () {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: $('#todo-register').serialize(),
      success: add_data_success,
      error: add_data_error
    });
  });
});
