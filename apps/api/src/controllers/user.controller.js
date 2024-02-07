import { updateUsernameService, updateEmailService, updatePasswordService, uploadAvatarFileService,findAdminService, findUserService,
    updateUserService, deleteUserService, createAccountService } from "../services/user.services";

export const updateUsernameController = async (req, res) => {
    try{
        const {id} = req.params
        const {username} = req.body
        await updateUsernameService(id, username)
        return res.status(200).json({
            message: "change Username Success",
          });
    } catch (err){
        return res.status(500).json({
            message: err.message,
          });
    }
}
export const updateEmailController = async (req, res) => {
    try{
        const {id} = req.params
        const {email} = req.body
        await updateEmailService(id, email)
        return res.status(200).json({
            message: "change email Success",
          });
    } catch (err){
        return res.status(500).json({
            message: err.message,
          });
    }
}
export const updatePasswordController = async (req, res) => {
    try{
        const {id} = req.params
        const {password} = req.body
        console.log(password)
        await updatePasswordService(id, password)
        return res.status(200).json({
            message: "Change Password Success",
          });
    } catch (err){
        return res.status(500).json({
            message: err.message,
          });
    }
}

export const uploadAvatarFileController = async (req, res) => {
    try{
        const {id} = req.params
        await uploadAvatarFileService(id, req.file?.filename)
        return res.status(200).json({
            message: "Upload Avatar success",
        });
    } catch (err){
        return res.status(500).json({
            message: err.message
        });
    }
}

export const findUserController = async (req, res) => {
    try {
      const {page, pageSize } = req.query
      const response = await findUserService(page, pageSize)
      return res.status(200).json({
        message: 'success',
        data: response,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  }

  export const findAdminController = async (req, res) => {
    try {
      const response = await findAdminService()
      return res.status(200).json({
        message: 'success',
        data: response,
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  }

  export const updateUserController = async (req, res) => {
    try {
      const { id } = req.params
      const { username, email, password, roleId, warehouse } = req.body
      await updateUserService(id, username, email, password, roleId, warehouse)
      return res.status(200).json({
        message: 'success',
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      })
    }
  }
  
  export const deleteUserController = async (req, res) => {
      try {
          const {id} = req.params
          await deleteUserService(id)
          return res.status(200).json({
              message: 'success',
            })
      } catch (err){
          return res.status(500).json({
              message: err.message
          })
      }
  }

  export const createAccountController = async (req, res) => {
    try {
      const { username, email, password, roleId } = req.body;
  
      const result = await createAccountService(username, email, password, roleId);
  
      return res.status(200).json({
        message: "Create Account Success",
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  };