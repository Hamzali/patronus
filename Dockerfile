FROM golang:alpine as build
RUN apk --no-cache add ca-certificates

FROM scratch as final

COPY --from=build /usr/local/go/lib/time/zoneinfo.zip /
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY  ./main .
COPY ./ui/dist ./ui/dist
COPY config.yml .

ENV ZONEINFO=/zoneinfo.zip
CMD ["./main"]
