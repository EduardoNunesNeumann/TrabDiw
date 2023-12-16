function fetchPerfil() {
    fetch('https://login.eduardonunesneu.repl.co/usuarios')
      .then(function(response) { return response.json() })
      .then(function(data) {
        Usuario = data;
      });
}
window.onload = function() {
    // Recupere as informações do usuário do armazenamento local
    var user = JSON.parse(localStorage.getItem('user'));
  
    // Atualize a página do perfil com as informações do usuário
    document.getElementById('nome').innerText = user.nome;
    document.getElementById('dataCadastro').innerText = user.dataCadastro;
  };
  document.getElementById('logoutButton').addEventListener('click', function() {
    // Limpe as informações do usuário do armazenamento local
    localStorage.removeItem('user');
  
    // Redirecione o usuário para a página de login
    window.location.href = 'login.html';
  });