FROM node:18-alpine


# Install npm and bash
RUN apk add --no-cache npm bash

# Install create-react-app
RUN npm install -g create-react-app

EXPOSE 4500

WORKDIR /app

# RUN npm install

# CMD [“npm”, “start”]

# keep container running
CMD tail -f /dev/null