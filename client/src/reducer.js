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
    let existedItem=state.addedItems.find(item=>item.objectId==action.payload)

    //find that item and den decrease    
    let newCart = state.addedItems.filter(item => item.objectId != action.payload);
    let items = [...state.addedItems];
    let newItems = items.filter((item) => {
          if (item.objectId === action.payload) {
              item.quantity-=1;
              if(item.quantity==0)
              flag=true;
            }

            return item;
        });
    
        //if quantity is 0 dont return that item in the cart
      if(flag)
      {
        return {...state,
          addedItems:newCart,
          amount:state.amount-existedItem.Price,
          total:state.total-1
        }}
      
        //else return the updated cart
      else
      {
        return {...state,
        addedItems:newItems,
        amount:state.amount-existedItem.Price,
        total:state.total-1}}
    
  }

  if(action.type=='INCREASE_ITEM')
  {
    let addedItem=state.addedItems.find(item=>item.objectId==action.payload)
    let items = [...state.addedItems];
    
    let newItems = items.filter((item) => {
          if (item.objectId === action.payload) {
              item.quantity+=1;
            }

            return item;
        });
    
    return {...state,
        addedItems:newItems,
        amount:state.amount+addedItem.Price,
        total:state.total+1}
  }

  if(action.type=='CLEAR_CART')
  {
    return{
            ...state,
            addedItems: [],
            total: 0,
            amount:0
          }
  }


  if(action.type==="ADD_TO_CART")
  {
    // console.log(state.addedItems,state.cart)
    let addedItem=state.cart.find(item=>item.objectId===action.payload);
    let existedItem=state.addedItems.find(item=>item.objectId===action.payload);
    // console.log(addedItem,existedItem)
    if(existedItem)
    {
      let newCart = state.addedItems.filter(item => item.objectId != action.payload);
      ///take out the increase quantity item
      existedItem.quantity = existedItem.quantity+1;
      newCart.push(existedItem);

      return {...state,addedItems:newCart,
        amount:state.amount+addedItem.Price,
        total:state.total+1}
    }
    else
    {
       addedItem={...addedItem,quantity:1}
       return {...state,
        addedItems:[...state.addedItems,addedItem],
        amount:state.amount+addedItem.Price,
        total:state.total+1
      }
    }
  }

  if(action.type=='REMOVE_ITEM')
  {
    let itemToRemove= state.addedItems.find(item=>item.objectId===action.payload)
    let new_items = state.addedItems.filter(item=> item.objectId!=action.payload)
        
    //calculating the total
    let newTotal = state.total - (itemToRemove.quantity )
    //calculate amount
    let newAmount = state.amount - (itemToRemove.Price * itemToRemove.quantity )
    console.log(itemToRemove)
    return{
            ...state,
            addedItems: new_items,
            total: newTotal,
            amount:newAmount
          }
  }

  
  ///as a default always return the original stae(old state-before updation)
  return state;
}