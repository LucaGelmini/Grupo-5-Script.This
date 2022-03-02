const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve(__dirname,'./public')
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(express.static(publicPath))

const indexRouter = require('./src/routes/index')
const loginRouter = require('./src/routes/login')
const productCartRouter = require('./src/routes/productCart')
const registerRouter = require('./src/routes/register')
const detailRouter = require('./src/routes/detail');
const createRouter = require('./src/routes/create');
const editRouter = require('./src/routes/edit');
const listRouter = require('./src/routes/list');

// view engine setup
app.set('views',path.join(__dirname,'/src/views')) 
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/productCart',productCartRouter);
app.use('/detail', detailRouter);
app.use('/create', createRouter);
app.use('/edit', editRouter);
app.use('/list', listRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  

app.listen('3000', ()=>{
    console.log('Servidor encendido !');
})

 




 
 
