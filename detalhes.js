window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
  
    fetch(`https://albuns.eduardonunesneu.repl.co/Albuns/${id}`)
      .then(response => response.json())
      .then(album => {
        document.getElementById('nome').textContent = album.nome;
        document.getElementById('imagem').src = album.img;
        document.getElementById('descricao').textContent = album.descricao;
        document.getElementById('data').textContent = album.data;
  
        const itensContainer = document.getElementById('itens');
        album.itens.forEach((item, index) => {
          const itemElement = document.createElement('div');
          itemElement.className = 'item'; 
        
          const img = document.createElement('img');
          img.src = item.imgitem; 
        
          const h2 = document.createElement('h2');
          h2.textContent = item.nomeitem; 
        
          const p = document.createElement('p');
          p.textContent = item.descricaoitem; 
        
          itemElement.appendChild(img);
          itemElement.appendChild(h2);
          itemElement.appendChild(p);
        
          // Adicione um evento de clique ao item
          itemElement.addEventListener('click', function() {
            // Aqui você pode definir as imagens do carrossel para a imagem do item
            const carouselInner = document.querySelector('.carousel-inner');
            carouselInner.innerHTML = ''; // Limpe o carrossel
          
            // Crie um array com todas as imagens, começando pela imagem do item clicado
            const images = album.itens.slice(index).concat(album.itens.slice(0, index)).map(item => item.imgitem);
          
            images.forEach((image, imageIndex) => {
              const carouselItem = document.createElement('div');
              carouselItem.className = 'carousel-item' + (imageIndex === 0 ? ' active' : '');
          
              const carouselImage = document.createElement('img');
              carouselImage.className = 'd-block w-100';
              carouselImage.src = image;
              carouselImage.alt = `Slide ${imageIndex + 1}`;
          
              carouselItem.appendChild(carouselImage);
              carouselInner.appendChild(carouselItem);
            });
          
            // Agora, você pode abrir o modal
            const modal = document.getElementById('myModal');
            modal.style.display = "block";
          });
        
          itensContainer.appendChild(itemElement); 
        });
  
        // Adicione o evento de clique aqui, depois que todos os dados do álbum foram carregados
        document.getElementById('destaque-button').addEventListener('click', function() {
          fetch('https://albuns.eduardonunesneu.repl.co/Destaque', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
            }),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Sucesso:', data);
          })
          .catch((error) => {
            console.error('Erro:', error);
          });
        });
      });
  };
  var modal = document.getElementById("myModal");
  
  // Obtenha o elemento que fecha o modal
  var span = document.getElementsByClassName("close")[0];
  
  // Quando o usuário clica no <span> (x), fecha o modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // Quando o usuário clica em qualquer lugar fora do modal, fecha ele
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  