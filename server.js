const express = require('express');
const apiRoute = require('./routes/api/');
const parser = require('body-parser');
const app = express();
const passport = require('passport')
const PORT = process.env.PORT || 5000;

// middleware telling system
app.use(parser.urlencoded({extended: true}));
app.use(parser.json())

// Passport middlewar
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport)

// Routes
app.use('/api/', apiRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`)
})
