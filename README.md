# Collage API
APIS that serve CRUD operations to be consumed on this [repository](https://github.com/wambugudavis/collage-app)

### Requirements
- Latest version of NodeJS

## Getting Started
Clone the repository
```
git clone https://github.com/wambugudavis/collage-apis.git
```
Install AdonisJS CLI globally via ``npm``
```
npm i -g @adonisjs/cli
```

Copy the example env file and make the required configuration changes in the .env file for your development environment
```bash
cp .env.example .env
```

Generate a new application key
```bash
npx adonis key:generate
```

Run migration and seeds
```bash
adonis migration:run --seed
```

Start the local development server
```bash
adonis serve --dev
```

Run tests
```bash
adonis test
```

  For more information run
```bash
node ace --help
```

## API Specification

> [Postman Collection](https://github.com/wambugudavis/collage-apis/blob/develop/Collage.postman_collection.json)
