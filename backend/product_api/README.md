![PRÉVIA](https://i.ibb.co/v36GqMw/pictures-1.jpg)

<h1 align="center">Backend App Product List</h1>

<h4 align="center"> 
	Concluído
</h4>

### Features
- [x] Login
- [x] Cadastro de Produtos
- [x] Listar Produtos
- [x] Editar Produtos
- [x] Deletar Produtos

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
Git, Java 17, Gradle, MySQL Server

Além disto é bom ter um editor para trabalhar com o código como IntelliJ IDEA ou VSCode.

### 🎲 Rodando o BackEnd (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/romulociro/product-list

# Acesse a pasta do projeto no terminal/cmd
$ cd app-product-list

# Vá para a pasta backend (se aplicável)
$ cd backend

# Para iniciar o MySQL Server, você pode usar o Docker:
$ sudo docker run --name mysql-product-list -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 -d mysql:latest

# Instale as dependências (se estiver usando Gradle Wrapper)
$ ./gradlew build

# ou, se estiver usando Gradle localmente:
$ gradle build

# Execute a aplicação
$ ./gradlew bootRun

# ou, se estiver usando Gradle localmente:
$ gradle bootRun

# O servidor inciará na porta:8080 - acesse <http://localhost:8080>
```

### 🚀 Acesso Padrão
Para facilitar os testes e o acesso inicial à aplicação, disponibilizamos um usuário já pré-cadastrado:

- Usuário: usuario1
- Senha: 123456

### FrontEnd
[Frontend Product List](https://github.com/romulociro/product-list/tree/master/frontend/product-list)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Gradle](https://gradle.org/)
- [Spring 3.0.3](https://spring.io/)
- [MySQL](https://www.mysql.com/)
