class Produto {
    constructor() {
        this.id = 1;
        this.vetorProdutos = [];
        this.editId = null;

    }
    salvar() {
        let produto = this.lerDados(); //Atribuindo a função ler dados na variavel produto
        if (this.validacaoCampos(produto)) { //verifica se é verdadeiro
           if(this.editId == null){
            this.adiciona(produto);
        }else{
            this.atualizar(this.editId, produto)
        }
        }
        this.listaTabela();
        this.cancelar(); // Chama a função cancelar depois de salvar, para que os campos de entradas sejam limpos
    }
    listaTabela() {
        let tbody = document.getElementById('tbody'); //Acessando o Tbody da tabela
        tbody.innerText = ''; //Inicializando a função como vazia, para não duplicar os itens da lista ao serem adicionados
        for (let i = 0; i < this.vetorProdutos.length; i++) {
            let tr = tbody.insertRow(); // Insere uma linha no Tbody

            let td_id = tr.insertCell();//Insere uma celula (coluna) Id na linha
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.vetorProdutos[i].id; //Inserindo os dados no Html
            td_produto.innerText = this.vetorProdutos[i].nomeProduto;
            td_valor.innerText = this.vetorProdutos[i].valorProduto;

            td_id.classList.add('centralizado'); //Adiciona uma class a célula dinamica de Id

            let imgEdit = document.createElement('img'); //criando um elemente img 
            imgEdit.src = 'imagens/editar.svg'; //Informando o caminho da imagem
            imgEdit.setAttribute('onclick', 'produto.preparaEdicao(' + JSON.stringify(this.vetorProdutos[i])+ ')'); //Convertendo o objeto vetor produto em uma string json para os dados retornar ao input por meio da função preparaEdicao

            let imgDelete = document.createElement('img');
            imgDelete.src = 'imagens/excluir.svg';
            imgDelete.setAttribute('onclick', 'produto.deletar(' + this.vetorProdutos[i].id + ')') //inserindo a função deletar na imagem de exclusão, passando o id do produto como parametro concatenado para identifcar a linha que é para excluir 
            td_acoes.appendChild(imgEdit); //Adicionando o img criando dentro da celula
            td_acoes.appendChild(imgDelete);

            td_acoes.classList.add('centralizado');
            console.log(this.vetorProdutos);
        }
    }

    adiciona(produto) { //Adiciona o produto a ao vetor
        produto.valorProduto = parseFloat(produto.valorProduto);
        this.vetorProdutos.push(produto);
        this.id++; //Incrementa mais um no id para o proximo produto
    }

    atualizar(id, produto){
        for (let i = 0; i < this.vetorProdutos.length; i++) {
            if (this.vetorProdutos[i].id == id) {
                this.vetorProdutos[i].nomeProduto = produto.nomeProduto;
                this.vetorProdutos[i].valorProduto = produto.valorProduto;
            }
        }
        
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valorProduto;
        document.getElementById('botaoAtualizado').innerText = 'Atualizar' //Atualiza o botão de salvar para atualizar

    }

    lerDados() { //Le os valores informados no input e atribui ao objeto
        let produto = {} //Criando um objeto vazio
        produto.id = this.id; //Recebendo o valor do ID definido como atributo no contructor
        produto.nomeProduto = document.getElementById('produto').value; //Pegando o valor informado no input e adicionando ao objeto
        produto.valorProduto = document.getElementById('valor').value;

        return produto;
    }

    cancelar() {

        document.getElementById('produto').value = ''; //Deixando o campo input vazio ao se clicado em cancelar 
        document.getElementById('valor').value = '';

        document.getElementById('botaoAtualizado').innerText ='Salvar'
        this.editId = null;

    }
   
    deletar(id) {
        
        if(confirm('Deseja realmente deletar o produto do ID' + id)){ //Alert de confirmação antes de executar a função de deletar
            let tbody = document.getElementById("tbody");
        for (let i = 0; i < this.vetorProdutos.length; i++) {
            if (this.vetorProdutos[i].id == id) {
                this.vetorProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
    }

    
validacaoCampos(produto){ //Valida se os inputs foram preenchidos
    let mensagem = '';
    if (produto.nomeProduto == '') {
        mensagem += 'Informe o nome do Produto \n';
    }
    if (produto.valorProduto == '') {
        mensagem += 'Informe o valor do Produto \n';
    }
    if (mensagem != '') {
        alert(mensagem);
        return false;
    }
    return true;
}
}
let produto = new Produto();