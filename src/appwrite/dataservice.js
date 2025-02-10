import config from "../config/config";
import { ID , Client , Databases , Storage , Query } from 'appwrite'

export class DatabaseService{
    client = new Client() ;
    databases ; // here we are using databases instead of account 
    bucket ; // storage is called as bucket 

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client) ;
        this.bucket = new Storage(this.client) 
    }

    // creating a function to store something inside database 
    async createPost({ title , slug , content, featuredImage, status , userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId , config.appwriteCollectionId , slug , 
                {
                    title ,
                    content , 
                    featuredImage,
                    status,
                    userId
                }
            )
            // In the above, slug is nothing but the id of an post that we will pass by ourself 
            // SYNTAX ::
            // this.databases.createDocument( databaseid , collectionid , unique_documentid , {anything file which you need to pass whose attribute is there in collection})
        }catch(err){
            console.log("createPost error" , err );
        }
    }

    // creating funtion for updating document 

    async updatePost( slug, { title , status , content , featuredImage }){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("updatePost error" , error);
        }
    }

    // creating funtion for deleting document or post 

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true ;
        } catch (error) {
            console.log("deletePost error" , error );
            return false ;
        }
    }

    // creating funtion for fetching any one post 

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId ,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("getPost error" , error) ;
            return false ;
        }
    }

    // creating funtion for fetching all posts 
    // so here we will fetch the posts only which are active in status 

    async getPosts( queries = [ Query.equal("status" , "active") ]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("getPosts error" , error ) ;
            return false ; 
        }
    }

    // Now we need to create functions for uploading the files in bucket(storage)

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("uploadFile error" , error );
            return false ; 
        }
    }

    // creating funtion for deleting the file 

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true ; 
        } catch (error) {
            console.log("deleteFile error" , error );
            return false ; 
        }
    }

    // Let us now create a function to get file preview 
    // this is very fast so it do not return promises 
    // so need to create async funtions 

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const databaseService = new DatabaseService()

export default databaseService 