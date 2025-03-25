import fs from "fs";

const fsPromise = fs.promises;

async function log(logData){
    try{
        logData = "\n" + new Date().toString() + ".log data : "+logData; 
        await fsPromise.appendFile("log.txt",logData);
    }catch(err){
        console.log(err);
    }
}

const loggerMiddleware = async(req,res,next)=>{
    if(!req.url.includes("signin") && !req.url.includes("signup"))
    {
        const logdata = `${req.url} - ${JSON.stringify(req.body)}`;
        await log(logdata);
    }
    next();
};

export default loggerMiddleware;