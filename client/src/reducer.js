export const reducer = (state,action) =>
{

  //default action passed initially
  //state undefined initially

  //2 return options
  //old state or updated state
  // console.log({state,action})


  if(action.type=='DECREASE_ITEM')
  {
    let flag=false;
    let existedItem=state.cart.find(item=>item.objectId==action.payload)

    //find that item and den decrease    
    let newmenu = state.cart.filter(item => item.objectId != action.payload);
    let items = [...state.cart];
    let newItems = items.filter((item) => {
          if (item.objectId === action.payload) {
              item.quantity-=1;
              if(item.quantity==0)
              flag=true;
            }

            return item;
        });
    
        //if quantity is 0 dont return that item in the menu
      if(flag)
      {
        return {...state,
          cart:newmenu,
          amount:state.amount-existedItem.Price,
          total:state.total-1
        }}
      
        //else return the updated menu
      else
      {
        return {...state,
        cart:newItems,
        amount:state.amount-existedItem.Price,
        total:state.total-1}}
    
  }

  if(action.type=='INCREASE_ITEM')
  {
    let addedItem=state.cart.find(item=>item.objectId==action.payload)
    let items = [...state.cart];
    
    let newItems = items.filter((item) => {
          if (item.objectId === action.payload) {
              item.quantity+=1;
            }

            return item;
        });
    
    return {...state,
        cart:newItems,
        amount:state.amount+addedItem.Price,
        total:state.total+1}
  }

  if(action.type=='CLEAR_CART')
  {
    return{
            ...state,
            menu: [],
            total: 0,
            amount:0
          }
  }


  if(action.type==="ADD_TO_CART")
  {
    // console.log(state.cart,state.menu)
    let addedItem=state.menu.find(item=>item.objectId===action.payload);
    let existedItem=state.cart.find(item=>item.objectId===action.payload);
    // console.log(addedItem,existedItem)
    if(existedItem)
    {
      let newmenu = state.cart.filter(item => item.objectId != action.payload);
      ///takes out newly added item
      existedItem.quantity = existedItem.quantity+1;
      newmenu.push(existedItem);

      return {...state,
        cart:newmenu,
        amount:state.amount+addedItem.Price,
        total:state.total+1
      }
    }
    else
    {
       addedItem={...addedItem,quantity:1}
       return {...state,
        cart:[...state.cart,addedItem],
        amount:state.amount+addedItem.Price,
        total:state.total+1
      }
    }
  }

  if(action.type=='REMOVE_ITEM')
  {
    let itemToRemove= state.cart.find(item=>item.objectId===action.payload)
    let new_items = state.cart.filter(item=> item.objectId!=action.payload)
        
    //calculating the total
    let newTotal = state.total - (itemToRemove.quantity )
    //calculate amount
    let newAmount = state.amount - (itemToRemove.Price * itemToRemove.quantity )
    console.log(itemToRemove)
    return{
            ...state,
            cart: new_items,
            total: newTotal,
            amount:newAmount
          }
  }

  
  ///as a default always return the original stae(old state-before updation)
  return state;
}