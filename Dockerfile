FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=8080

RUN apt-get -y update && apt-get -y upgrade && apt-get install -y --no-install-recommends ffmpeg

VOLUME ["/app/uploads"]
VOLUME ["/app/uploads/thumbnails"]

EXPOSE 8080

CMD ["npm", "start"]

