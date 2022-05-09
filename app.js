// ************ Require's ************
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const methodOverride = require('method-override');// Para poder usar los métodos: PUT y DELETE

const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

// ************ express() - (don't touch) ************
const app = express();

// ************ Template Engine - (don't touch) ************
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');


 // ************ Middlewares - (don't touch) *************

app.use(express.static(path.join(__dirname,'./public'))) // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Necesario para procesar los datos enviados por los formularios
app.use(logger('dev')); 
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Poder usar metodo PUT y DELETE en los formularios vistas ejs.
app.use(session({
    secret: "Gregory House and Luko for the win",
    resave: true,
    saveUninitialized: true
  }
))
app.use(express.json());
app.use(cookieParser());
app.use(userLoggedMiddleware);






// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const indexRouter = require('./src/routes/index');
const productsRouter = require('./src/routes/products');
const dataRouter = require('./src/routes/data');
const usersRouter = require('./src/routes/users');
const paymentsRouter = require('./src/routes/payments')
const unitsRouter = require('./src/routes/unitsMeasure')



app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/data',dataRouter);
app.use('/users', usersRouter)
app.use('/payments',paymentsRouter)
app.use('/units',unitsRouter)

 
const PORT = 3000
app.listen(PORT, ()=>{
  console.log(`##########################\n\nServidor encendido en el puerto ${PORT}!!!!\n\n###########################`);
})



// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
 


 




 
 
