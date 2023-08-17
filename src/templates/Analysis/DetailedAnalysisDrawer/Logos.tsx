import { Box } from "@mui/material";
import Image from "next/image";

export const Logos = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    sx={{ paddingTop: 2, paddingBottom: 2, opacity: 0.8 }}
  >
    {/* 
    <Box>
      <Image
        src="/icons/lappis.svg"
        alt="LAPPIS"
        height="40px"
        width={`${324 / 2.075}px`}
      />
    </Box>
    */}
    <Box>
      <Image
        src="/icons/unb.svg"
        alt="Universidade de Brasília"
        height="35.26px"
        width="137.2px"

      />
    </Box>
    <Box>
      <Image
        src="/icons/cgee.svg"
        alt="CGEE"
        height="35.26px"
        width="120.41px"
      />
    </Box>
    <Box>
      <Image
        src="/icons/brasil.svg"
        alt="Governo Federal"
        height="64.96px"
        width="266.04px"
      />
    </Box>
  </Box>
);
