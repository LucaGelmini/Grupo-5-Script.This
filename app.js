// ************ Require's ************
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const methodOverride = require('method-override');// Para poder usar los métodos: PUT y DELETE

const session = require('express-session');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

const favicon = require('serve-favicon');

 

// ************ express() - (don't touch) ************
const app = express();

// ************ Template Engine - (don't touch) ************
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');


 // ************ Middlewares - (don't touch) *************
app.use(favicon('./favicon.ico'));
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
app.use(cors())
 






// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const indexRouter = require('./src/routes/index');
const productsRouter = require('./src/routes/products');
const dataRouter = require('./src/routes/data');
const usersRouter = require('./src/routes/users');



const paymentsRouter = require('./src/routes/payments')
const cartOrderRouter = require('./src/routes/cartOrder')
const estatusRouter = require('./src/routes/estatus')
const unitsRouter = require('./src/routes/unitsMeasure')
const categoriesRouter = require('./src/routes/categories')
const expositionsRouter = require('./src/routes/exposition')
const rolesRouter = require('./src/routes/roles')
const APIRouter = require('./src/routes/api/tablasSecundarias')
const tablasRouter = require('./src/routes/tablasRouter')
const apiProducts = require('./src/routes/api/products')

const paymentsRouter = require('./src/routes/payments');
const cartOrderRouter = require('./src/routes/cartOrder');
const estatusRouter = require('./src/routes/estatus');
const unitsRouter = require('./src/routes/unitsMeasure');
const categoriesRouter = require('./src/routes/categories');
const expositionsRouter = require('./src/routes/exposition');
const rolesRouter = require('./src/routes/roles');
const APIRouter = require('./src/routes/api/tablasSecundarias');
const apiUsers = require('./src/routes/api/users');
const tablasRouter = require('./src/routes/tablasRouter');
const apiCartOrder = require('./src/routes/api/cartOrder');
const apiOrder = require('./src/routes/api/order');



app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/data',dataRouter);
app.use('/users', usersRouter);


 



 

app.use('/cartOrder', cartOrderRouter); 
app.use('/tablas',tablasRouter)
app.use('/units',unitsRouter);
app.use('/estatus',estatusRouter);
app.use('/expositions', expositionsRouter);
app.use('/payments', paymentsRouter);
app.use('/roles',rolesRouter);
app.use('/categories',categoriesRouter);
app.use('/api', apiUsers);
app.use('/api',  apiCartOrder); 
app.use('/api',  apiOrder); 
app.use('/api/secundarias',APIRouter);
app.use('/api/products', apiProducts);


 
const PORT = 3001
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
    //res.render('error');
    res.send(res.locals.message)
  });
 


 




 
 
