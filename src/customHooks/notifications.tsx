import { useToast } from "@chakra-ui/react";
export const useCustomToast = () => {
  const toast = useToast();
  const successAlert = (message: string, position: any = "bottom-right") => {
    return toast({
      position,
      duration: 5000,
      status: "success",
      description: message,
      isClosable: true,
    });
  };

  const errorAlert = (
    errorMessage: string = "Error occurred",
    pos: any = "bottom-right"
  ) => {
    return toast({
      status: "error",
      title: "Error",
      description: errorMessage,
      position: pos,
      isClosable: true,
    });
  };
  return {
    errorAlert,
    successAlert,
  };
};
