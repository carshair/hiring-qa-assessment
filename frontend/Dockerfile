FROM node:16
WORKDIR /opt/frontend
ADD frontend/component ./component
ADD frontend/utils ./utils
ADD frontend/pages ./pages
ADD frontend/public ./public
ADD frontend/styles ./styles
ADD frontend/next-env.d.ts .
ADD frontend/next.config.js .
ADD frontend/package.json .
ADD frontend/constants.ts .
ADD frontend/tsconfig.json .
RUN yarn
RUN yarn build
ENTRYPOINT yarn start
