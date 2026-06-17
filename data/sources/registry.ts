import rawSources from "../generated/sources.json";

export type DataSource = {
  id: string;
  name: string;
  agency: string;
  category: string;
  url: string;
  notes: string;
};

export const dataSources = rawSources as DataSource[];
