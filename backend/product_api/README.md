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
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/)
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

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
### FrontEnd
[https://github.com/romulociro/frontend-movieslist](https://github.com/romulociro/product-list/tree/master/frontend/product-list)

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

Java 17
Gradle
Spring Boot 3.0.3
MySQL
