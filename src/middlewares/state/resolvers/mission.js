const missionPatch= (mission, { size } = { size: 'LARGE' }) => {
    return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
};
export default {missionPatch}