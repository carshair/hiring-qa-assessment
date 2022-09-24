FROM node:16-alpine
WORKDIR /opt/backend
ADD src ./src
ADD package.json .
ADD tsconfig.json .
RUN yarn
RUN yarn build
ENTRYPOINT [ "yarn", "start" ]

