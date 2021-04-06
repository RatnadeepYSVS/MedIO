const form = document.querySelector('form')
form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const name = form.name.value
    const email = form.email.value
    const phone = form.phone.value
    const query = form.query.value
    const city = form.city.value
    const data = await fetch('/feedback', {
        method: "POST",
        body: JSON.stringify({ name, email, phone, query, city }),
        headers: { "Content-Type": "application/json" }
    })
    const pone = document.querySelector('.pone')
    const res = await data.json()
    if (res.message == "Please Provide The Email That You Have Registered Your MedIO Account.") {
        pone.innerHTML = res.message
    } else {
        pone.innerHTML = res.message
        pone.style.color = "#93F393";
        location.replace('/home?page=1')
    }
    console.log(res)
})