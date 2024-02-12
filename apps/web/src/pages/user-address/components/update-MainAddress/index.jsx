import { Box} from "@chakra-ui/react";
import { updateMainAddress } from "../../services/updateUserAddress";
import toast from "react-hot-toast";

function UpdateMainAddress ({id, userId, onUpdatedMainAddress}){
    const handleUpdateMainAddress = async () => {
        try {
            await updateMainAddress(id, userId);
            onUpdatedMainAddress()
            toast.success('Updated main address')
        } catch (err) {
            toast.error(err.message)
            console.error(err.message);
        }
    }; 
 return (
    <>
        <Box onClick={handleUpdateMainAddress} 
        fontSize={'14px'}
        fontWeight={'700'}>
            Set as Main Address
        </Box>
    </>
 )
}

export default UpdateMainAddress