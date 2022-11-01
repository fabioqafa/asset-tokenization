import { Users } from "@prisma/client"; 
import { prisma } from "../../server";
import bcrypt from 'bcrypt';


class UsersService {

    getAllUsers = async() : Promise<Users[]> => {
        const users = await prisma.users.findMany();
    
        return users;
    }

    getUsersByTenantId = async(tenantId : string) : Promise<Users[]> => {
        const users = await prisma.users.findMany({
            where : {
                tenantId
            }
        });
    
        return users;
    }
    
    getUser = async(username : string) : Promise<Users | null> => {
        const user = await prisma.users.findUnique({
            where : {
                username
            }
        })
    
        return user;
    }

    signUp = async(email: string, username : string, password : string, tenantId : string) : Promise<Users> => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await prisma.users.create({
            data: {
                email,
                username,
                password: hashedPassword,
                tenantId,
                roleId : 2 //by default user
            }
        })

        return newUser;
    }
}

export default UsersService;