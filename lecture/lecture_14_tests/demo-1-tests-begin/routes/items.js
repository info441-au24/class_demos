import express from 'express';
var router = express.Router();

router.get("/", async (req, res) => {
    let allItems = await req.models.Item.find()
    res.json(allItems)
})

router.post("/saveCart", async (req, res) => {
    console.log("Saving cart, session currently is", req.session)

    let cartInfo = req.body
    
    // for some reason if I save the object to the session, it gets deleted later
    req.session.cartInfo = JSON.stringify(req.body)

    console.log("session is now", req.session)

    res.json({status: "success"})
})

async function addPricesToCart(cartInfo, models){
    // add prices and names to cart
    
    //cartInfo should start like this: [{itemId: 32, itemCount: 2}, {itemId, 4335, item_count, 1}, ...]

    // look up in the db all items listed in my cart
    let cartItemIds = cartInfo.map(cartItem => cartItem.itemId)
    let itemsInfo = await models.Item.find().where("_id").in(cartItemIds).exec()

    // itemsInfo will be an array of JSON, like this:
    // [{_id: 32, name: "orange", price: ...}, {_id: 4335, name: "apple", ...}]

    // make a lookup table by id for the database info
    // transform itemsInfo into an object that I can look up info by the id
    let itemsInfoById = {}
    itemsInfo.forEach(itemInfo => {
        itemsInfoById[itemInfo._id] = itemInfo
    })

    // itemsInfoById will look like:
    // {
    //    32: {_id: 32, name: "orange", price: ...},
    //    4335: {_id: 4335, name: "apple", price: ...}
    // }

    // combine db info with cart info
    // take the cartInfo, and for each item, make a new object that
    // includes the name and the price
    let combinedCartInfo = cartInfo.map(cartItem => {
        return {
            itemId: cartItem.itemId,
            itemCount: cartItem.itemCount,
            name: itemsInfoById[cartItem.itemId].name,
            price: itemsInfoById[cartItem.itemId].price
        }
    })

    return combinedCartInfo
}

router.get("/getCart", async (req, res) => {
    if(!req.session || ! req.session.cartInfo){
        // if there is no session or saved cart, just return empty cart
        res.json([])
        return
    }

    let cartInfo = JSON.parse(req.session.cartInfo)

    // add item names and prices to the cart info
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)

    res.json(combinedCartInfo)
})

async function calculateOrderAmount(req){
    let cartInfo = JSON.parse(req.session.cartInfo)

    // add item names and prices to the cart info
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)

    let totalCost = combinedCartInfo
        .map(item => item.price * item.itemCount) // get cost for each item
        .reduce((prev, curr) => prev + curr)
    
    return totalCost
}

//stripe endpoint
router.post("/create-payment-intent", async (req, res) => {
    // TODO: look up the order amount
    let orderAmount = await calculateOrderAmount(req) * 100
    console.log("order amount", orderAmount)

    // create a PaymentIntent object with the order amount
    const paymentIntent = await req.stripe.paymentIntents.create({
        amount: orderAmount,
        currency: "usd", // 'usd' is actually US cents for some reason (US dollars * 100)
        automatic_payment_methods: {enabled: true}
    })

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

export default router;
