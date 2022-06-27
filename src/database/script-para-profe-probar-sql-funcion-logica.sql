
-- PARA QUE PRUEBE EL PROFESOR QUE TODO ESTA RELACIONADO Y TRAE LA INFO CORRECTAMENTE
select * from orders
inner join carts_orders on orders.cart_order_id  = carts_orders.id 
inner join users on carts_orders.user_id  = users.id 
inner join products on orders.product_id = products.id 

-- MOSTRAR UN CASO DE CART_ORDER - CON LA INFO QUE SE MOSTRAR�A AL CLIENTE - EL ID CART_ORDER 11 Y 19 TIENE VARIAS ORDENES
-- Se puede ver ID cart_order 11 
-- --> es un solo cart_order Nº 11
-- --> tiene varias ordenes
-- --> tiene varios productos asociados
-- --> c/u con su precio descuento y cantidad seleccionada 
-- --> tiene su total por orden es decir subtotales de un cart_order -- no dan los numeros preci*cantidad por es ejemplo
-- --> tiene un total asociado a un id cart_order
-- --> se ve que un cart_order pertenece a un solo user.
-- --> se ve que dentro del cart_order sus ordenes tiene el mismo metodo de pago y mismo estado "confirmado".

select carts_orders.id ,orders.id  , products.name , products.price , products.discount, orders.product_quantity, orders.total , carts_orders.total , users.fullName, payments.`method`, status.name  from orders
inner join carts_orders on orders.cart_order_id  = carts_orders.id 
inner join users on carts_orders.user_id  = users.id 
inner join products on orders.product_id = products.id
inner join payments on carts_orders.payment_id = payments.id 
inner join status on carts_orders.status_id = status.id 
where carts_orders.id = 11