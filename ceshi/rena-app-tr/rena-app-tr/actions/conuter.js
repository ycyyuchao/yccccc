export const increse = () => {
    return {
        type: 'INCREASE'
    }
}
export const decrease = ()=>{
    return {
      type:"DECREASE"
    }
  }

  export const getListData=(data)=>{
    return {
      type:"GETLISTS",
      data
    }
  }
  
  export function fetchList(){
    return dispatch=>{
      var url=' http://localhost:3000/posts';
      return fetch(url)
      .then(res=>{
        return res.json()
      })
      .then((data) => {
          dispatch(getListData(data))
          //console.log(data)
      })
    }
  }
 