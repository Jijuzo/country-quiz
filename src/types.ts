export type Country = {
  capital: string[];
  name: { common: string };
  flags: { png: string };
};

export type AllCountries = Array<Country>;
