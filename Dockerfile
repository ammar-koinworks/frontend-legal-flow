FROM node:18 as build-stage

ENV NEXT_PUBLIC_API_BASE_URL=https://be-fifaflow.koin.works/api/v1.0
ENV NEXT_PUBLIC_API_ADMIN_URL=/admin-cms
ENV NEXT_PUBLIC_API_MEMBER_URL=/member-cms

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage ./app/build /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf