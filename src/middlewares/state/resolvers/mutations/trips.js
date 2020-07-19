const bookTrips = async (_, { launchIds }, { dataSources }) => {
    const results = await dataSources.userAPI.bookTrips({ launchIds });
    const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
    });

    return {
        success: results && results.length === launchIds.length,
        message:
            results.length === launchIds.length
                ? 'trips booked successfully'
                : `the following launches couldn't be booked: ${launchIds.filter(
                    id => !results.includes(id),
                )}`,
        launches,
    };
};

const cancelTrip = async (_, { launchId }, { dataSources }) => {
    const result = await dataSources.userAPI.cancelTrip({ launchId });

    if (!result)
        return {
            success: false,
            message: 'failed to cancel trip',
        };

    const launch = await dataSources.launchAPI.getLaunchById({ launchId });
    return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
    };
};

export default { bookTrips, cancelTrip }