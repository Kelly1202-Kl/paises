async function consultarDetalhesDoPais() {
    // Obtém o ID do país a partir da URL
    const pegaIdPais = new URLSearchParams(window.location.search);
    const paisId = pegaIdPais.get("id");
  
    if (!paisId) {
      document.querySelector(".todosPaises").innerHTML = "País não encontrado.";
      return;
    }
  
    // Faz a requisição para obter os detalhes do país
    const resposta = await fetch(`https://restcountries.com/v3.1/alpha/${paisId}`);
    const [dadosPais] = await resposta.json();
  
    // Exibe os detalhes do país
    mostrarDetalhesDoPais(dadosPais);
  }
  function mostrarDetalhesDoPais(pais) {

    const detalhesDiv = document.querySelector(".todosPaises"); //contêiner onde os detalhes do país serão exibidos.
  
    detalhesDiv.innerHTML = `
      <div class="pais-detalhes">
        <h1 id=""> ${pais.translations.por.common}</h1>
        <img width="200" src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}" /> 
        <hr>
        <p><strong>Nome Oficial:</strong> ${pais.translations.por.official}</p>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "N/A"}</p>
        <p><strong>Línguas:</strong> ${Object.values(pais.languages).join(", ")}</p>
        <p><strong>Moeda:</strong> ${Object.values(pais.currencies)[0].name}(${Object.values(pais.currencies)[0].symbol})</p>
        <p><strong>Continente:</strong> ${pais.region}</p>
        <p><strong>Região:</strong> ${pais.region}</p>
        <p><strong>População:</strong> ${pais.population.toLocaleString()}</p>
        <p><strong>Área Geográfica:</strong> ${pais.area.toLocaleString()} km²</p>
        <p><strong>Mapa:</strong> <a href="https://www.google.com/maps/@${pais.latlng[0]},${pais.latlng[1]},6z" target="_blank">Ver no Google Maps</a></p>
        
      </div>
      `;
  }
   // Função para buscar os dados do país e pegar o nome em português
   async function buscarNomeEmPortugues(sigla) {
    const url = `https://restcountries.com/v3.1/alpha/${sigla}`;
    try {
      const response = await fetch(url);
      const dados = await response.json();
      const pais = dados[0]; // A API retorna um array

      // Pegando o nome do país em português
      const nomeEmPortugues = pais.translations.por.common;

      // Exibir no HTML
      document.getElementById('nome-portugues').textContent = nomeEmPortugues;
    } catch (error) {
      console.error("Erro ao buscar os dados do país:", error);
    }
  }

  // Exemplo de uso para buscar o Brasil
  buscarNomeEmPortugues('br');

  // Exemplo de uso para buscar o Brasil
  buscarNomeEmPortugues('br');
  // Chama a função para consultar e exibir os detalhes do país
  consultarDetalhesDoPais();
  