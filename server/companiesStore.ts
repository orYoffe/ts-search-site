import faker from "faker";

const NUMBER_OF_COMPANIES = 1000; // Change here to get a different amount of companies
export const SPECIALITIES = [
  "Excavation",
  "Plumbing",
  "Electrical",
  "Doors",
  "Walls",
  "Ventilation",
];

const getRandomSpeciality = () => {
  return SPECIALITIES[Math.floor(Math.random() * SPECIALITIES.length)];
};

// a small hack to get all the images out of faker since each function returns one image
const IMAGES: string[] = Object.keys(faker.image as object)
  .filter((key) => typeof (faker.image as any)[key] === "function")
  .map((key) => (faker.image as any)[key]());

const getRandomImage = () => {
  return IMAGES[Math.floor(Math.random() * IMAGES.length)];
};

export interface Company {
  id: string;
  name: string;
  city: string;
  avatar: string;
  specialities: string[];
}

const generateCompanies = (amount: number) =>
  new Array(amount).fill(null).map(() => {
    return {
      id: faker.datatype.uuid(),
      name: faker.company.companyName(),
      city: faker.address.cityName(),
      avatar: getRandomImage(),
      specialities: [
        ...new Set([getRandomSpeciality(), getRandomSpeciality()]),
      ],
    };
  });

export const companies: Company[] = generateCompanies(NUMBER_OF_COMPANIES);
