console.log('This is PostMaster');

// utility functions:
// 1. utility function to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

// iniatialize no. of parameters
let addedParamsCount = 0

// hide the parameters box initially
let parameterBox = document.getElementById('parameterBox')
parameterBox.style.display = "none"

//if the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parameterBox').style.display = 'block'
})

// if the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block'
})


//if the user clicks on + button,add more parameters
let addParams = document.getElementById('addParams')
addParams.addEventListener('click', (e) => {
    e.preventDefault()
    let params = document.getElementById('params')
    let string = `<div class="form-row my-2">
                    <label class="col-sm-2 col-form-label" for="inputEmail4">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Paramter ${addedParamsCount + 2} Key">
                    </div>
                    <div class="col-md-4">

                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}"
                            placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParams"> - </button>
                </div>
            </div>`

    // convert the element to dom node
    let paramsElement = getElementFromString(string)
    params.appendChild(paramsElement)

    // add an event listener to remove the parameter on clicking - button
    let deleteParams = document.getElementsByClassName('deleteParams')
    for (item of deleteParams) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }

    addedParamsCount++

})


// if the user clicks on submit button
let submit = document.getElementById('submit')
submit.addEventListener('click', (e) => {
    // show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please Wait... Fetching Response..."
    document.getElementById('responsePrism').innerHTML = "Please Wait... Fetching Response..."
    Prism.highlightAll()
    e.preventDefault()

    //fetch all the values user has entered
    let url = document.getElementById('url').value
    let requestType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value

    // if user has used params option insted of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {}
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value
                data[key] = value
            }
        }
        data = JSON.stringify(data)
    } else {
        // data = document.getElementById('requestJsonText').value
        data = document.getElementById('responsePrism').innerHTML
    }

    console.log(url, requestType, contentType, data);

    // if the requestType is get, invole fetch api to create a get request
    if (requestType = 'GET') {
        fetch(url, {
            method: "GET",

        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll()
            })
    } else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }

        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll()
            })
    }


})