import { ID, Account, Client } from 'appwrite'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client()

const APPWRITE_ENDPOINT = Config.APPWRITE_ENDPOINT
const APPWRITE_PROJECT_ID = Config.APPWRITE_PROJECT_ID

const CreateUserAccount = {
    email: "",
    password: "", 
    name: ""
}

const LoginUserAccount = {
    email: "",
    password: "" 
}

class AppwriteService {
    account;
    
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    //create a new recore of user inside appwrite
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email, 
                password,
                name
            )
            
            if(userAccount){
                //loginning in the user if account already exists
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite service createAccount error")
            console.log(error)
        }
    }

    //This method called when email and password already has an account
    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite service login error")
            console.log(error)
        }
    }

    async getCurrentUserDetails() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service getCurrentUserDetails error")
            console.log(error)
        }
    }

    async logoutAccount() {
        try {
            //logs out of current account being used
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service logoutAccount error")
            console.log(error)
        }
    }
}

export default AppwriteService;

