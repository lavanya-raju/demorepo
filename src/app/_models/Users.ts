export class Users {
    userid : string;
    password:string;
    username:string;
    token:string; 

constructor (userid,password,username,token){
    this.userid = userid;
    this.password = password;
    this.username = username;
    this.token = token;
}
}

