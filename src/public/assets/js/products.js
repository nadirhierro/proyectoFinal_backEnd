let grillaProductos = `
{{#if products}}
    {{#each products}}
<div id="${producto.code}" class="tarjeta botonAgregar">
  <div class="tarjetaCuerpo">
    <div class="cajaImagen">
      <img class="img-fluid imagen" src="${producto.thumbnail}" alt="${producto.name}" />
    </div>
    <div class="nombre">
      <p>${producto.name}</p>
    </div>
    <div class="cuotas">
      <p class="texto">18 cuotas s/interés de</p>
      <p class="texto precioCuotas"> $ ${precioCuotas}
      </p>
    </div>
    <div class="precio"><p class="texto">Final: $${precioFixed}</p></div>
    <div class="agregar">Agregar al carrito</div>
  </div>
</div>
    {{/each}}
{{else}}
<div class="col-2 alert alert-dark mt-5" role="alert">
  No hay productos!
</div>
{{/if}}
`;

socket.on("products", (data) => {
  fetch("http://localhost:8080/api/products")
    .then((res) => res.json())
    .then();
});
