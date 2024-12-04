FROM node:18

WORKDIR /home/bot

RUN apt update && apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

COPY . .

RUN npm i

CMD ["node", "index.js"]