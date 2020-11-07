---
layout: page
title: 'InfluxDB Telegraf Grafana 配置'
slug: influxdb-telegraf-grafana
---

## Installation

### InfluxDB and Telegraf

> 安装的是 1.x 版本，并不是 2 的 beta 版

```shell
wget -qO- https://repos.influxdata.com/influxdb.key | sudo apt-key add -
echo "deb https://repos.influxdata.com/ubuntu ${lsb_release -cs} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list

sudo apt-get update && sudo apt-get install telegraf influxdb
```

### Grafana

```shell
sudo apt-get install -y apt-transport-https
sudo apt-get install -y software-properties-common wget
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/enterprise/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list 
```

## Configure

### InfluxDB

#### 创建用户

使用 ```influx``` 进入 influxdb 的交互


##### 创建 database

```sql
create database telegraf;
```

##### 创建用户

```sql
create user admin with password 'ROOT PASSWORD' with all privileges;
create user telegrafuser with password 'PASSWORD HERE';
```

##### 设置权限

```sql
grant all on telegraf to telegrafuser;
```

#### 设置认证

```/etc/influxdb/influxdb.conf```

```conf
[http]
  # Determines whether HTTP endpoint is enabled.
  enabled = true

  # The bind address used by the HTTP service.
  bind-address = ":8086"

  # Determines whether user authentication is enabled over HTTP/HTTPS.
  auth-enabled = true
```

### Telegraf

```conf
# 去掉注释
[[inputs.net]]

# 添加 influxdb 信息
[[outputs.influxdb]]
    urls = ["http://influxdb-url"]
    username = "telegrafuser"
    password = "PASSWORD HERE"
```

### Grafana

允许匿名访问

```conf
[auth.anonymous]
# enable anonymous access
enabled = true
```

## InfluxDB

```sql
show tag values with key = "host";
```