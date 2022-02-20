let grilla = `
<h3 class="col-12 text-center mb-4">Lista de Productos</h3>
{{#if products}}
    {{#each products}}
        <div class="col-4 grillaProductos__tarjeta">
            <div class="grillaProductos__tarjeta__boximg">
                <img src="{{this.thumbnail}}" alt="{{this.name}}" class="img-fluid" />
            </div>
            <div class="grillaProductos__tarjeta__data">
            <h2>ID: {{this.id}}</h2>
                <form class="productData" name="{{this.id}}">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" name="name" value={{this.name}} />
                    </div>
                    <div class="mb-3">
                      <label for="description" class="form-label">Descripción:</label>
                      <input type="text" class="form-control" name="description" value={{this.description}} />
                    </div>
                    <div class="mb-3">
                      <label for="code" class="form-label">Código:</label>
                      <input type="text" class="form-control" name="code" value={{this.code}} />
                    </div>
                    <div class="mb-3">
                      <label for="thumbnail" class="form-label">Thumbnail:</label>
                      <input type="text" class="form-control" name="thumbnail" value={{this.thumbnail}} />
                    </div>
                    <div class="mb-3">
                      <label for="price" class="form-label">Precio:</label>
                      <input type="text" class="form-control" name="price" value={{this.price}} />
                    </div>
                    <div class="mb-3">
                      <label for="stock" class="form-label">Stock:</label>
                      <input type="text" class="form-control" name="stock" value={{this.stock}} />
                    </div>
                    <button type="submit" class="btn btn-primary update">Actualizar</button>
                </form>
                <form class="delete" name="{{this.id}}">
                    <button type="submit" class="btn btn-primary">Eliminar producto</button>
                </form>
            </div>
        </div>
    {{/each}}
{{else}}
<div class="col-2 alert alert-dark mt-5" role="alert">
  No hay productos!
</div>
{{/if}}
`;

// Socket on escuchando la señal de que se actualizaron los productos, renderiza nuevamente
// escucha botones según haya o no productos

socket.on("products", (data) => {
  fetch("http://localhost:8080/api/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const template = Handlebars.compile(grilla);
      const html = template({ products: json, admin: admin });
      document.getElementById("grilla").innerHTML = html;
    })
    .then(() => {
      let changeData = document.querySelectorAll(".productData");
      let deleteProduct = document.querySelectorAll(".delete");

      for (let i = 0; i < deleteProduct.length; i++) {
        deleteProduct[i].addEventListener("submit", (event) => {
          event.preventDefault();
          let id = event.target.getAttribute("name");
          fetch(`http://localhost:8080/api/products/${id}`, {
            method: "DELETE",
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              socket.emit("products", json);
            });
        });
      }

      for (let i = 0; i < changeData.length; i++) {
        changeData[i].addEventListener("submit", (event) => {
          event.preventDefault();
          let id = event.target.getAttribute("name");
          let name = event.target[0].value;
          let description = event.target[1].value;
          let code = event.target[2].value;
          let thumbnail = event.target[3].value;
          let price = event.target[4].value;
          let stock = event.target[5].value;

          let newObject = {
            name: name,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
          };
          fetch(`http://localhost:8080/api/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newObject),
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              socket.emit("productos", json);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Handler para agregar productos

let formProducts = document.getElementById("newProducts");

formProducts.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = event.target[0].value;
  let description = event.target[1].value;
  let code = event.target[2].value;
  let thumbnail = event.target[3].value;
  let price = event.target[4].value;
  let stock = event.target[5].value;

  if (
    name == "" ||
    description == "" ||
    code == "" ||
    thumbnail == "" ||
    price == "" ||
    stock == ""
  ) {
    window.location.reload();
  }

  let product = {
    name: name,
    description: description,
    code: code,
    thumbnail: thumbnail,
    price: price,
    stock: stock,
  };

  fetch(`http://localhost:8080/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => {
      res.json();
    })
    .then((json) => {
      socket.emit("products", product);
    })
    .catch((err) => {
      console.log(err);
    });
});
