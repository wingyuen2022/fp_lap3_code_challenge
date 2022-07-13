export const setList = (list) => {
    return {
        type: "SET_LIST",
        payload: list
    }
};

export const setRepos = (repos) => {
    return {
        type: "SET_REPOS",
        payload: repos
    }
};