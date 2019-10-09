# COMMERCE

Instalação do projeto:

	Configurar ambiente Java/Quarkus.
	Configurar ambiente Angular.
	Criar banco:
		Nome do banco = "banco_teste".
		Usuário = "postgres".
		Senha = "postgres".
		"O scritp do banco está na raiz do projeto".

Instalar as dependencias de cada projeto:

	Entrar na pasta "commerce-java" executar mvn install (precisa do maven instalado).
	Entrar na pasta "commerce" executar "npm install" (precisa do node instalado).
	
Para Windows executar o arquivo "start.bat" irá subir o servidor de back-end e de front-end.

	Alternativo:
	
		Entrar na pasta "commerce-java" executar "mvn compile quarkus:dev" para subir o back-end.	
		Entrar na pasta "commerce" executar "ng serve -o" para subir o front-end.
	

O projeto possui integração com firebase para controle de login.

As imagens utilizadas sobem para um bucket no S3 da AWS.

Utilizei uma biblioteca chamada "angular-cropperjs" para recortar as imagens.


O usuário administrador é "admin@admin.com" com senha "123456" (já está salvo no Firebase).

Para realizar a compra é necessário cadastrar um produto como admin e cadastrar um usuário filho para efetuar a compra.
