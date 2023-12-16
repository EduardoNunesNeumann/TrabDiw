let Albuns = [];

window.onload = fetchAlbums;

function fetchAlbums() {
  fetch('https://albuns.eduardonunesneu.repl.co/Albuns')
    .then(function(response) { return response.json() })
    .then(function(dados) {
      Albuns = dados;
      ListaAlbuns();
    });
}
window.onload = function() {
  var user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    // O usuário está logado, mostre o link do perfil
    const containerperfil = document.getElementById('perfilLink');
    const novoH3 = document.createElement('h3');
    novoH3.textContent = user.usuario; // Define o texto do novo elemento h3 para o nome do usuário
    // Substitui o h3 existente pelo novo h3
    const h3Existente = containerperfil.querySelector('h3');
    if (h3Existente) {
        containerperfil.replaceChild(novoH3, h3Existente);
    } else {
        containerperfil.appendChild(novoH3);
    }
    containerperfil.style.display = 'block'; // Mostra o link do perfil
} else {
    // O usuário não está logado, mostre o link de login
    document.getElementById('loginLink').style.display = 'block'; // Mostra o link de login
}
  fetchAlbums();
  // Restante do seu código...
};

function ListaAlbuns() {
  const container = document.getElementById('album-container');
  container.innerHTML = ''; // Limpa o conteúdo atual

  Albuns.forEach(album => {
    const div = document.createElement('div');
    div.className = 'album'; // Adiciona a classe 'album' ao div
    div.id = `album-${album.nome}`; // Adiciona um id único ao elemento do álbum

    const img = document.createElement('img');
    img.src = album.img; // Adiciona a imagem do álbum

    const h2 = document.createElement('h2');
    h2.textContent = album.nome; // Adiciona o nome do álbum

    // Cria um link para a página de detalhes
    const a = document.createElement('a');
    a.href = `detalhes.html?id=${album.id}`; // Adiciona o ID do álbum como parâmetro

    // Adiciona os elementos ao link
    a.appendChild(img);
    a.appendChild(h2);

    div.appendChild(a); // Adiciona o link ao div

    container.appendChild(div); // Adiciona o álbum ao container

    // Adicione um evento de "mouseover" ao elemento do álbum
    div.addEventListener('mouseover', function() {
        // Mude a localização do mapa para a localização do álbum
        map.flyTo({ center: [album.lng, album.lat], zoom: 10 });
    });
    var marker = new mapboxgl.Marker()
    .setLngLat([album.lng, album.lat])
    .addTo(map);

// Adicione um evento de clique ao marcador
marker.getElement().addEventListener('click', function() {
    window.location.href = `detalhes.html?id=${album.id}`; // Redireciona para a página do álbum
});
});
}
fetch('https://albuns.eduardonunesneu.repl.co/Destaque')
  .then(response => response.json())
  .then(destaque => {
    const id = destaque.id;
    // Busque o álbum em destaque
    fetch(`https://albuns.eduardonunesneu.repl.co/Albuns/${id}`)
      .then(response => response.json())
      .then(album => {
        // Selecione as tags de imagem do carrossel
        const carouselImages = document.querySelectorAll('#carouselExampleIndicators .carousel-item img');
        // Atualize o atributo 'src' das tags de imagem com as três primeiras imagens do álbum
        album.itens.slice(0, 3).forEach((item, index) => {
          if (carouselImages[index]) {
            carouselImages[index].src = item.imgitem;
          }
        });
      });
  });


  
  

