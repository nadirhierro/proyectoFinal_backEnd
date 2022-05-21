// función para quitar acentos, recuperada de https://desarrolloweb.com/faq/la-mejor-manera-de-eliminar-tildes-o-acentos-en-javascript
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
function numberWithCommas(x) {
  return x
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const escucharBotones = function () {
  $(".botonAgregar").off().on("click", agregarCarrito);
  $(`.botonSumar`).off().on("click", agregarCarrito);
  $(".botonRestar").off().on("click", restarCarrito);
  $(".botonEliminar").off().on("click", eliminarProducto);
};

// función para iniciar tienda
const iniciarTienda = function () {
  $(".main").append(loader); // loader para mientras se carga
  $(".main").append(grillaTienda); // cargo grilla tienda
  $(".tienda").append(barraBusqueda); // cargo la barra de busqueda
  $(".tienda").append(rowFiltrosProductos);
  $(".filtrosProductos").append(filtros); // cargo filtros
  $(".filtrosProductos").append(grillaProductos); // cargo grilla productos
  $(".tienda").append(carritoOffcanvas); // cargo off canvas
  $(".categoria").off().on("click", filtrar); // escucho las categorias
  $(".subcategoria").off().on("click", subFiltrar); // escucho los filtros
  $("#input").off().on("input", buscar); // escucho la barra de búsqueda
};
// función para renderizar productos en el DOM
const renderizarEnGrilla = function (arrayProductos) {
  arrayProductos.forEach((producto) => {
    let precioFixed = numberWithCommas(producto.price.toFixed(2));
    let precioCuotas = numberWithCommas((producto.price / 18).toFixed(2));
    let productoHtml = $(`
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
    </div>`);
    $(".grillaProductos").append(productoHtml);
  });
  escucharBotones();
};

// función para renderizar destacados
const renderizarDestacados = function () {
  // filtro productos destacados para renderizarlos al inicio

  let productosDestacados = productos.filter(
    (producto) => producto.featured == "si"
  );
  renderizarEnGrilla(productosDestacados);
  escucharBotones();
  $(".destacados").css("font-weight", "bold");
};

//función para animación de inicio
const animacionInicio = function () {
  $(".loader").fadeOut(1000); // saco el loader con timing
  $(".tienda").delay(1001).fadeIn(1200); // cuando se va el loader, visibilizo la tienda
};

// función para limpiar productos del DOM
const limpiarProductos = function () {
  $(".sinProductos").remove();
  $(".tarjeta").remove();
};

// funcion para obtener productos con ajax
const productosData = [];
const getProductos = function () {
  return $.ajax({
    type: "GET",
    url: "http://localhost:8080/api/products",
    dataType: "json",
    success: function (response) {
      for (const data of response) {
        productosData.push(data);
      }
    },
  });
};
