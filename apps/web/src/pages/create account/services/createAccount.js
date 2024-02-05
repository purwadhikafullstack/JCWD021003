import axios from "axios";

export const CreateAccount = async (username,email,password,roleId,openSuccessModal, openErrorModal) => {
    try {
      await axios.post(`http://localhost:8000/api/user/create-account`, {
        username,
        email,
        password,
        roleId,
      });
      openSuccessModal();
      console.log('User account created successfully');
    } catch (err) {
      openErrorModal();
      console.error(err);
      throw new Error('Failed to create user account');
    }
  };