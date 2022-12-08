This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

### Docker

Create a network, which allows containers to communicate with each other, by using their container name as a hostname.

```bash
docker network create mec-energia-network
```

Install the dependencies.

```bash
docker-compose -f docker-compose.dev.yml build
```

Start the development server.

```bash
docker-compose -f docker-compose.dev.yml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Local

Install the dependencies.

```bash
yarn install
```

Start the development server.

```bash
yarn install
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

### Docker

Multistage builds are highly recommended in production. Combined with the Next Output Standalone feature, only node_modules files required for production are copied into the final Docker image.

Create a network, which allows containers to communicate with each other, by using their container name as a hostname.

```bash
docker network create mec-energia-network
```

Generate an optimized version of your application for production.

```bash
docker-compose -f docker-compose.prod.yml build
```

Start the production server.

```bash
docker-compose -f docker-compose.prod.yml up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Local

Generate an optimized version of your application for production.

```bash
yarn build
```

Start the production server.

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
