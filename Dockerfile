FROM node:16
WORKDIR /app

# argumento padrao seeders
ARG CREATE_SEEDERS=false

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm install -g sequelize-cli
# rodar as migrations

# argumento opcional para rodar as seeders
RUN if [ "$CREATE_SEEDERS" = "true" ] ; then npx sequelize-cli db:seed:all ; fi

# expoe a porta
EXPOSE 3000

# aguardar a inicializacao do container do banco de dados
ENTRYPOINT [ "./startup.sh" ]

