var _ = require('lodash');
var initialState = [];

function cart(state = initialState, action) {
    
    switch (action.type) {
        case "ADDTOCART":
            var pos = _.findIndex(state, {
                'id': action.data.id
            });
            if (pos !== -1) {
                console.log( state[pos].quantity ) 
                console.log(action.data.quantity)
                state[pos].quantity = state[pos].quantity + action.data.quantity;
                return [...state];
            } else {
                action.data.quantity = action.data.quantity;
                return  [...state, action.data]
            }
            break; 
            // case 'CARTNUMDE':
            //     var pos = _.findIndex(state, {
            //         'id': action.data.id
            //     });
            //     if(state[pos].quantity>1){
            //         state[pos].quantity = state[pos].quantity -1;
            //         return [...state];
            //     }else{
            //         state[pos].quantity =1;
            //         return [...state];
            //     }
               
                
            // break; 
            // case 'CARTNUMIN':
            //     var pos = _.findIndex(state, {
            //         'id': action.data.id
            //     });
            //     state[pos].quantity=actio.data;
            //     if(state[pos].quantity<999){
            //         state[pos].quantity = state[pos].quantity + 1;
            //         return [...state];
            //     }else{
            //         state[pos].quantity = 999;
            //         return [...state];
            //     }  
            // break; 
            case 'CARTNUMCHANGE':
                var pos = _.findIndex(state, {
                    'id': action.data.id
                });                
                state[pos].quantity = action.num;
                if(state[pos].quantity>=99){
                    state[pos].quantity=99;
                }else if (state[pos].quantity<=1){
                    state[pos].quantity=1;
                }
                
                return [...state];
            break; 
        default:
            return state;

    }
}

export default cart;