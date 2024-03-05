FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/index.html

COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]