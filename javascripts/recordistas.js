document.addEventListener('DOMContentLoaded', function() {
  // ============ CARREGAR RECORDISTAS DO JSON ============
  function loadRecordistas() {
      fetch('../data/marcos-e-recordes.json')
          .then(response => response.json())
          .then(data => {
              const container = document.querySelector('.recordistas-container');
              if (!container) return;

              // Limpa o container
              container.innerHTML = '';

              // Itera sobre cada recordista
              data.forEach((item, index) => {
                  // Cria o item principal
                  const recordistaItem = document.createElement('div');
                  recordistaItem.className = 'recordistas-item';

                  // Cria a imagem do recordista
                  const foto = document.createElement('img');
                  foto.className = 'foto-recordista';
                  foto.src = item.foto;
                  foto.alt = item.alt || `Foto de ${item.nome}`;

                  // Cria o container de informações
                  const infoContainer = document.createElement('div');
                  infoContainer.className = 'recordista-info-container';

                  // Cria a div do nome
                  const nomeDiv = document.createElement('div');
                  nomeDiv.className = 'nome-recordista';
                  const nomeSpan = document.createElement('span');
                  nomeSpan.textContent = item.nome;
                  nomeDiv.appendChild(nomeSpan);

                  // Cria a div das informações
                  const infosDiv = document.createElement('div');
                  infosDiv.className = 'infos-recordista';

                  const modalidadeSpan = document.createElement('span');
                  modalidadeSpan.className = 'modalidade-recordista';
                  modalidadeSpan.textContent = item.modalidade;

                  const textoP = document.createElement('p');
                  textoP.className = 'texto-recordista';
                  textoP.textContent = item.texto;

                  infosDiv.appendChild(modalidadeSpan);
                  infosDiv.appendChild(textoP);

                  // Cria o ícone do trovão
                  const trovaoImg = document.createElement('img');
                  trovaoImg.className = 'trovao-icone-recordistas';
                  trovaoImg.src = item['icone-trovao'];
                  trovaoImg.alt = '';

                  // Monta a estrutura
                  infoContainer.appendChild(nomeDiv);
                  infoContainer.appendChild(infosDiv);
                  infoContainer.appendChild(trovaoImg);

                  recordistaItem.appendChild(foto);
                  recordistaItem.appendChild(infoContainer);

                  container.appendChild(recordistaItem);
              });
          })
          .catch(error => {
              console.error('Erro ao carregar os recordistas:', error);
              const container = document.querySelector('.recordistas-container');
              if (container) {
                  container.innerHTML = '<p style="color: white; text-align: center; width: 100%;">Erro ao carregar os recordistas. Tente novamente mais tarde.</p>';
              }
          });
  }

  // Executa o carregamento
  loadRecordistas();
});