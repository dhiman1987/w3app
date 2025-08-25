db = db.getSiblingDB('eventsdb');
db.createUser({
  user: "appuser",
  pwd: "app-123",
  roles: [
    {
      role: "readWrite",
      db: "eventsdb"
    }
  ]
});

