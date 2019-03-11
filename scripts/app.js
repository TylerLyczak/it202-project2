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
