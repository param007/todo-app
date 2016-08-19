$(document).ready(function () {
  'use strict';

  var obj,
    add_data_success = function (response) {
    if (!response.success) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      console.log(response.data);
    }
  },
  add_data_error = function () {
    console.log('ERROR TRIGGERED');
  };

  obj = {token: localStorage.getItem('token')};

  $.ajax({
    type: 'POST',
    data: obj,
    url: '/fetch',
    success: add_data_success,
    error: add_data_error

  });

  $(function () {
    $('#datepicker').datepicker();
  });

  $(function () {
    $('[data-toggle="popover"]').popover();
  });
});
