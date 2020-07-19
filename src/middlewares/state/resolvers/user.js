const trips = async (_, __, { dataSources }) => {
    const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
    if (!launchIds.length) return [];
    return (
        dataSources.launchAPI.getLaunchesByIds({
            launchIds,
        }) || []
    );
};

export default { trips }