import mutations from './mutations';
import launch from "./launch";

export const resolvers = {
  Launch: launch,
  Mutation: mutations
};