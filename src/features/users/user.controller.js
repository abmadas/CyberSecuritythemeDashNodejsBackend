import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export default class UserController {
    constructor(){
        this.userRepository =new UserRepository();
    }

    async signUp(req,res){
        try{
            const {id, email, password,role } = req.body;

            const hashedPassword = await bcrypt.hash(password,12)
            const user = new UserModel( id, email, hashedPassword,password, role, );
            await this.userRepository.signup(user);
            res.status(201).send({ message: "User signed up successfully", user });

        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async signIn(req, res) {
      try {
          const { email, password } = req.body;
  
          // Find user by email
          const user = await this.userRepository.findByemail(email);
          console.log(user);
  
          if (!user) {
              return res.status(400).json({ message: "Invalid email or password" });
          }
  
          // Compare password with hashed password
          const isMatch = await bcrypt.compare(password, user.hpassword);
          if (isMatch) {
              // Create a token
              const token = jwt.sign(
                  {
                      userID: user._id,
                      email: user.email,
                  },
                  process.env.JWT_SECRET,
                  {
                      expiresIn: "1h",
                  }
              );
  
              // Return token and role
              return res.status(200).json({
                  token,
                  role: user.role,
              });
          } else {
              return res.status(400).json({ message: "Invalid email or password" });
          }
      } catch (err) {
          console.log(err);
          return res.status(500).send("Something went wrong");
      }
  }
  
}