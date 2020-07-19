import queries from './queries';
import mutations from './mutations';
import launch from './launch';
import user from './user';
import mission from './mission';

export default {
    Mutation: mutations,
    Query: queries,
    Mission: mission,
    Launch: launch,
    User: user,
};