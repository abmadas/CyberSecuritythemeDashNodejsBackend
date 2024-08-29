export default class UserModel{

    constructor(id, email,hpassword,password,role){
        this._id=id;
        this.email=email;
        this.hpassword=hpassword;
        this.password=password;
        this.role=role;
        this.createdAt = new Date().toLocaleString();
        
    }
}