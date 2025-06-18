import { Client , Account , ID } from 'appwrite';
import config from '../config/config';
import axios from 'axios';

export class AuthService {

    client = new Client() ;
    account ; // This account is a varible and i want that it will be crated when AuthService's object will be created 

    //lets create constructor 

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client)
    }

    // Creating a method for creation of account 
    async createAccount ({ email , password , name }){
        try{
            const userAccount =  await this.account.create( ID.unique() , email , password , name ) ;
            if( userAccount ){
                // we call another method 
                return this.login({email,password})
            }
            else{
                return userAccount ;
            }
        }catch(error){
            throw error ;
        }
    }

    // creating login function 

    async login({email, password}){


        try{
            return await this.account.createEmailPasswordSession( email  , password ) ;
        }catch(error){
            throw error ; 
        }
    }

    // creating funtion for checking that currently logged in or not 

    async getCurrentUser(){

        try {
            const userData = await axios.get("api/v1/users/get-current-user",
                {withCredentials:true}
            );
            console.log(userData);
            
        } catch (error) {
            
        }
        
        // try{
        //     return await this.account.get() ;
        // }catch(error){
        //     console.log( "getcurrentuser error" , error );
        // } 

        // if nothing will happen then we will return null 
        return null ;
    }

    // creating funtion for logging out 

    async logout(){
        try{
            await this.account.deleteSessions() ;
        }catch(error){
            console.log("logout error" , error )
        }
    }
}

const authservice = new AuthService();
// This is object of authservice 

export default authservice 
