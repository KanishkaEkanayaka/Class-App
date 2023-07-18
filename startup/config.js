const config = require('config');

module.exports = function(){
    //check whether the jwt.private key is set. otherwise exit the program
    if(!config.get('jwt.privateKey')){
        console.error('FATAL ERROR: jwt.privateKey not defined');
    }

    //check whether the database.location is set. otherwise exit the program
    if(!config.get('database.location')){
        throw new Error('FATAL ERROR: database.location not defined')
    }

    if(!config.get('winston.timezone')){
        throw new Error('FATAL ERROR: winston.timezone not defined');
    }

    if(!config.get('winston.log-level')){
        throw new Error('FATAL ERROR: winston.log-level not defined');
    }

    if(!config.get('winston.database-location')){
        throw new Error('FATAL ERROR: winston.database-location not defined');
    }

    if(!config.get('cloudinary.cloud-name')){
        throw new Error('FATAL ERROR: cloudinary.cloud-name not defined');
    }

    if(!config.get('cloudinary.api-key')){
        throw new Error('FATAL ERROR: cloudinary.api-key not defined');
    }

    if(!config.get('cloudinary.api-secret')){
        throw new Error('FATAL ERROR: cloudinary.api-secret not defined');
    }
}