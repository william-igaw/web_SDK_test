FROM busybox
WORKDIR /app
COPY . .
RUN chmod +x ./init.sh
ENTRYPOINT ["/bin/sh", "-c", "./init.sh"]