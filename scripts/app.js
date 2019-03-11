/*
(function() {
  'use strict';

  window.onload = function() {

    let message = localStorage.getItem("message") || 'Your message will display here';
    $('#message').html(message);
    $('#display').html(message);

  }

  $('#button').click(() => {
    console.log('click')
    let message = $('#message').val();
    console.log(message);
    $('#display').html(message);
    localStorage.setItem("message", message);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
*/

window.addEventListener('load', async e =>  {
  if('serviceWorker' in navigator)  {
    try {
      navigator.serviceWorker.register('service-worker.js');
      console.log('SW Registered');
    } catch (e) {
      console.log('SW reg failed');
    }
  }
});
