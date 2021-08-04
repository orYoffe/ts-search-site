import {
  Stack,
  Image,
  Text,
  Link,
  Flex,
  Stat,
  StatLabel,
} from "@chakra-ui/react";
import { Company } from "../server/companiesStore";

interface Props {
  company: Company;
}

const CompanyCard = ({ company }: Props) => {
  return (
    <Stack
      spacing="2"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      m={8}
      shadow="lg"
      roundedTop="lg"
      transition="all 100ms ease-in-out"
      _hover={{
        shadow: "xl",
      }}
    >
      <Stack pt="2" pb="8" px="4">
        <Image
          rounded="full"
          width="100px"
          src={company.avatar}
          alt={company.name}
        />
        <Text p="0" m="0" fontWeight="bold" fontSize="4xl">
          {company.name}
        </Text>
        <Text
          m="0"
          p="0"
          fontSize="md"
          fontWeight="light"
          className="test-title"
        >
          Specialities: {company.specialities.join(", ")}
        </Text>
        <Stat>
          <StatLabel fontFamily="serif">City: {company.city}</StatLabel>
        </Stat>
        <Flex justifyContent="flex-end">
          <Link pt="4">Contact {company.name}</Link>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default CompanyCard;
