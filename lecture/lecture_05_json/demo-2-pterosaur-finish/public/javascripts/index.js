async function getPterosaurs(){
    const response = await fetch("api/getPterosaurs")
    const pterosaurJson = await response.json()

    // use map to turn each json datapoint into html
    let pterosaurHtml = pterosaurJson.map(onePterosaur => {
        return `
        <div>
            <p>${onePterosaur.Genus}</p>
            <img src="${onePterosaur.img}" />
        </div>
        `
    }).join("")

    document.getElementById("results").innerHTML = pterosaurHtml
}
