// // Serve static files (built React app)
// app.use(express.static(path.join(__dirname, '../client', '../build')));

// Use Routes
app.use('/api', ticketRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Help Desk API');
});

//404 Handler
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//Global error handler
app.use((error, req, res, next) => {
  console.log('Hit global error');
  //Default 500 means internal server error
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
});

module.exports = app;
