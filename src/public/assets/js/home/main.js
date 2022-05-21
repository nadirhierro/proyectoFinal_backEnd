// creo clase producto
class Producto {
  constructor(
    code,
    category,
    subcategory,
    brand,
    name,
    price,
    featured,
    thumbnail,
    stock
  ) {
    this.code = code;
    this.category = category;
    this.subcategory = subcategory;
    this.brand = brand;
    this.name = name;
    this.price = price;
    this.featured = featured;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.quantity = 0;
  }
  agregar() {
    this.quantity++;
    this.stock--;
  }
  borrar() {
    this.quantity--;
    this.stock++;
  }
}

// inicializo array productos
const productos = [];
const clientes = [];
// variables globales
let carrito = [];
let precioTotal = 0;
let contar = 0;
let productosFiltrados = []; // inicializo array de productos filtrados
let productosSubFiltrados = []; // inicializo array de productos subfiltrados
let productosBuscados = []; // inicializo array de productos buscados
// estructuras html estáticas

let loader = $(`
<div class="container-fluid">
<div class="row justify-content-center pt-5 loader">
<div class="col-12 lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>
</div>
`);

let grillaTienda = $(`
  <div class="container-fluid tienda"></div>
  `).hide();

let barraBusqueda = $(`
  <div class="row">
    <div class="col-12 barraBusqueda">
    <h3>Buscá los productos de tu interés</h3>
    <form onsubmit="return false" class="buscador">
      <input
        type="search"
        id="input"
        class="form-control"
        placeholder="Buscar..."
        aria-label="Search"
      />
    </form>
    </div>
    </div>`);

let rowFiltrosProductos = $(`<div class="row filtrosProductos"></div>`);

let filtros = $(`
  <div class="col-5 col-md-2 filtros">
    <h3>Filtros</h3>
    <div class="categorias">
    <ul class="categoriaContenedor">
    <li class="categoria destacados">Destacados</li>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Guitarras</li>
      <ul class="subcategorias">
        <li class="subcategoria">Guitarras Criollas</li>
        <li class="subcategoria">Guitarras Acústicas</li>
        <li class="subcategoria">Guitarras Eléctricas</li>
        <li class="subcategoria">Amplificadores para Guitarra</li>
        <li class="subcategoria">Encordados para Guitarra</li>
        <li class="subcategoria">Accesorios para Guitarra</li>
        <h5>Marcas</h5>
        <li class="subcategoria marca">Fender</li>
        <li class="subcategoria marca">Gibson</li>
        <li class="subcategoria marca">Ibanez</li>  
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Bajos</li>
      <ul class="subcategorias">
        <li class="subcategoria">Bajos Acústicos</li>
        <li class="subcategoria">Bajos Eléctricos</li>
        <li class="subcategoria">Amplificadores para Bajo</li>
        <li class="subcategoria">Encordados para Bajo</li>
        <li class="subcategoria">Accesorios para Bajo</li>
        <h5>Marcas</h5>
        <li class="subcategoria marca">Fender</li>
        <li class="subcategoria marca">Ibanez</li>  
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Teclados</li>
      <ul class="subcategorias">
        <li class="subcategoria">Digitales</li>
        <li class="subcategoria">Pianos</li>
        <li class="subcategoria">Sintetizadores</li>
        <li class="subcategoria">Amplificadores para Teclados</li>
        <li class="subcategoria">Accesorios para Teclados</li>
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Baterias</li>
      <ul class="subcategorias">
        <li class="subcategoria">Baterías Acústicas</li>
        <li class="subcategoria">Baterías Electrónicas</li>
        <li class="subcategoria">Percusión</li>
        <li class="subcategoria">Platillos</li>
        <li class="subcategoria">Accesorios para Bateristas</li>
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Estudio</li>
      <ul class="subcategorias">
        <li class="subcategoria">Auriculares</li>
        <li class="subcategoria">Consolas</li>
        <li class="subcategoria">Micrófonos</li>
        <li class="subcategoria">Monitores</li>
        <li class="subcategoria">Accesorios para Estudio</li>
      </ul>
    </ul>
  </div>`);

let grillaProductos = $(`
  <div class="col-7 col-md-10 grillaProductos"></div>
  `);

let carritoOffcanvas = $(`
  <div
    class="offcanvas offcanvas-end"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        Carrito
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body carritoContainer">
      <div class="carrito"></div>
    </div>
  </div>`);

let carritoVacio = $(`
  <div class="carritoVacio">
    <h4>El carrito está vacío</h4>
  </div>`);

let carritoVacioConBtn = $(`
  <div class="carritoVacio">
    <h4>El carrito está vacío</h4>
    <a href="./home" class="btn">Volver a la tienda</a>
  </div>`);

let filaTotal = $(`
  <div class="total">
    <p>TOTAL</p>
    <p class="totalPrecio"></p>
  </div>
  <div class="botonesCarrito">
    <button class="btn rounded-pill limpiarCarrito">Limpiar carrito</button>
    <a href="#/FinalizarCompra" class="btn rounded-pill comprarCarrito">Comprar</a>
  </div>`);

let carritoContador = $(`<span class="carritoContador"></span>`);

let finalizarCompraHero = $(`
  <div class="container-fluid hero">
    <div class="row justify-content-center">
      <div
        class="
        col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4
        cajaHeroLogo
        animate__animated animate__fadeIn
        "
      >
        <img
          class="img-fluid heroLogo"
          src="./img/logo_white_large.png"
          alt="Logo Sincopado"
        />
        <p class="heroLema">Siempre la mejor atención</p>
      </div>
    </div>
  </div>`);

let finalizarCompraContainer = $(`
  <div class="container-fluid finalizarCompra">
    <div class="row tituloFinalizar">
      <h2 class="col-12 col-md-4">¡Últimos pasos!</h2>
      <h4 class="col-12 col-md-4">Chequeá tu carrito...</h4>
    </div>
    <div class="row carritoYdatos">
    </div>
  </div>`);

let finalizarCompraCarrito = $(`
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th class="columnaImagen" scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
        <th scope="col">Quitar</th>
      </tr>
    </thead>
    <tbody class="tbody">
    </tbody>
  </table>`);

let finalizarCompraFormulario = $(`
  <div class="row cajaFormulario">
    <form onsubmit="return false" class="col-12 row finalizarCompraForm">
      <button type="submit" class="col-3 btn rounded-pill btnFinalizarCompra">Finalizar Compra</button>
    </form>
  </div>`);

// función document ready
$(function () {
  $.when(getProductos()).done(() => {
    iniciarTienda(); // inicio tienda
    for (const producto of productosData) {
      productos.push(
        new Producto(
          producto.code,
          producto.category,
          producto.subcategory,
          producto.brand,
          producto.name,
          producto.price,
          producto.featured,
          producto.thumbnail,
          producto.stock
        )
      );
    }
    emparejarCarritoStorage(); // emparejo carrito y Storage
    renderizarDestacados(); // renderizo destacados
    animacionInicio(); // animación
  });
});
