import user from './user';
import trip from './trip';

export const models = db => ({
    user: user(db),
    trip: trip(db)
})