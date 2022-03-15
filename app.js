// ************ Require's ************
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')// Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();

// ************ Template Engine - (don't touch) ************
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

 // ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname,'./public'))) // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Necesario para procesar los datos enviados por los formularios
app.use(logger('dev')); 
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Poder usar metodo PUT y DELETE en los formularios vistas ejs.





// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const indexRouter = require('./src/routes/index');
const productsRouter = require('./src/routes/products');
const dataRouter = require('./src/routes/data');


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/data',dataRouter)
 
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
  


 




 
 
