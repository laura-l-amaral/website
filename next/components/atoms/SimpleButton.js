import { Button } from "@chakra-ui/react";

export function SimpleButton({ onClick, children, isActive }) {
  return (
    <Button
      onClick={onClick}
      border={isActive ? "2px solid #3AA1EB" : "1px solid #DEDFE0"}
      color={isActive ? "#3AA1EB" : null}
      borderRadius="13px"
      width="100%"
      justifyContent="flex-start"
      backgroundColor="white"
      fontFamily="Lato"
      fontWeight="700"
      fontSize="15px"
      letterSpacing="0.1em"
      _hover={{
        backgroundColor: "rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </Button>
  );
}