# 🤖 Taya - Teste Técnico


[![Node.js CI](https://github.com/gabrielmoura33/taya-teste-tecnico/actions/workflows/node.js.yml/badge.svg)](https://github.com/gabrielmoura33/taya-teste-tecnico/actions/workflows/node.js.yml)
[![License MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/gabrielmoura33/taya-teste-tecnico/blob/main/LICENSE)
[![Made with NestJS](https://img.shields.io/badge/made%20with-NestJS-red)](https://nestjs.com/)

## Visão Geral

Esta documentação fornece uma visão abrangente da aplicação NestJS desenvolvida com base com base nos requisitos estabelecidos. A aplicação é projetada para gerenciar propostas, usuários e clientes, implementando funcionalidades como recuperação de propostas, aprovação de propostas e geração de relatórios administrativos. A aplicação segue os princípios da **Arquitetura Limpa** e do **Domain-Driven Design (DDD)**, aproveitando os benefícios da injeção de dependência e inversão de controle fornecidos pelo NestJS.

## Índice

1. [Arquitetura e Padrões de Design](#arquitetura-e-padrões-de-design)
   - [Arquitetura Limpa](#arquitetura-limpa)
   - [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
2. [Módulos e Camadas](#módulos-e-camadas)
   - [Camada de Apresentação](#camada-de-apresentação)
   - [Camada de Aplicação](#camada-de-aplicação)
   - [Camada de Domínio](#camada-de-domínio)
   - [Camada de Infraestrutura](#camada-de-infraestrutura)
3. [Injeção e Inversão de Dependência](#injeção-e-inversão-de-dependência)
4. [Benefícios da Arquitetura Escolhida](#benefícios-da-arquitetura-escolhida)
5. [Detalhes de Implementação](#detalhes-de-implementação)
   - [Controllers](#controllers)
   - [DTOs e Validação](#dtos-e-validação)
   - [Repositórios](#repositórios)
   - [Entidades](#entidades)
   - [Casos de Uso](#casos-de-uso)
   - [Middlewares](#middlewares)
6. [Estratégia de Testes](#estratégia-de-testes)
   - [Testes Unitários](#testes-unitários)
   - [Testes de Ponta a Ponta (E2E)](#testes-de-ponta-a-ponta-e2e)
7. [Documentação Swagger](#documentação-swagger)
8. [Dockerização](#dockerização)
9. [Como Inicializar a Aplicação](#como-inicializar-a-aplicação)
10. [Conclusão](#conclusão)

---

## Arquitetura e Padrões de Design

### Arquitetura Limpa

A aplicação é construída seguindo os princípios da **Arquitetura Limpa** proposta por Robert C. Martin (Uncle Bob). A Arquitetura Limpa enfatiza a separação de preocupações e promove a criação de sistemas que são:

- **Independentes de frameworks**: A arquitetura não depende da existência de alguma biblioteca ou software cheio de recursos.
- **Testáveis**: As regras de negócio podem ser testadas sem a interface do usuário, banco de dados, servidor web ou qualquer outro elemento externo.
- **Independentes da interface do usuário**: A interface do usuário pode mudar facilmente sem alterar o restante do sistema.
- **Independentes do banco de dados**: As regras de negócio não estão vinculadas ao banco de dados.
- **Independentes de agências externas**: As regras de negócio não sabem nada sobre o mundo externo.

### Domain-Driven Design (DDD)

A aplicação também incorpora princípios do **Domain-Driven Design (DDD)**, focando em modelar o domínio com precisão e refletindo a lógica de negócio através do código. O DDD enfatiza:

- **Entidades**: Objetos que têm uma identidade distinta que persiste através do tempo e diferentes representações.
- **Objetos de Valor**: Objetos que descrevem algumas características ou atributos, mas não têm identidade conceitual.
- **Agregados**: Um cluster de objetos de domínio que pode ser tratado como uma única unidade.
- **Repositórios**: Mecanismos para encapsular armazenamento, recuperação e comportamento de busca.

---

## Módulos e Camadas

A aplicação está organizada em módulos e camadas, promovendo modularidade e separação de preocupações.

### Camada de Apresentação

- **Controllers**: Manipulam as requisições HTTP e as respostas. Eles recebem dados do cliente, passam para a camada de aplicação e retornam o resultado.
- **DTOs (Data Transfer Objects)**: Definem a estrutura dos dados que são enviados pela rede. Eles são usados para validação de entrada e serialização.

### Camada de Aplicação

- **Casos de Uso (Interatores)**: Contêm as regras de negócio específicas da aplicação. Eles orquestram o fluxo de dados de e para as entidades e direcionam essas entidades para usar suas regras de negócio para atingir os objetivos do caso de uso.

### Camada de Domínio

- **Entidades**: Representam os objetos centrais do negócio com regras e lógica de negócio.
- **Interfaces de Repositórios**: Definem os contratos para persistência de dados sem especificar a implementação concreta.

### Camada de Infraestrutura

- **Implementações de Repositórios**: Fornecem implementações concretas das interfaces de repositório, lidando com a persistência de dados usando TypeORM.
- **Entidades ORM**: Mapear entidades de domínio para tabelas de banco de dados.

---

## Injeção e Inversão de Dependência

A aplicação aproveita o contêiner de **Injeção de Dependência (DI)** embutido no NestJS para gerenciar dependências e promover o baixo acoplamento entre os componentes.

- **Injeção de Dependência**: Permite a injeção de dependências (serviços, repositórios) em classes em vez de codificá-las, tornando o código mais modular e testável.
- **Inversão de Controle (IoC)**: O controle da criação de objetos e gerenciamento de dependências é invertido das próprias classes para o contêiner IoC.

**Benefícios:**

- **Testabilidade**: As dependências podem ser facilmente simuladas ou substituídas durante os testes.
- **Manutenibilidade**: Os componentes são fracamente acoplados, tornando o sistema mais fácil de manter e estender.
- **Flexibilidade**: Implementações podem ser trocadas sem alterar as classes dependentes.

---

## Benefícios da Arquitetura Escolhida

- **Separação de Preocupações**: Cada camada tem uma responsabilidade específica, tornando o sistema organizado e mais fácil de entender.
- **Escalabilidade**: A estrutura modular permite que a aplicação escale horizontalmente adicionando novas funcionalidades sem afetar as existentes.
- **Reutilização**: A lógica de negócio é encapsulada em casos de uso e entidades, que podem ser reutilizados em diferentes partes da aplicação.
- **Testabilidade**: A clara separação e uso de interfaces tornam os testes unitários diretos.

---

## Detalhes de Implementação

### Controllers

Os controllers são responsáveis por manipular as requisições recebidas e retornar respostas ao cliente.

- **ProposalController**: Gerencia endpoints relacionados a propostas, como recuperação, aprovação e listagem de propostas.
- **AdminController**: Fornece endpoints administrativos, como geração de relatórios.

### DTOs e Validação

Os DTOs são usados para definir o formato dos dados enviados nas requisições e respostas.

- **Validação**: Utiliza `class-validator` e `class-transformer` para validar e transformar os dados de entrada.
- **Anotações Swagger**: Decorados com `@ApiProperty` para documentação da API.

**Exemplo:**

```typescript
export class GetProposalByIdDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'ID da proposta', example: 1 })
  id: number;
}
```

### Repositórios

Os repositórios abstraem a camada de persistência de dados, fornecendo uma forma de interagir com o banco de dados sem expor detalhes de implementação.

- **Interfaces**: Definem contratos para os métodos do repositório.
- **Implementações**: Classes concretas que usam TypeORM para interagir com o banco de dados.

**Exemplo de Interface:**

```typescript
export interface ProposalRepositoryInterface {
  findById(id: number): Promise<Proposal | null>;
  // Outros métodos
}
```

**Exemplo de Implementação:**

```typescript
@Injectable()
export class ProposalRepository implements ProposalRepositoryInterface {
  constructor(
    @InjectRepository(ProposalOrmEntity)
    private readonly ormRepository: Repository<ProposalOrmEntity>,
  ) {}

  async findById(id: number): Promise<Proposal | null> {
    const proposalEntity = await this.ormRepository.findOne({ where: { id } });
    return proposalEntity ? this.toDomain(proposalEntity) : null;
  }

  // Outros métodos
}
```

### Entidades

As entidades representam os objetos centrais do negócio com atributos e comportamentos.

**Exemplo:**

```typescript
export class Proposal {
  constructor(
    public id: number,
    public profit: number,
    public status: ProposalStatus,
    public userCreatorId: number,
    public customerId: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
```

### Casos de Uso

Os casos de uso encapsulam a lógica de negócio específica da aplicação.

**Exemplo:**

```typescript
@Injectable()
export class GetProposalByIdForUserUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(proposalId: number, userId: number): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(proposalId);
    if (!proposal) {
      throw new ProposalNotFoundException();
    }
    if (proposal.userCreatorId !== userId) {
      throw new ProposalAccessDeniedException();
    }
    return proposal;
  }
}
```

### Middlewares

As funções de middleware são usadas para processar requisições antes que elas cheguem ao controller.

- **UserMiddleware**: Extrai o `user_id` dos cabeçalhos da requisição, recupera o usuário e o anexa ao objeto de requisição.

**Implementação:**

```typescript
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepositoryInterface) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'];

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const user = await this.userRepository.findById(parseInt(userId as string));

    if (user) {
      (req as any).user = user;
    }

    next();
  }
}
```

---

## Estratégia de Testes

### Testes Unitários

Os testes unitários são escritos para testar unidades individuais de código em isolamento.

- **Casos de Uso**: Os testes cobrem vários cenários, incluindo casos de sucesso e erro.
- **Repositórios**: Os testes garantem que os métodos do repositório interajam com o banco de dados conforme esperado.
- **Controllers**: Os testes verificam se os controllers manipulam corretamente as requisições e respostas.
- **Middleware**: Os testes verificam se as funções de middleware processam as requisições adequadamente.

**Exemplo de Teste para Caso de Uso:**

```typescript
describe('GetProposalByIdForUserUseCase', () => {
  it('deve retornar a proposta quando encontrada e o usuário tiver acesso', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Testes de Ponta a Ponta (E2E)

Os testes E2E simulam interações reais do usuário com a aplicação.

- **Configuração**: Inicializa a aplicação e as conexões com o banco de dados.
- **Testes**: Cobrem as principais funcionalidades dos controllers.
- **Encerramento**: Limpa os recursos após os testes.

**Exemplo de Teste E2E:**

```typescript
describe('ProposalController (e2e)', () => {
  it('GET /proposals/:id - sucesso', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

---

## Documentação Swagger

A aplicação usa o Swagger para documentação da API.

- **Decorator de Documentação**: Um decorator personalizado é usado para anotar métodos do controller com metadados de documentação.
- **Swagger UI**: Acessível via endpoint `/api-docs`, fornecendo uma interface interativa para explorar a API.

**Configuração no `main.ts`:**

```typescript
const config = new DocumentBuilder()
  .setTitle('Proposal API')
  .setDescription('Documentação da API para o serviço de Propostas')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

---

## Dockerização

A aplicação pode ser containerizada usando Docker.

- **Dockerfile**: Define como construir a imagem Docker.
- **Docker Compose**: Orquestra o contêiner da aplicação e quaisquer dependências (por exemplo, banco de dados).

**Exemplo de Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
```

**Exemplo de Docker Compose:**

```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: development
      DATABASE_TYPE: sqlite
      DATABASE_PATH: ./data/db.sqlite
    volumes:
      - .:/app
      - /app/node_modules
    command: >
      sh -c "
      npm install &&
      npm run start:dev
      "
```

---

## Como Inicializar a Aplicação

### Pré-requisitos

- **Node.js**: Certifique-se de que o Node.js (versão 18 ou superior) está instalado em seu ambiente.
- **Docker**: Para executar a aplicação via Docker, é necessário ter o Docker e o Docker Compose instalados.

### Passos para Inicialização

#### 1. Clonar o Repositório

```bash
git clone https://github.com/gabrielmoura33/taya-teste-tecnico.git
cd taya-teste-tecnico
```

#### 2. Instalar Dependências

```bash
npm install
```

#### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:

```env
NODE_ENV=development
DATABASE_TYPE=sqlite
DATABASE_PATH=./data/db.sqlite
```

#### 4. Executar Migrações

Para configurar o banco de dados e criar as tabelas necessárias, execute:

```bash
npm run migration:run
```

#### 5. Iniciar a Aplicação

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000`.

#### 6. Acessar a Documentação Swagger

A documentação da API pode ser acessada em:

```
http://localhost:3000/api-docs
```

### Executando com Docker

#### 1. Construir e Iniciar os Contêineres

```bash
docker-compose up --build
```

#### 2. Executar Migrações no Contêiner

```bash
docker-compose exec app npm run migration:run
```

#### 3. Acessar a Aplicação e Documentação

- Aplicação: `http://localhost:3000`
- Documentação Swagger: `http://localhost:3000/api-docs`

---

## Conclusão

A aplicação foi projetada com foco em arquitetura limpa e manutenibilidade. Ao utilizar os princípios da Arquitetura Limpa e do Domain-Driven Design, a base de código é organizada, escalável e testável. A injeção de dependência e inversão de controle desempenham um papel crucial no desacoplamento dos componentes e facilitam os testes.

A implementação assegura que:

- A lógica de negócio está separada das preocupações de framework e infraestrutura.
- Os componentes são fracamente acoplados, promovendo manutenção e escalabilidade mais fáceis.
- A aplicação está bem documentada, tanto no código quanto via Swagger UI.
- Estratégias de testes estão em vigor para garantir a qualidade e confiabilidade do código.
- A aplicação pode ser facilmente containerizada e implantada.

Esta abordagem de arquitetura e design fornece uma base sólida para construir aplicações robustas que podem evoluir com as necessidades de negócio em constante mudança.

