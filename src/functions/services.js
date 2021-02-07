import { Auth } from 'aws-amplify'

export const fetchEmail = async() => {
    let userObject = await Auth.currentUserInfo()
    if(userObject && userObject.attributes && userObject.attributes.email){
        return userObject.attributes.email
    }else {
        return "john.doe@example.com"
    }
}

