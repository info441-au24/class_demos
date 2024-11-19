import express from 'express';
import cache from 'memory-cache'
var router = express.Router();

// artificially slow down getting the items from the database
// to pretend that this is a really slow, difficult query, so
// we can see the benefits of caching
async function getItemsSlow(req){
    // get all items from the database
    let allItems = await req.models.Item.find()

    // pause for 5 seconds to pretend this was a difficult query
    let sleepSeconds = 5
    await new Promise(r => setTimeout(r, sleepSeconds * 1000))

    return allItems
}


router.get("/", async (req, res) => {
    console.log("got a get request for all items, first checking cache...")

    // note: to test server cache, disable caching in network tab
    // check if we already have the answer cached
    let allItems = cache.get('allItems')
    if(allItems){
        console.log("cache hit: found items in my cache")
    } else {
        console.log("cache miss, doing slow db lookup")
        // artificially slowed getting items from database
        allItems = await getItemsSlow(req)
        console.log("found items in db, saving to cache")
        cache.put('allItems', allItems, 30*1000)
    }

    console.log("sending items back")

    // note: to test browser cache, enable caching in network tab
    // set caching rule for browser
    // res.set('Cache-Control', 'public, max-age=30')
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
