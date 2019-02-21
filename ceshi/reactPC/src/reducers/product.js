var initialState = {
    productList: []
}

function product(state = initialState, action) {
    switch (action.type) {
        case "GETLISTS":
            return { ...state,
                productList: action.data
            }
            break;
        default:
            return state;

    }
}


export default product;