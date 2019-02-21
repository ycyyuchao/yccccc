export const addToCartFunc=(data)=>{
    return {
      type:'ADDTOCART',
      data
    }
  }
  
  export function addToCart(params){
    return dispatch=>{
      dispatch(addToCartFunc(params))
    }
  }



  export const cartnumdeFunc=(data)=>{
    return {
      type:'CARTNUMDE',
      data
    }
  }
  export function cartnumde(params){
    return dispatch=>{
      dispatch(cartnumdeFunc(params))
    }
  }




  export const cartnuminFunc=(data)=>{
    return {
      type:'CARTNUMIN',
      data
    }
  }
export function cartnumin(params){
    return dispatch=>{
      dispatch(cartnuminFunc(params))
    }
}


  export const cartnumchangeFunc=(data,num)=>{
    return {
      type:'CARTNUMCHANGE',
      data,
      num
    }
  }
export function cartnumchange(params,num){
    return dispatch=>{
      dispatch(cartnumchangeFunc(params,num))
    }
}



