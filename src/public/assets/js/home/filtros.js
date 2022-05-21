// función para normalizar categorías
const normalizarCategorias = function () {
  $(".categoria").css("font-weight", "normal"); // pongo todas las categorías en fuente normal
  $(".subcategoria").css("font-weight", "normal"); // lo mismo para las subcategorias
  $(".subcategorias").css("display", "none"); // guardo todas las subcategorias
};
// función para normalizar subcategorias
const normalizarSubcategorias = function () {
  $(".subcategoria").css("font-weight", "normal"); // pongo las subcategorías en fuente normal (puede haber una seleccionada)
};
// función para poner en foco la categoría
const focoCategoria = function (nodo) {
  $(nodo).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
  $(nodo).next().css("display", "block"); // traigo sus subcategorías al DOM
};
// función para poner en foco la subcategoria
const focoSubcategoria = function (nodo) {
  $(nodo).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
};

// función para buscar, contempla que las palabras no estén en orden,
// busca que todas las palabras ingresadas estén dentro del nombre del producto
const buscar = function (event) {
  let inputUsuario = event.target.value; // tomo el input del usuario
  // escucho cuando el usuario escriba más de dos palabras
  if (inputUsuario.length > 2) {
    let inputMinuscula = inputUsuario.toLowerCase(); // lo transformo a minúscula
    let inputLimpio = removeAccents(inputMinuscula); // le saco acentos o carácteres extraños
    let arrayInput = inputLimpio.split(" "); // armo un array con las palabras
    // itero los productos
    productos.forEach((producto) => {
      let productoLower = producto.name.toLowerCase(); // tomo el nombre del producto y lo pongo en minúscula
      let productoNormalizado = removeAccents(productoLower); // le saco acentos (no es que yo lo ingrese con acentos, pero supongamos que puede fallar)
      let contar = 0; // variable contar para luego chequear si todas las palabras están en el producto
      //ahora itero las palabras
      arrayInput.forEach((palabra) => {
        // si la palabra se encuentra en el nombre, entonces cuento
        if (productoNormalizado.indexOf(palabra) > -1) {
          contar++;
        }
      });
      // si conté tantas veces como palabras ingresadas, entonces el producto ingresa como buscado
      if (contar == arrayInput.length) {
        productosBuscados.push(producto);
      }
    });
    limpiarProductos(); // limpio la grilla de productos
    if (productosBuscados.length == 0) {
      $(".grillaProductos").append(
        `<h4 class="sinProductos">No hay productos para tu búsqueda</h4>`
      );
    } else {
      renderizarEnGrilla(productosBuscados); // renderizo los buscados
    }
    productosBuscados = []; // reseteo el array de buscados para una próxima búsqueda
    normalizarCategorias();
    // si es el inicio de la página o el usuario borró la búsqueda, pongo los destacados
  } else if (inputUsuario == "") {
    limpiarProductos(); // limpio la grilla de productos
    renderizarDestacados(); // renderizo destacados
  }
};

//función para filtrar
const filtrar = function (event) {
  normalizarCategorias();
  focoCategoria(this);
  let categoria = $(this).html().toLowerCase(); // me fijo qué tipo de categoria voy a aplicar
  // filtro los productos de la categoría seleccionada
  if (categoria == "destacados") {
    productosFiltrados = productos.filter(
      (producto) => producto.featured == "si"
    );
  } else {
    productosFiltrados = productos.filter(
      (producto) =>
        removeAccents(producto.category.toLowerCase()) ==
        removeAccents(categoria)
    );
  }
  limpiarProductos(); // borro productos de la grilla
  renderizarEnGrilla(productosFiltrados); // renderizo los productos filtrados
};

//función subfiltrar
const subFiltrar = function (event) {
  normalizarSubcategorias();
  focoSubcategoria(this);
  let subcategoriaClass = $(this).attr("class"); // tomo el tipo de subcategoria (está escrito en la clase)
  let subcategoria = $(this).html().toLowerCase(); // tomo el nombre de la subcategoría
  // si es por marca, filtro por marca, sino por subcategoria estandard
  if (subcategoriaClass == "subcategoria marca") {
    productosSubFiltrados = productosFiltrados.filter(
      (producto) => producto.brand == subcategoria
    );
  } else {
    productosSubFiltrados = productosFiltrados.filter(
      (producto) =>
        removeAccents(producto.subcategory.toLowerCase()) ==
        removeAccents(subcategoria)
    );
  }
  limpiarProductos(); // limpio productos de la grilla
  renderizarEnGrilla(productosSubFiltrados); // renderizo
};
