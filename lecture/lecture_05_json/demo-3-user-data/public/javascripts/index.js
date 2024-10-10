async function createUser(){
    // get data from the html
    const first_name = document.getElementById("first_name_input").value
    const last_name = document.getElementById("last_name_input").value
    const favorite_ice_cream = document.getElementById("favorite_ice_cream_input").value

    let myData = {
        first_name: first_name,
        last_name: last_name,
        favorite_ice_cream: favorite_ice_cream
    }
    console.log(myData)

    // send post request to server
    const response = await fetch("api/users", {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function getUsers(){
    const response = await fetch("api/users")
//     const pterosaurJson = await response.json()

//     // use map to turn each json datapoint into html
//     let pterosaurHtml = pterosaurJson.map(onePterosaur => {
//         return `
//         <div>
//             <p>${onePterosaur.Genus}</p>
//             <img src="${onePterosaur.img}" />
//         </div>
//         `
//     }).join("")

//     document.getElementById("results").innerHTML = pterosaurHtml
}
