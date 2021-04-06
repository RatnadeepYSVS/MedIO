const form = document.querySelector('form')
form.addEventListener('submit', async(e) => {
    e.preventDefault()
    const tagline = form.tagline.value
    const blog = form.blog.value
    const data = await fetch('/blog', {
        method: "POST",
        body: JSON.stringify({ tagline, blog }),
        headers: { "Content-Type": "application/json" }
    })
    const res = await data.json()
    location.replace('/home?page=1')
    console.log(res)
})