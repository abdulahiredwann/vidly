const winston = require('winston')
// require('winston-mongodb')


module.exports = function(){
    winston.exceptions.handle(
        new winston.transports.Console({colorize:true, prettyPrint:true}),
        
        new winston.transports.File({ filename: 'uncaughtException.log' })
    );
    
    process.on('unhandledRejection', (ex)=>{
        throw ex
    })
    // winston.add(new winston.transports.MongoDB({ 
    //     db: 'mongodb://localhost:27017/vidly',
    //     options: { useUnifiedTopology: true }
    // }));
    winston.add(new winston.transports.File({ filename: 'logged.log' }));
    
    
}