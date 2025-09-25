document.getElementById("form-reserva").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const personas = document.getElementById("personas").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const mensaje = document.getElementById("mensaje-reserva");
    if (!nombre || !personas || !fecha || !hora) {
      mensaje.textContent = "Por favor, completa todos los campos.";
      mensaje.style.color = "red";
      return;
    }
    mensaje.textContent = `✅ ¡Gracias ${nombre}! Tu mesa para ${personas} personas ha sido reservada el ${fecha} a las ${hora}.`;
    mensaje.style.color = "green";
    document.getElementById("form-reserva").reset();
  });
  
  const modal = document.getElementById("modal");
  const modalCarrito = document.getElementById("modal-carrito");
  const modalCheckout = document.getElementById("modal-checkout");
  const modalImagen = document.getElementById("modal-imagen");
  const modalNombre = document.getElementById("modal-nombre");
  const modalDescripcion = document.getElementById("modal-descripcion");
  const modalPrecio = document.getElementById("modal-precio");

  const agregarCarritoBtn = document.getElementById("agregar-carrito");
  const checkoutBtn = document.getElementById("checkout");
  let platoActual = null;
  
  document.querySelectorAll(".ver-mas").forEach(boton => {
    boton.addEventListener("click", e => {
      const plato = e.target.closest(".plato");
      platoActual = {
        nombre: plato.dataset.nombre,
        descripcion: plato.dataset.descripcion,
        precio: parseFloat(plato.dataset.precio),
        imagen: plato.dataset.imagen
      };
      modalImagen.src = platoActual.imagen;
      modalNombre.textContent = platoActual.nombre;
      modalDescripcion.textContent = platoActual.descripcion;

      modalPrecio.textContent = `$${platoActual.precio}`;
      modal.style.display = "flex";
    });
  });
  
  agregarCarritoBtn.addEventListener("click", () => {
    if (platoActual) {
      carrito.push(platoActual);
      actualizarCarrito();
      modal.style.display = "none";
    }
  });
  
  document.querySelectorAll(".cerrar").forEach(cerrar => {
    cerrar.addEventListener("click", () => {
      modal.style.display = "none";
      modalCarrito.style.display = "none";
      modalCheckout.style.display = "none";
    });
  });
  
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
    if (e.target === modalCarrito) modalCarrito.style.display = "none";
    if (e.target === modalCheckout) modalCheckout.style.display = "none";
  });
  
  const botonesFiltro = document.querySelectorAll(".filtro");
  const categorias = document.querySelectorAll(".menu-grid");
  
  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
      const categoriaSeleccionada = boton.dataset.categoria;
      botonesFiltro.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
      categorias.forEach(categoria => {
        if (categoriaSeleccionada === "todos" || categoria.dataset.categoria === categoriaSeleccionada) {
          categoria.style.display = "grid";
        } else {
          categoria.style.display = "none";
        }
      });
    });
  });
  
  document.querySelector('.filtro[data-categoria="todos"]').classList.add("activo");
  
  let carrito = [];
  const contadorCarrito = document.getElementById("contador-carrito");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach((plato, index) => {
      total += plato.precio;
      const li = document.createElement("li");
      li.textContent = `${plato.nombre} - $${plato.precio}`;
      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "X";
      eliminarBtn.addEventListener("click", () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      });
      li.appendChild(eliminarBtn);
      listaCarrito.appendChild(li);
    });
    contadorCarrito.textContent = carrito.length;
    totalCarrito.textContent = `Total: $${total}`;
  }
  
  document.querySelector(".carrito-icono").addEventListener("click", () => {
    modalCarrito.style.display = "flex";
  });
  
  checkoutBtn.addEventListener("click", () => {
    modalCarrito.style.display = "none";
    modalCheckout.style.display = "flex";
  });
  
  document.getElementById("form-checkout").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("checkout-nombre").value.trim();
    const direccion = document.getElementById("checkout-direccion").value.trim();
    const tarjeta = document.getElementById("checkout-tarjeta").value.trim();
    const mensaje = document.getElementById("mensaje-checkout");
  
    if (!nombre || !direccion || !tarjeta) {
      mensaje.textContent = "Por favor, completa todos los campos.";
      mensaje.style.color = "red";
      return;
    }
  
    carrito = [];
    actualizarCarrito();
    mensaje.textContent = `✅ ¡Gracias ${nombre}! Tu pedido ha sido confirmado y será enviado a ${direccion}.`;
    mensaje.style.color = "green";
    this.reset();
  });
  