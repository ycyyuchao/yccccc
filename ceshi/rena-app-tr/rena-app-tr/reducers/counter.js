var initialState = {
    counter: 0,
    counter1: 0,
    lists: [],
    carts: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREASE':
            return { ...state,
                counter: state.counter + 1
            }
            break;
        case "DECREASE":
            
            return { ...state,
                counter1: state.counter1 - 1
            }
            break;
        case "GETLISTS":
        
            return { ...state,
                lists: action.data
            }
            break;
            /* case "ADDTOCART":
                
                  //先检查state.carts中是否存在action.data.id的这个对象
                  //如果不存在
                   // 那么quantity购买数量为1
                  //如果存在
                  //  那么先取出之前对象中的quantity，然后再在那个基础上+1
                  //然后再进行对象的合并操作
                 
                var pos = _.findIndex(state.carts, {
                    'id': action.data.id
                });
                if (pos === -1) {
                    action.data.quantity = 1;
                } else {
                    action.data.quantity = state.carts[pos].quantity + 1
                }
                return {
                    ...state,
                    carts: [...state.carts, action.data]
                }
                break; */
        default:
            return state;

    }
}


export default reducer;