FROM node:16-alpine
WORKDIR /opt/backend
ADD backend/src ./src
ADD backend/package.json .
ADD backend/tsconfig.json .
RUN yarn
RUN yarn build
ENTRYPOINT [ "yarn", "start" ]

