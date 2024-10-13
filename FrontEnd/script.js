const divElement = document.querySelector("div")
const worksApi = fetch("http://localhost:5678/api/works")
    .then(response => {
        return response.json()
    })
    .then((works) => {
        console.log(works)
        for (const work of works) {
            const figureElement = document.createElement("figure")
            figureElement.innerText = work.userId
        }
    })


