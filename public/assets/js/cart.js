let newCart = document.getElementById("newCart");

// Template que renderiza según si hay carts, y si estos tienen productos

let cartTemplate = `
 {{#if carts}}
    {{#each carts}}
        <div class="cart" name="{{this.id}}">
            <h4>ID :{{this.id}}</h4>
            <h5>Timestamp: {{this.timestamp}}</h5>
            <div class="cart__products">
                {{#if this.products}}
                {{#each this.products}}
                <div class="cart__products__product">
                    <p>nombre: {{this.name}}</p>
                    <p>precio: {{this.price}}</p>
                    <form class="cartProductDelete" name="{{this.id}}">
                        <button type="submit" class="btn btn-primary"> Quitar producto</button>
                    </form>
                </div>
                {{/each}}
                <form class="cart__productAdd" name="{{this.id}}">
                <h3>Agregar producto al carrito</h3>
                <label for="id">ID</label>
                <input type="text" name="id" />
                <button type="submit" class="btn btn-primary">Agregar</button>
                 </form>
                {{else}}
                <h3 class="mb-3">No hay productos en el carrito</h3>
                <form class="cart__productAdd" name="{{this.id}}">
                    <h3>Agregar producto al carrito</h3>
                    <label for="id">ID</label>
                    <input type="text" name="id" />
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </form>
                {{/if}}
            </div>
            <form class="cartDelete">
                <button type="submit" class="btn btn-primary">Eliminar Carrito</button>
            </form>
        </div>
    {{/each}}
    {{else}}
    <h2 class="text-center">No hay carritos activos</h2>
{{/if}}
`;

// Handler para agregar nuevo carrito

newCart.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch("http://localhost:8080/api/cart", {
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      socket.emit("carts", "actualizar");
    });
});

// Socket para el canal carts
// Cada vez que recibe señal, hace fetch a los carts para actualizar
// Cada vez que actualiza empieza a escuchar botones de quitar carritos, de agregar productos
// y si el carrito tiene productos, escucha los botones de quitar esos productos

socket.on("carts", (data) => {
  fetch("http://localhost:8080/api/cart")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      const template = Handlebars.compile(cartTemplate);
      const html = template({ carts: json });
      document.getElementById("cartsContainer").innerHTML = html;
      let cartDelete = document.querySelectorAll(".cartDelete");
      for (let i = 0; i < cartDelete.length; i++) {
        cartDelete[i].addEventListener("submit", (event) => {
          event.preventDefault();
          let cartId = event.target.parentNode.getAttribute("name");
          fetch(`http://localhost:8080/api/cart/${cartId}`, {
            method: "DELETE",
          })
            .then((res) => {
              return res.json;
            })
            .then((json) => {
              socket.emit("carts", json);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
      if (json.length > 0) {
        let cartAddProduct = document.querySelectorAll(".cart__productAdd");
        for (let i = 0; i < cartAddProduct.length; i++) {
          cartAddProduct[i].addEventListener("submit", (event) => {
            event.preventDefault();
            let cartId = event.target.getAttribute("name");
            console.log(cartId);
            let productId = event.target[0].value;
            fetch(
              `http://localhost:8080/api/cart/${cartId}/products/${productId}`,
              {
                method: "POST",
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                socket.emit("carts", "actualizar");
              });
          });
        }
        let count = 0;
        json.forEach((cart) => {
          if (cart.products.length > 0) {
            count++;
          }
        });
        if (count > 0) {
          let cartProductDelete =
            document.querySelectorAll(".cartProductDelete");
          for (let i = 0; i < cartProductDelete.length; i++) {
            cartProductDelete[i].addEventListener("submit", (event) => {
              event.preventDefault();
              let cartId =
                event.target.parentNode.parentNode.parentNode.getAttribute(
                  "name"
                );
              let productId = event.target.getAttribute("name");
              console.log(productId);
              fetch(
                `http://localhost:8080/api/cart/${cartId}/products/${productId}`,
                {
                  method: "DELETE",
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((json) => {
                  socket.emit("carts", json);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
