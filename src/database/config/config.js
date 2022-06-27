module.exports = {
  "development": {
    "username": "twzqucbiestlkh",
    "password": "34a56f19fa27729f7df6e20a50055625d1fbd61f574a87b96ce092ab76c46f75",
    "database": "bolsonverde_db",
    "host": "ec2-44-206-89-185.compute-1.amazonaws.com",
    "dialect": "postgresql"
  },
  "production": {
    "username": "twzqucbiestlkh",
    "password": "34a56f19fa27729f7df6e20a50055625d1fbd61f574a87b96ce092ab76c46f75",
    "database": "bolsonverde_db",
    "host": "ec2-44-206-89-185.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}
