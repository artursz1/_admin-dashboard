import React, { useContext } from 'react';
import { Box } from "@mui/system";
import Header from "../../components/Header";
import { UserContext } from "../../App";

const Informations = () => {

    const { loggedInUsername } = useContext(UserContext);
    console.log('Logged in username: ', loggedInUsername);

    return <Box m="20px">
        <Box display="flex" justifyContent="space-between" align-items="center">
            <Header title="INFORMATIONS" subtitle="SUICIDE | .SS" />
        </Box>
    </Box>
}

export default Informations;