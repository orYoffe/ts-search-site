import { Box, Heading, Flex, Button, Link, Icon } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
        Sub-Contractor Finder
      </Heading>

      <Box display={{ sm: "block", md: "block" }} mt={{ base: 4, md: 0 }}>
        <Link href="https://github.com/orYoffe/ts-search-site" isExternal>
          <Button bg="transparent" border="1px">
            Check the code on github <Icon name="external-link" mx="2px" />
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
