// Initialise at startup.
window.onload = initialise;

// Register the service worker.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('scripts/serviceworker.js')
        .then((registration) => {
            registration.addEventListener('updatefound', () => {
                // A wild service worker has appeared in reg.installing!
                newWorker = reg.installing;
        
                newWorker.addEventListener('statechange', () => {
                  // Has network.state changed?
                  switch (newWorker.state) {
                    case 'installed':
                      if (navigator.serviceWorker.controller) {
                        // new update available
                        showUpdateAvailable();
                      }
                      // No update available
                      break;
                  }
                });
              });

            console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

if ('serviceWorker' in navigator) {

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }