const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    
        response.json().then((data) => {
            if(data.errorMessage){
                console.log(data.errorMessage)
            }else{
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        
        })
    })

})