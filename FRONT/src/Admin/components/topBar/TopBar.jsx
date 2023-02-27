import "./topBar.css";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { TbSettings } from "react-icons/tb";
import LOGO from "../../../img/LOGOBIGOTIN.jpg";
import { Box, Text } from "@chakra-ui/react";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbarWraper">
        <Box>

        </Box>
        
          <Box w="40%" h="80%" alignContent='center' >
        <Text
              fontSize="5xl"
              textAlign="center"
              fontWeight="bold"
              color="black"
              backgroundColor="white"
              opacity="0.9"
            >
              Mangiar-eAdmin
            </Text>
          </Box>
      
        <Box backgroundColor="white"
              opacity="0.8"
              display='flex'
    align-items= 'center'
    justifyContent='space-evenly'
    w='5%'>
          
            
          
            
          {/* <img src={LOGO} alt="LOGO" className="topAvatar" /> */}
        </Box>
      </div>
    </div>
  );
}
