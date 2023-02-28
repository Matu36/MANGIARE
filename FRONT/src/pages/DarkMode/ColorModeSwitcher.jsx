import { useColorMode } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon color="black" />}
      onClick={toggleColorMode}
      size="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      aria-label={
        colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    />
  );
}
