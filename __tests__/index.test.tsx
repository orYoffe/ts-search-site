import React from "react";
import {
  act,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../pages/index";

import { SPECIALITIES, companies } from "../server/companiesStore";

global.fetch = jest.fn();

describe("<Home/>", () => {
  describe("Display", () => {
    it("should display companies received", () => {
      const companiesSSR = companies.slice(0, 2);
      const { queryByText } = render(
        <Home specialities={SPECIALITIES} companiesSSR={companiesSSR} />
      );

      companiesSSR.forEach((company) => {
        expect(queryByText(company.name)).toBeInTheDocument();
      });
    });

    it("should display headers", () => {
      const companiesSSR = companies.slice(0, 2);
      const { queryByText } = render(
        <Home specialities={SPECIALITIES} companiesSSR={companiesSSR} />
      );

      expect(
        queryByText("Find your Sub-Constractor today")
      ).toBeInTheDocument();
    });

    it("should display count of how many companies were found", () => {
      const companiesSSR = companies.slice(0, 2);
      const { queryByText } = render(
        <Home specialities={SPECIALITIES} companiesSSR={companiesSSR} />
      );

      expect(
        queryByText(`${companiesSSR.length} companies found`)
      ).toBeInTheDocument();
    });
  });

  describe("Functionality", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    afterAll(() => {
      jest.useRealTimers();
    });

    it("should call api with filters", async () => {
      const companiesSSR = companies.slice(0, 2);
      const queryCompanies = companies.slice(2, 5);
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            companies: queryCompanies,
            count: queryCompanies.length,
            hasMore: false,
          }),
      } as any);

      const { queryByText, getByText, queryByTestId } = render(
        <Home specialities={SPECIALITIES} companiesSSR={companiesSSR} />
      );

      act(() => {
        fireEvent(
          queryByTestId(`checkbox_Ventilation`),
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        jest.advanceTimersByTime(500);
      });

      expect(fetch).toHaveBeenCalledWith(
        "/api/search?specialities=Ventilation&"
      );

      // check old results
      await Promise.all(
        companiesSSR.map(async (company) => {
          await waitForElementToBeRemoved(() => queryByText(company.name));
          expect(queryByText(company.name)).not.toBeInTheDocument();
        })
      );

      // check new results
      queryCompanies.forEach((company) => {
        expect(queryByText(company.name)).toBeInTheDocument();
      });
    });
  });
});
