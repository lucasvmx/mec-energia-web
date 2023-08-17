import Image from "next/image";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{ backgroundColor: "#fff" }}
      height="220px"
      minHeight="220px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* 
      <Typography variant="body2" color="white">
        © 2022 • Suporte técnico: pessoa@mec.gov.br
      </Typography>
      */}

      <Box display="flex" justifyContent="center" alignItems="center" gap="60px">
        {/* <Box>
          <Image
            src="/icons/lappis.svg"
            alt="LAPPIS"
            height="40px"
            width={`${324 / 2.075}px`}
          />
        </Box> */}

        <Box>
          <Image
            src="/icons/unb_cor.svg"
            alt="Universidade de Brasília"
            height="38px"
            width="147.84px"
          />
        </Box>

        <Box>
          <Image
            src="/icons/cgee_cor.svg"
            alt="CGEE"
            height="37.86px"
            width="129.39px"
          />
        </Box>

        <Box>
          <Image
            src="/icons/brasil_cor.svg"
            alt="Governo Federal"
            height="70px"
            width="286.63px"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
