async function pluralizeWord(){
    let word = document.getElementById("wordInput").value
    let response = await fetch("api/pluralize?word=" + word)
    let resultText = await response.text()

    document.getElementById("results").innerHTML = resultText
}