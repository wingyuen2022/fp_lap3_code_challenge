const githubReducer = (state = [], action) => {
    switch(action.type) {
        case "SET_LIST":
            state = action.payload;
            return state;
        default:
            return state;
    }
};
export default githubReducer;