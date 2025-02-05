const URL_IMG_ALEATORIO =
  "https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_74eZ1QvQTHB1sEzP8Kter77B2NtYVq5axFrRmmkouodyGuKJnyLP7Cez6ViNOAgc";
const URL_IMG_FAVORITAS =
  "https://api.thedogapi.com/v1/favourites?api_key=live_74eZ1QvQTHB1sEzP8Kter77B2NtYVq5axFrRmmkouodyGuKJnyLP7Cez6ViNOAgc";
const URL_IMG_FAVORITAS_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_74eZ1QvQTHB1sEzP8Kter77B2NtYVq5axFrRmmkouodyGuKJnyLP7Cez6ViNOAgc`;
const URL_IMG_UPLOAD = "https://api.thedogapi.com/v1/images/upload";

// Obtener imagenes aleatorias
const obtenerImagenesAleatorias = async () => {
  try {
    const response = await fetch(URL_IMG_ALEATORIO);
    const data = await response.json();

    const imgAleatoriasContainer = document.getElementById(
      "img-aleatorias--container"
    );
    imgAleatoriasContainer.innerHTML = "";

    data.map((imgLomito) => {
      const imgElement = document.createElement("img");
      imgElement.src = imgLomito.url;
      imgElement.addEventListener("click", () => {
        guardarImagenesFavoritas(imgLomito.id);
      });

      imgAleatoriasContainer.appendChild(imgElement);
    });
  } catch (error) {
    throw error;
  }
};
obtenerImagenesAleatorias();
const btnRecargarImgAleatorias = document.getElementById("btn-img-aleatorias");
btnRecargarImgAleatorias.addEventListener("click", () =>
  obtenerImagenesAleatorias()
);

// Obtener imagenes favoritas
const obtenerImagenesFavoritas = async () => {
  try {
    const response = await fetch(URL_IMG_FAVORITAS);
    const data = await response.json();

    const imgFavoritasContainer = document.getElementById(
      "img-favoritas--container"
    );
    imgFavoritasContainer.innerHTML = "";

    data.map((imgLomito) => {
      const imgElement = document.createElement("img");
      imgElement.src = imgLomito.image.url;
      imgElement.addEventListener("click", () => {
        eliminarImagenDeFavoritas(imgLomito.id);
      });

      imgFavoritasContainer.appendChild(imgElement);
    });
  } catch (error) {
    throw error;
  }
};
obtenerImagenesFavoritas();

// Guardar imagenes favoritas
const guardarImagenesFavoritas = async (id) => {
  try {
    const response = await fetch(URL_IMG_FAVORITAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_id: id
      })
    });
    obtenerImagenesFavoritas();
  } catch (error) {
    throw error;
  }
};

// Eliminar imagenes favoritas
const eliminarImagenDeFavoritas = async (id) => {
  try {
    const response = await fetch(URL_IMG_FAVORITAS_DELETE(id), {
      method: "DELETE"
    });
    obtenerImagenesFavoritas();
  } catch (error) {
    throw error;
  }
};

// Subir foto de tu lomito
const subirImagenLomito = async () => {
  try {
    const form = document.getElementById("upload-form");
    const formData = new FormData(form);

    const response = await fetch(URL_IMG_UPLOAD, {
      method: "POST",
      headers: {
        "X-API-KEY":
          "live_74eZ1QvQTHB1sEzP8Kter77B2NtYVq5axFrRmmkouodyGuKJnyLP7Cez6ViNOAgc"
      },
      body: formData
    });
    const data = await response.json();

    guardarImagenesFavoritas(data.id);
  } catch (error) {
    throw error;
  }
};
const btnUploadLomito = document.getElementById("btn-upload-lomito");
btnUploadLomito.addEventListener("click", () => subirImagenLomito());
