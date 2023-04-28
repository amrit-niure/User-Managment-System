var Userdb = require('../model/model')

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message : "Content cannot be empty!"})
        return
    }
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })
    //  save user in the database
    user
    .save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occoured while creating a create operation"
        })
    })
}

// retrive and return all/ single user
exports.find = (req,res)=>{
//return single user
    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message : `User not found with id ${id}`})
                }else{
                    res.send(data)
                }
        })
        .catch(err=>{
            res.status(500).send({message : `Error retriving user with id ${id}`})
        })
    }else{
        // return all users
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occoured while retriving user information"
            })
        })
    }
}

// update a new identified user by user id 
exports.update = (req,res)=>{
        if(!req.body){
            res.status(400).send({message : "Data to update Content cannot be empty!"})
            return
        }
        const id = req.params.id
        Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data=>{
            if(!data){
            res.status(404).send({message : `Cannot Update user with ${id}. Maybe user not found.`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message : "Error update user information"})
    
        })
}


// Delete a user with specified user id in the request 
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(404).send({message : `Cannot delete user with ${id}. Maybe id is wrong.`})
        }else{
            res.send({message : "User was deleted sucessfully"})

        }
    })
    .catch(err=>{
        res.status(500).send({message : "Could not delete user with id " + id})

    })
}

