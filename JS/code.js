var todosPaises = [];
var todosPaisesDiv = document.querySelector(".todosPaises");
var qtPaises = document.querySelector("#qtPaises")

async function consultarPaises(url){
  var resposta = await fetch("https://restcountries.com/v3.1/" + url);
  var dados = await resposta.json();

  todosPaises = dados;
  todosPaises.sort();
  qtPaises.innerHTML = todosPaises.length;
  mostrarPaises(todosPaises)
}

function mostrarPaises(paises){
  todosPaisesDiv.innerHTML = "";
  paises.sort(function(a, b) {
    if (a.idade === b.idade) {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return a.name.common - b.name.common;
    }
  });
  for(pais of paises){
    // console.log(pais.name.common);

    var paisDiv = document.createElement("div");
    paisDiv.classList.add("pais");

       paisDiv.innerHTML =`<img  width="200px" height="190px" src="${pais.flags.png}" alt="${pais.flags.alt}">
        <p>${pais.name.common}</p>`;

          /* Adiciona o id od país ao atributo id do card pais */
    paisDiv.id = pais.cca2;

    /* Adiciona o evento de click ao card pais. Quando clica-se
       no card, a função abrirPaginaDetalhes é chamada */
    paisDiv.addEventListener("click", abrirPaginaDetalhes);

    todosPaisesDiv.appendChild(paisDiv);
  }
}

function abrirPaginaDetalhes(event){
  var paisId;

  /* Caso seja clicado em algum filho do card
  pais, pega-se o id do pai. Caso seja o próprio
  pai, pega-se o id dele */
  if (event.target.className != "pais") {
    paisId = event.target.parentElement.id;
  } else {
    paisId = event.target.id;
  }

  window.location.href = `./detalhes.html?id=${paisId}`;
}
    function buscarPaises(value){
        var paisBuscados = [];

    for (pais of todosPaises){
      var nome = pais.name.common.toLowerCase();
      if(nome.startsWith(value.toLowerCase())){
        paisBuscados.push(pais);
      }
      }
      todosPaisesDiv.innerHTML = "";
      qtPaises.innerHTML = paisBuscados.length;
      mostrarPaises(paisBuscados);
    }

    function pesquisarPaisporFiltro(value) {
      // https://restcountries.com/v3.1/region/america
      // https://restcountries.com/v3.1/region/asia
      // https://restcountries.com/v3.1/region/europa
      // https://restcountries.com/v3.1/region/africa
      // https://restcountries.com/v3.1/region/all

      var url = "";
      if(value != "all"){
        url = "region/" + value;
      }else{
        url = "all"
      }
      consultarPaises(url);
    }
consultarPaises("all");