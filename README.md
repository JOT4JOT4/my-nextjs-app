This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Second, install and run the FastAPI:

```bash
pip install fastapi uvicorn[standard] motor

python -m uvicorn app.main:app --reload --port 8000

#crear entorno

py -m venv venv

#activar entorno

.\venv\Scripts\Activate.ps1
```
Third, Levantar la base:

```bash
docker run -d --name mongo-videogames \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  mongo:7
```
## Grupo

-Juan Pablo Vargas Corral
-Cristobal Andres Luna Gonzalez
