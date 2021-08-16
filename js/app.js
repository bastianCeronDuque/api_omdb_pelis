
const url = 'https://www.omdbapi.com/?s=batman&apikey=56c451ce'
fetch(url)
    .then(data => {
        return data.json()
    })
    .then(res => {
        console.log(res);
        const { Search = [] } = res
        console.log(Search);

        Search.map((p) => {
            document.getElementById('post').innerHTML += `
            <div class="card">
            <img src=${p.Poster} alt="No hay imagen de la palicula" style="border-radius: 5px 5px 0 0; height: 400px; width: 250px;">
            <div class="container">
            <h4>${p.Title}</h4>
            <h3>Precio $50</h3>
            </div>
            <button id="button" class="buy"><span>Comprar </span></button>
            </div>`
        })
        // variable para escuchar los botones
        let carts = document.querySelectorAll('.buy')
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener('click', () => {
                cartNumbers(Search[i])
            })
        }
        // Funcion para mantener el numero del carrito
        function onLoadCartNumbers() {
            let productNumbers = localStorage.getItem('cartNumbers')
            if (productNumbers) {
                document.querySelector('.topnav span').textContent = productNumbers


            }
        }
        // Funcion para guardar los productos clickeados 
        function cartNumbers(Search) {
            let productNumbers = localStorage.getItem('cartNumbers')
            productNumbers = parseInt(productNumbers)
            if (productNumbers) {
                localStorage.setItem('cartNumbers', productNumbers + 1)
                document.querySelector('.topnav span').textContent = productNumbers + 1

            } else {
                localStorage.setItem('cartNumbers', 1)
                document.querySelector('.topnav span').textContent = 1
            }
            setItems(Search)
        }
        function setItems(Search) {
            let cartItems = localStorage.getItem('productsInCart')
            cartItems = JSON.parse(cartItems)

            if (cartItems != null) {
                if (cartItems[Search.Title] == undefined) {
                    cartItems = {
                        ...cartItems,
                        [Search.Title]: Search
                    }
                }
                cartItems[Search.Title].imdbID += 1
            } else {
                Search.imdbID = 1

                cartItems = {
                    [Search.movie]: Search
                }

            }
            localStorage.setItem('productsInCart', JSON.stringify(cartItems))
        }
        // llamado de la funcion mantener numero
        onLoadCartNumbers()
    })