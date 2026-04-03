async function getEndereco(cep){
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(res => res.json())
  .then(data => {
    if (data.erro) {
      console.log("CEP não encontrado");
      return;
    }
    return data
})
.catch(err => console.error(err));
}

export default getEndereco