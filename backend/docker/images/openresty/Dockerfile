FROM openresty/openresty:1.19.9.1-4-alpine-fat-aarch64

EXPOSE 8000/tcp

# RUN apk add --no-cache nginx-mod-http-lua

# Delete default config
# RUN rm -r /etc/nginx/conf.d && rm /etc/nginx/nginx.conf

# Create folder for PID file
# RUN mkdir -p /run/nginx

# Add our nginx conf
COPY nginx.conf  /usr/local/openresty/nginx/conf/nginx.conf


# CMD ["nginx"]