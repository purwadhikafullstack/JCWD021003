import { updateUsernameQuery, updateEmailQuery, updatePasswordQuery, findUsernameQuery, findEmailQuery, uploadAvatarFileQuery
    , findAdminQuery, findUserQuery, updateUserQuery, deleteUserQuery,createAccountQuery } from "../queries/user.queries";
    import { findUserbyEmailQuery } from "../queries/auth.queries";
import bcrypt from "bcrypt"
export const updateUsernameService = async (id, username) => {
    try{
        const check = await findUsernameQuery(username);
        if (check) throw new Error("Username already exist");
        await updateUsernameQuery(id, username)
    } catch (err){
        throw err
    }
}
export const updateEmailService = async (id, email) => {
    try{
        const check = await findEmailQuery(email);
        if (check) throw new Error("Email already exist");
        await updateEmailQuery(id, email)
    } catch (err){
        throw err
    }
}
export const updatePasswordService = async (id, password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await updatePasswordQuery(id, hashPassword)
        
    } catch (err){
        throw err
    }
}

export const uploadAvatarFileService = async (id, avatar) => {
    try{
        await uploadAvatarFileQuery(id, avatar);
    } catch (err){
        throw err
    }
}

export const findUserService = async (page,pageSize) => {
    try{
        const res = await findUserQuery(page,pageSize)
        return res
    } catch (err){
        throw err;
    }
}

export const findAdminService = async () => {
    try{
        const res = await findAdminQuery()
        return res
    } catch (err){
        throw err;
    }
}

export const updateUserService = async (id, username, email, password, roleId,warehouse) => {
    try{
        let hashPassword;
        
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        }

        await updateUserQuery(id, username, email, hashPassword, roleId,warehouse);
    } catch (err){
        throw err;
    }
}

export const deleteUserService = async (id) => {
    try{
        await deleteUserQuery(id)
    } catch (err){
        throw err;
    }
}

export const createAccountService = async (username, email, password, roleId) => {
    try {

 // CHECK WHETHER OR NOT EMAIL AND USERNAME EXIST
        const check = await findUserbyEmailQuery({ email, username });
        if (check) throw new Error("Email or username already exist");

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const res = await createAccountQuery(username, email, hashPassword, roleId);

        return res;
    } catch (err) {
        throw err;
    }
};