export class UserModel{
    constructor(id,name,email,password,type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;

    }

    static SignUp(name, email,password,type){
        const newUser = new UserModel(
            users.length+1,
            name,
            email,
            password,
            type
        );
        
        users.push(newUser);
        return newUser;
    }

    static SignIn(email,password){
        let user = null;
        for (let index = 0; index < users.length; index++) {
            if(users[index].password === password && users[index].email === email){
                user = users[index];
            }   
        }
        return user;
    }

    static getAllUser(){
        return users;
    }
}

let users = [{
    id: "1",
    name:"vijit",
    email:"shb@x.com",
    password:"pass",
    type:"seller"
}]