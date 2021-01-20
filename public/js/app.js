console.log("client side js file")


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#mes1')
const message2=document.querySelector('#mes2')
const message3=document.querySelector('#mes3')
const message=document.querySelector('#mes')

weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
   const location=search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            message1.textContent="put a valid location"
        else{
            message.textContent='Loading...'
            message1.textContent=data.location
           
            message2.textContent='forecast: '+data.weather
            const temp=data.temperature
            message3.textContent=temp+' degree celcius'
            message.textContent=''
        }
    })
})
})