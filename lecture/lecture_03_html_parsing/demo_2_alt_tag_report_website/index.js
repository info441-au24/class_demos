async function auditUrl(){
    let userUrl = document.getElementById("urlInput").value
    let fetchUrl = "api/auditurl?url=" + userUrl
    console.log("fetching: " + fetchUrl)
    let response = await fetch(fetchUrl)
    let resultText = await response.text()

    document.getElementById("results").innerHTML = resultText
}