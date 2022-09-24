FROM node:16
ADD ./pages ./pages
ADD ./public ./public
ADD ./styles ./styles
ADD ./next-env.d.ts .
ADD ./next.config.js .
ADD ./package.json .
ADD ./constants.ts .
ADD ./tsconfig.json .
RUN yarn
RUN yarn build
ENTRYPOINT yarn start
