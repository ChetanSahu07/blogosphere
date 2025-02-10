const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL ) ,
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID ) ,
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID ) ,
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID ) ,
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID ) ,

}

export default config 

// Above we are using string because in typescript only strings are allowed in id 


// Remember that collection is table id and bucket is storage where we store files like images etc 
// Now we need to write some codes so that if we want to extract authentication from appwrite and want to use firebase or any other services 
// then it should be easier process 
// So we will create services 
// So go to appwrite folder and then auth.js 