const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');
//Local - mongodb://localhost:27017/devconnect
//Online - mongodb+srv://MAlvee8141:PASSWORD@chatcluster-lymln.mongodb.net/ChatCluster?retryWrites=true&w=majority

// Connect to MongoDB Database
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use("/api/posts", require("./routes/api/post"));

// Serve static assets if in production
// process.env.NODE_ENV === 'production'
process.env.NODE_ENV = "production";
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));