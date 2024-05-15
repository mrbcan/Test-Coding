const AppError = require('./../utils/appError');
const config=require('../dbconfig')
const sendErrorDev = (err, req, res) => {
    //API
    if (req.originalUrl.startsWith('/api')) {
      console.log(config);
      console.log(err)
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      });
    }
    //RENDERED WEBSITE
    console.error('ERROR !!!!', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message
    });
  };

  module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
  
    sendErrorDev(err, req, res);
  };