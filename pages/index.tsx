import { useState, useCallback } from "react";
import {
  Spinner,
  Heading,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import debounce from "debounce";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";
import Filters from "../components/Filters";
import CompanyCard from "../components/CompanyCard";
import { Company } from "../server/companiesStore";
import styles from "./styles.module.css";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

interface Props {
  specialities: string[];
  companiesSSR: Company[];
}
interface SearchParams {
  name: string;
  specialities: string[];
}
export default function Home({ specialities, companiesSSR }: Props) {
  const [lastSearchParams, setLastSearchParams] = useState<SearchParams>({
    name: "",
    specialities: [],
  });
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [companies, setcompanies] = useState<Company[]>(companiesSSR);
  const [count, setCount] = useState(companies.length);

  const search = useCallback(
    debounce(
      async (
        name: string = "",
        specialities: string[] = [],
        newLimit?: number
      ) => {
        let queryString = name?.trim().toLowerCase()
          ? `name=${name?.trim().toLowerCase()}&`
          : "";

        queryString += specialities.length
          ? `specialities=${specialities.join(",")}&`
          : "";
        queryString += newLimit ? `limit=${newLimit}` : "";

        const res = await fetch(`/api/search?${queryString}`);
        const companiesResults = await res.json();

        const { count, companies, hasMore } = companiesResults;

        setLastSearchParams({ name, specialities });
        setcompanies(companies);
        setCount(count);
        setHasMore(hasMore);
        if (!newLimit && limit !== 20) {
          setLimit(20);
        }
      },
      300
    ),
    []
  );

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Heading as="h1" size="lg" m={8}>
        Find your Sub-Constractor today
      </Heading>
      <Filters specialities={specialities} submit={search} />

      {count > 0 && (
        <Heading ml={8} mb={0} as="h4" size="sm">
          {count} companies found
        </Heading>
      )}
      {companies && (
        <InfiniteScroll
          dataLength={companies.length}
          next={() => {
            const newLimit = limit + 20;

            setLimit(newLimit);
            search(
              lastSearchParams.name,
              lastSearchParams.specialities,
              newLimit
            );
          }}
          hasMore={hasMore}
          loader={
            <div className={styles.container}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </div>
          }
          endMessage={
            <div className={styles.container}>
              <Heading m={8} mt={12} mb={12} as="h4" size="sm">
                Try changing the filters if you didn't find a company on the
                list.
              </Heading>
            </div>
          }
        >
          {!!companies.length &&
            companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
        </InfiniteScroll>
      )}
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { SPECIALITIES, companies } = require("../server/companiesStore");

  return {
    props: {
      specialities: SPECIALITIES,
      companiesSSR: companies.slice(0, 20),
    },
  };
};
