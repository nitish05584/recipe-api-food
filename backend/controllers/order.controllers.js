

const placeOrder=async(req,res)=>{
    try {
        const {cartItems,paymentMethod,deliveryAddress}=req.body
        if(cartItems.length==0 || !cartItems){
          return res.status(400).json({message:"cart is empty"})
        }
        if(deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude){
            return res.status(400).json({message:"send complete deliveryAddress  is empty"})  
        }

        const groupItemsByShop={}
        cartItems.forEach(item=>{
            const shopId=item.shop
            if(!groupItemsByShop[shopId]){
              groupItemsByShop[shopId]=[]    
            }
            groupItemsByShop[shopid].push(item)
        })

        const shopOrders=await Object.keys(groupItemsByShop) 

    } catch (error) {
        
    }
}