import { updateUsernameQuery, updateEmailQuery, updatePasswordQuery, findUsernameQuery, findEmailQuery, uploadAvatarFileQuery
    , findAdminQuery, findUserQuery, updateUserQuery, deleteUserQuery,createAccountQuery } from "../queries/user.queries";
import { emailUpdateQuery } from "../queries/auth.queries";
    import { findUserbyEmailQuery } from "../queries/auth.queries";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import transporter from "../utils/transporter";

export const updateUsernameService = async (id, username) => {
    try{
        const trimmedUsername = username.trim();
        if (trimmedUsername === '') {
            throw new Error("Username cannot be just whitespace");
        }
        const check = await findUsernameQuery(trimmedUsername);
        if (check) throw new Error("Username already exist");
        await updateUsernameQuery(id, trimmedUsername)
    } catch (err){
        throw err
    }
}
export const updateEmailService = async (id, email) => {
    try{
        if (!email.trim()) {
            throw new Error('Email is required');
        }
        const check = await findEmailQuery(email);
        if (check) throw new Error("Email already exist");

        const res =await emailUpdateQuery(id, email)
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error("JWT_SECRET_KEY is not set in the environment");
        }

        const tokenVerification = jwt.sign({ email }, secretKey, {
            expiresIn: "1hr"
        });
        const temp = await fs.readFileSync(
            path.join(__dirname, "../template_email", "email-verif.html"),
            "utf-8"
        );
        const emailVerificationLink = `${process.env.VITE_API_URL}auth/verify-email?token=${tokenVerification}`
        const tempCompile = await handlebars.compile(temp);
        const tempResult = tempCompile({ email: email, link: emailVerificationLink });
        const gmailUser = process.env.GMAIL_USER;
        if (typeof gmailUser !== 'string') {
            throw new Error("GMAIL_USER is not set in the environment");
        }

        if (typeof email !== 'string') {
            throw new Error("Recipient email is invalid");
        }

        await transporter.sendMail({
            from: gmailUser,
            to: email,
            subject: "Email Confirmation",
            html: tempResult,
        });

        return res;
        // await updateEmailQuery(id, email)
    } catch (err){
        throw err
    }
}
export const updatePasswordService = async (id, password) => {
    try{
        if (!password.trim()) {
            throw new Error('password is required');
        }
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
        if (!username.trim() || !email.trim()) {
            throw new Error('Username, email, password, and role are required fields');
        }
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
        if (!username.trim() || !email.trim() || !password.trim() || !roleId.trim()) {
            throw new Error('Username, email, password, and role are required fields');
        }
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