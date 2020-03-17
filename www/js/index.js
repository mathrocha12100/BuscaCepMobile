/**
 * Funções de navegação de telas
 */

function changeScreen(screen) {
  $(document).ready(() => {
    $('#pages #main-page').hide(); 
    $(`#pages #${screen}`).animate( { width:'toggle' }, 200);
    $('header button').animate( { width: 'toggle' }, 50);
    this.actualScreen = screen;
  })
}

function backToMainScreen() {
  $(`#pages #${this.actualScreen}, header button`).hide();
  $('#pages #main-page').animate( { width: 'toggle' }, 200);
  this.actualScreen = null;
}

/**
 *
 */

async function getCep() {
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const street = document.getElementById("streetName").value;
    if (!city || !street) {
        return alert('Preencha os Dados');
    }
    if (city.length < 3 || street.length < 3) {
        return alert('Os campos Cidade e Rua precisam ter no minimo 3 letras');
    } 
    const tableAlreadyExist = document.getElementById('tableExists');
    if (tableAlreadyExist) {
        document.getElementById('tableExists').remove(); // remove o cabeçalho    
        for (let i in this.data) {
        document.getElementById('tableExists').remove(); // remove as colunas
        }
        this.data = []; 
    }
    await $.get(`https://viacep.com.br/ws/${state}/${city}/${street}/json`, (data, status) => {
        $('#getCepTable thead').append(`<tr id="tableExists">
            <th>CEP</th>
            <th>LOGRADOURO</th>
            <th>COMPLEMENTO</th>
            <th>BAIRRO</th>
        </tr>`);
        this.data = data;
        data.map(local => {
            const { cep, logradouro, complemento, bairro } = local;
            $("#getCepTable tbody").append(`
            <tr id="tableExists">
              <td>${cep}</td> 
              <td>${logradouro}</td>
              <td>${complemento || 'Não possui'}</td> 
              <td>${bairro}</td>  
            </tr>`);
        });
    });   
}

async function getAdress() {
  const cep = document.getElementById("cep").value;

  if (!cep) return alert('Preencha o seu cep!');

  if (cep.length < 9) return alert('Cep invalido');
  
   const tableAlreadyExist = document.getElementById('adressTable');
    if (tableAlreadyExist) {
        document.getElementById('adressTable').remove(); // remove o cabeçalho    
        document.getElementById('adressTable').remove(); // remove as colunas
    }
  /**
   * 
   */
    await $.get(`https://viacep.com.br/ws/${cep}/json`, (data, status) => {
            const { cep, logradouro, bairro } = data;
      
           $('#getAdressTable thead').append(`
           <tr id="adressTable"> 
                <th>CEP</th> 
                <th>ENDEREÇO</th>
                <th>BAIRRO</th>
                <th />  
              </tr>`);
            
            $("#getAdressTable tbody").append(`
              <tr id="adressTable"> 
                <td>${cep}</td> 
                <td>${logradouro}</td>
                <td>${bairro}</td>
                <td />  
              </tr>`);
      });
}