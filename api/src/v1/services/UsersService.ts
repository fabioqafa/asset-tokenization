import { Users } from "@prisma/client"; 
import { prisma } from "../../server";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";


class UsersService {

    getAllUsers = async() : Promise<Users[]> => {
        try {
            const users = await prisma.users.findMany();
        
            return users;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    getUsersByTenantId = async(tenantId : string) : Promise<Users[]> => {
        try {
            const users = await prisma.users.findMany({
                where : {
                    tenantId
                }
            });
        
            return users;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    getUser = async(username : string) : Promise<Users | null> => {
        try {
            const user = await prisma.users.findUnique({
                where : {
                    username
                }
            })
        
            return user;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    signUp = async(email: string, username : string, password : string, tenantId : string) : Promise<Users> => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await prisma.users.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    tenantId
                    //roleId : 2 //by default user
                }
            })
    
            return newUser;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    logIn = async(username : string, password : string) : Promise<string> => {
        try {
            const token = jwt.sign({username, password, scope : "admin"}, "1234", {expiresIn : "1h"})
        
            return token;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
}

export default UsersService;