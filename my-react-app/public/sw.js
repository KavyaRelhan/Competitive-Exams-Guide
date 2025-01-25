self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  console.log('Push received:', data);

  const notificationOptions = {
    body: data.body || 'No content available',
    icon: './notify.jpg', 
    badge: './notify.jpg', 
    vibrate: [200, 100, 200], 
    requireInteraction: true,
    data: { url: data.url }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', notificationOptions)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url;
  if (urlToOpen) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
    );
  }
});