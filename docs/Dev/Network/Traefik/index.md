# Traefik

!!! info ""

    [Traefik Docs](https://doc.traefik.io/traefik)

## Tutorials

### kb-tpl-docker-traefik [:material-github:](https://github.com/tmssd/kb-tpl-docker-traefik)

About ports:

We didn't have to tell Traefik to which ports to proxy to, even though our API, for example, uses port 3000. This is because traefik inspect **exposed ports** of the container (NOT exposed in the service, but exposed using `EXPOSE` keyword in `Dockerfile`). If our container didn't have a port exposed or had multiple ports exposed, we would use a label like this to specify the port:

```yaml title="docker-compose.yml"
labels:
  # ...
  - "traefik.http.services.<service_name>.loadbalancer.server.port=8080" # 8080 is the port we proxy to
```

### How To Use Traefik v2 as a Reverse Proxy for Docker Containers on Ubuntu 20.04 [:material-digital-ocean:](https://www.digitalocean.com/community/tutorials/how-to-use-traefik-v2-as-a-reverse-proxy-for-docker-containers-on-ubuntu-20-04)

### Ultimate Traefik Docker Compose Guide [2022] with LetsEncrypt [:material-web:](https://www.smarthomebeginner.com/traefik-docker-compose-guide-2022/),     [:material-github:](https://github.com/htpcBeginner/docker-traefik)
