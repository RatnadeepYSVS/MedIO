const form = document.querySelector('form')
form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const name = form.name.value
    const email = form.email.value
    const phone = form.phone.value
    const passcode = form.passcode.value
    const data = await fetch('/register', {
        method: "POST",
        body: JSON.stringify({ name, email, phone, passcode }),
        headers: { "Content-Type": "application/json" }
    })
    const pone = document.querySelector('.pone')
    const res = await data.json()
    if (res.message) {
        pone.innerHTML = res.message
    } else {
        location.replace('/home?page=1')
    }
    console.log(res)
})