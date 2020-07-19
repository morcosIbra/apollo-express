const isBooked= async (launch, _, { dataSources }) =>
dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id });

export default {isBooked}