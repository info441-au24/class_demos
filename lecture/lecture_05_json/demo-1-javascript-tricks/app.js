// Template Strings

// values that I want to put into html code
const title = "This page"
const subtitle = "this is an example page"
const description = "This is the description of my page"
//const description = undefined

// string addition
let html = "<html><body>" + 
           "<h1>" + title + "</h1>" +
           "<h2>" + subtitle + "</h2>" +
           "<p>" + description + "</p>" + 
           "</body></html"
console.log(html)

// template strings (with insertions)
let html2 = 
`<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${description}</p>
</body>
<html>`
console.log(html2)

// what if description is undefined??

// solution 1: ternary operator
//   condition check ? true return value : false return value
let html3 = 
`<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <p>${description ? description : "" }</p>
</body>
<html>`
console.log(html3)

// solution 2: helper function
function descriptionHtml(description){
    if(description){
        return `<p>${description}</p>`
    }else {
        return ""
    }
}
let html4 = 
`<html>
<body>
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    ${descriptionHtml(description)}
</body>
<html>`
console.log(html4)

//////////////////////////
// Iterator's Demo

// fake data
const dataArr = [
    "first name : Kyle",
    "last name : Thayer",
    "age : 40",
    "glasses : yes"
]

// "forEach" runs a function on each item in an object/array
// we will use it to extract the values into an object
const valuesDictionary = {}
dataArr.forEach(item => {
    const split_item = item.split(" : ")
    const item_key = split_item[0]
    const item_value = split_item[1]
    valuesDictionary[item_key] = item_value
})
console.log(valuesDictionary)

// "map" creates a modified version of an array.
// The new array will have values that are the result of
// running a function on items from the original array

// map demo 1: replace all the ":" with "="
const modifiedDataArr1 = dataArr.map(item => {
    return item.replace(":", "=")
})
console.log(modifiedDataArr1)

// map demo 2: just get the key (first part) of each string
const modifiedDataArr2 = dataArr.map(item => {
    return item.split(" : ")[0]
})
console.log(modifiedDataArr2)

// "filter" goes through an array and makes a new array with
// only the items that passed a given function (function returned true)

// filter demo: keep only strings with "name"
const filteredDataArr = dataArr.filter(item => {
    if(item.includes("name")){
        return true
    }else{
        return false
    }
})
console.log(filteredDataArr)

// Note shorthand version is:
const filteredDataArr2 = dataArr.filter(item => item.includes("name"))
console.log(filteredDataArr2)

// one really convenient thing with these iterators
// is they can be chained together

// chain demo: get only name info, but also replace ":" with "="
let filteredDataArr3 = 
    dataArr
        .filter(item => item.includes("name"))
        .map(item => item.replace(":", "="))
        
console.log(filteredDataArr3)