import { Request, Response } from "express";
import { companies } from "./companiesStore";

const search = (req: Request, res: Response) => {
  const name = req.query.name as string | undefined;
  const parseName = name && name.length && name.trim();
  const limit = parseInt(req.query.limit as string, 10);
  const parseLimit = limit && !isNaN(limit) && limit > 10 ? limit : 20;
  const specialities = req.query.specialities as string | undefined;
  const parsedSpecialities =
    specialities && specialities.length && specialities.trim().split(",");
  let data = companies.slice(0);

  const hasNameFilter = parseName && parseName.length;
  const hasSpecialitiesFilter = parsedSpecialities && parsedSpecialities.length;

  if (hasNameFilter || hasSpecialitiesFilter) {
    data = data.filter((company) => {
      if (
        hasNameFilter &&
        !company.name.toLowerCase().includes(parseName as string)
      ) {
        return false;
      }
      if (hasSpecialitiesFilter) {
        return !(parsedSpecialities as string[]).find(
          (specialty) => company.specialities.indexOf(specialty) === -1
        );
      }

      return true;
    });
  }

  res.json({
    companies: data.slice(0, parseLimit),
    count: data.length,
    hasMore: data.length > parseLimit,
  });
};

export default search;
