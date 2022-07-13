const reposReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_REPOS":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
export default reposReducer;