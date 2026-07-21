$(document).ready(function(){

  //////////////////////////////////////////////////////////////////
  // HEADER DINÂMICO
  // Mostra header somente no início da página.
  // Descomentar caso utilizada a classe .header-dinamico. Caso contrário, deletar.

    $(window).scroll(function(){
      var nav = $(".header-dinamico .container");
      var scroll = $(window).scrollTop();
      if(scroll == 0){
        nav.fadeIn();
      } else {
        nav.fadeOut();
      }
    });

  //////////////////////////////////////////////////////////////////

  // Seu código abaixo

  // Carregar os dados do JSON
  fetch('../data/estrutura-complexo-icones.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('iconesEstrutura');
    
    // Organizar em grupos de 5, 4, 4
    const grupos = [];
    const tamanhos = [5, 4, 4];
    let index = 0;
    
    tamanhos.forEach(tamanho => {
      const grupo = data.slice(index, index + tamanho);
      if (grupo.length > 0) {
        grupos.push(grupo);
      }
      index += tamanho;
    });
    
    // Criar as linhas
    grupos.forEach((grupo, linhaIndex) => {
      const linha = document.createElement('div');
      linha.className = 'icones-linha';
      
      grupo.forEach(item => {
        const divItem = document.createElement('div');
        divItem.className = 'icones-estrutura-item';
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.alt;
        
        const span = document.createElement('span');
        span.textContent = item.titulo;
        
        divItem.appendChild(img);
        divItem.appendChild(span);
        linha.appendChild(divItem);
      });
      
      container.appendChild(linha);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar os ícones:', error);
  });

})
