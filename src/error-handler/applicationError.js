export class ApplicationError extends Error{
    // doing this so that error class can also send the status code hence it does not handle all 
    // errors as 503 but in accordane to the status code send 
    constructor(message,code){
        super(message);
        this.code = code;
    }
}