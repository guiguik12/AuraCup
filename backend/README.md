<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://i.ebayimg.com/images/g/ihIAAeSwvXlolGTc/s-l1200.jpg" width="400" alt="Laravel Logo"></a></p>

## Pontos Principais

A principal pasta do Back é a routes, que vai definir os endpoints pros quais o front vai fazer as requisições.

## Rodando o Back End

Para rodar o Back-End, é necessário ter PHP e Composer instalado em sua máquina. Os passos a seguir assumem que você já os tem instalados.

### 1. Instalar dependencias com
```
composer install
```

### 2. Configurar variáveis de ambiente
Verificar env.example para ver quais variáveis adicionar.
Também rode esse comando para gerar a APP_KEY do Laravel:

```
php artisan key:generate
```

### 3. Rodar Migrations do banco
```
php artisan migrate
```

### 4. Rodar servidor Back End
```
php artisan serve
```