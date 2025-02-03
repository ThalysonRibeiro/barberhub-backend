# inicializar
yarn init -y
yarn add typescript -D
yarn add express
yarn add @types/express -d
yarn tsc --init
yarn add ts-node-dev -D
yarn add express-async-errors
yarn add cors
yarn add @types/cors -D
yarn add prisma
yarn add @prisma/client
npx prisma init
yarn prisma migrate dev
yarn add bcryptjs
yarn add @types/bcryptjs
yarn add jsonwebtoken
yarn add @types/jsonwebtoken -D
yarn add stripe

<!-- endpointSecret -->
stripe listen
stripe listen --forward-to localhost:3333/webhooks
stripe listen --forward-to https://barberpro-backend.vercel.app/api/webhooks/stripe

npx prisma studio