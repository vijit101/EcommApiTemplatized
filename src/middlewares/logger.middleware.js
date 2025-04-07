import fs from "fs";
import winston, { transports } from "winston";

const fsPromise = fs.promises;



async function log(logData){
    try{
        logData = "\n" + new Date().toString() + ".log data : "+logData; 
        await fsPromise.appendFile("log.txt",logData);
    }catch(err){
        console.log(err);
    }
}

const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    defaultMeta:{service:"requet-logging"},
    transports:[
        new winston.transports.File({filename:"logs.txt"})
    ]
})

const loggerMiddleware = async(req,res,next)=>{
    if(!req.url.includes("signin") && !req.url.includes("signup")) // apart from sign and signup log for other requests
    {
        const logdata = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logdata);
    }
    next();
};

export  {loggerMiddleware,logger,log};