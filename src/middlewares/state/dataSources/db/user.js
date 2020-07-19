import { DataSource } from 'apollo-datasource';
import isEmail from 'isemail';

class UserAPI extends DataSource {
  constructor({ models }) {
    super();
    this.models = models;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async bookTrips({ launchIds }) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }
    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.user.id;
    const res = await this.models.trip.findOrCreate({
      where: { userId, launchId },
    });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.user.id;
    return !!this.models.models.trip.destroy({ where: { userId, launchId } });
  }
}

export default UserAPI;
