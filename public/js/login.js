const form = document.querySelector('form')
form.addEventListener('submit', async(e) => {
    const email = form.email.value
    const passcode = form.passcode.value
    e.preventDefault()
    const pone = document.querySelector('.mail')
    const ptwo = document.querySelector('.passcode')
    try {
        const data = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, passcode }),
            headers: { "Content-Type": "application/json" }
        })
        const res = await data.json()
        if (res.message == "No User with that Email") {
            pone.innerHTML = res.message
        } else if (res.message == "Wrong passcode") {
            pone.innerHTML = res.message
        } else {
            location.replace('/home?page=1')
        }
    } catch (e) {
        console.log(e)
    }
})