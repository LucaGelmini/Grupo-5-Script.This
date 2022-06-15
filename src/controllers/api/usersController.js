 
 
const db = require('../../database/models');
 

const usersController = {
    list: (req, res) => {
        db.User 
        .findAll(
          {
            attributes:['id', 'fullname', 'email', 'role_id'],
            include: [
                {association: 'role'} 
            ]
          }
        )
        .then(users =>{
            return res.status(200).json({ 
                meta:{
                    total: users.length,
                    status: 200,
                    url: 'http://localhost:3001/api/users/list'
                },
                data: users
                 
            })
        })
        .catch(error => res.send(error))     
    },
    pagesList: (req, res) => {
        db.User 
        .findAll(
          {
            attributes:['id', 'fullname', 'email']
          }
        )
        .then(users =>{
            const page = parseInt(req.query.page);
            const limit =  10;
            const startIndex = (page-1)*limit;
            const endIndex = page * limit;
            const results = {};
            
            if(endIndex < users.length){
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }
    
            if(startIndex > 0) {
                results.previus = {
                    page: page - 1,
                    limit: limit
                }
            }
            results.results = users.slice(startIndex, endIndex);
            return res.status(200).json({ 
                meta:{
                    total: users.length,
                    status: 200,
                    url: 'http://localhost:3001/api/users?page='
                },
                data: results 
                 
            })
        })
        .catch(error => res.send(error))       
    },
    detail: (req, res) => {
        db.User
        .findByPk(req.params.id,
            {
                attributes:{exclude: ['password', 'role_id']}
              })
        .then(user => {
            return res.status(200).json({ 
                meta:{
                    total: user.length,
                    status: 200,
                    url: 'http://localhost:3001/api/user/'+req.params.id
                },
                data: user  
            })
        })
    },

    find: (req, res) => {
        db.User 
        .findOne({
            where: {email: req.body.email}
        })
        .then(user =>{
            return res.status(200).json({
                data: user,
                status: 200
            })
        })
        .catch(error => res.send(error)) 
    }
}
 
module.exports = usersController;