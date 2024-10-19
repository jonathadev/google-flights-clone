Está presente nesse readme
incluindo as seções para instalação, uso e uma lista de origens e destinos suportados:

```markdown
# Flight Search Application

Uma aplicação em React que permite aos usuários buscar voos com base em origem, destino e data de partida. A aplicação utiliza a API da AviationStack para obter informações sobre preços de voos.

## Funcionalidades

- Busca voos com base em códigos IATA de origem e destino.
- Filtra os resultados por grupo de preço (baixo, médio, alto).
- Ordena os resultados por preço.
- Salva buscas no armazenamento local do navegador.

## Tecnologias Utilizadas

- React
- Material UI
- Axios
- API da AviationStack // https://rapidapi.com/apiheya/api/sky-scrapper

para teste no postman
[https://web.postman.co/workspace/My-Workspace~ae01232b-9d25-429e-81a8-31a4152cd820](https://aviationstack.p.rapidapi.com/api/v1/flights/getPriceCalendar?fromDate=2024-10-20&originSkyId=LOND&destinationSkyId=NYCA)



## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie a aplicação:
   ```bash
   npm start
   ```

5. Acesse a aplicação no seu navegador em `http://localhost:3000`.

## Uso

1. Insira o código IATA de origem e destino nos campos correspondentes.
2. Selecione a data de partida.
3. Clique no botão "Buscar Voos" para ver os resultados.
4. Utilize os filtros para refinar os resultados.
5. Clique em "Salvar Busca" para armazenar sua busca.

## Origens e Destinos Suportados

A aplicação suporta os seguintes códigos IATA:

- **Origens:**
  - GRU: Aeroporto Internacional de São Paulo/Guarulhos
  - GIG: Aeroporto Internacional do Rio de Janeiro/Galeão
  - BSB: Aeroporto Internacional de Brasília
  - FOR: Aeroporto Internacional Pinto Martins (Fortaleza)
  - REC: Aeroporto Internacional dos Guararapes (Recife)

- **Destinos:**
  - LAX: Aeroporto Internacional de Los Angeles
  - JFK: Aeroporto Internacional John F. Kennedy (Nova Iorque)
  - ORD: Aeroporto Internacional O'Hare (Chicago)
  - MIA: Aeroporto Internacional de Miami
  - ATL: Aeroporto Internacional de Hartsfield-Jackson (Atlanta)

![image](https://github.com/user-attachments/assets/5ddbc602-e035-4347-a91d-d33e72cd56b1)

VIDEO NO LOOM https://www.loom.com/share/e81a9b9bbf55490384ec563e3e5c5331?sid=55fe7ae7-9355-4452-82ee-f061286f8a2b

Sobre botão salvar busca
No código que você forneceu, a funcionalidade de "Salvar Busca" já está configurada para armazenar as buscas no **Local Storage** do navegador. Quando o usuário pressiona o botão "Salvar Busca", os dados da busca (origem, destino e data) são salvos no Local Storage sob a chave `'savedSearches'`.

Aqui está um resumo de como isso funciona:

1. **Salvar Busca**: Quando o botão "Salvar Busca" é clicado, a função `saveSearch` é chamada.
2. **Coleta de Dados**: A função coleta os dados da busca atual (origem, destino e data) e os armazena em um objeto `searchData`.
3. **Recuperação do Local Storage**: A função então recupera as buscas salvas anteriormente do Local Storage. Se não houver buscas salvas, ela inicializa um array vazio.
4. **Adicionar Nova Busca**: A nova busca é adicionada ao array de buscas salvas.
5. **Salvar de Volta no Local Storage**: Finalmente, o array atualizado é salvo de volta no Local Storage.

### Código da Função `saveSearch`

Aqui está a função `saveSearch` do seu código:

```javascript
const saveSearch = () => {
  const searchData = { origin, destination, fromDate };
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches')) || [];
  savedSearches.push(searchData);
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  alert('Busca salva!');
};
```

### Onde Encontrar as Buscas Salvas

As buscas salvas podem ser visualizadas diretamente no Local Storage do navegador. Para acessá-las:

1. **Abra o DevTools** do seu navegador (geralmente pressionando `F12` ou `Ctrl + Shift + I`).
2. **Vá para a aba "Application" (ou "Aplicação")**.
3. **No menu à esquerda, expanda "Local Storage"** e clique no domínio da sua aplicação.
4. Você verá uma lista de pares chave-valor, onde a chave será `'savedSearches'` e o valor será um array com todas as buscas salvas.

Melhorias futuras
retirar grupos? low, medium e high
Datas bagunçadas/organizar
Se você quiser implementar uma funcionalidade para visualizar essas buscas salvas na sua aplicação, você pode adicionar um botão para carregar e exibir essas informações de forma amigável ao usuário.

## Contribuição

Se você quiser contribuir com o projeto, sinta-se à vontade para abrir um pull request ou criar um issue.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

### Personalização
Sinta-se à vontade para ajustar os códigos IATA e as informações de acordo com a sua necessidade. Se precisar de mais alguma coisa ou de ajustes específicos, é só avisar!
