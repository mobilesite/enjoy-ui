# enjoy-ui

## 一、安装依赖：

```bash
npm i
npm i -g cross-env karma anywhere
```

## 二、开发调试

支持热加载的调试：

```bash
anywhere -p 9090
npm run dll-dev
```

值得注意的是，这里需要进行 hosts 的配置：

```bash
127.0.0.1 m.test.com
127.0.0.1 static.test.com
xxx.xxx.xxx.xxx <Host of the backend APIs>
```

访问地址：

[http://m.test.com](http://m.test.com/) 或者
[https://m.test.com](https://m.test.com/)

## 三、进行测试

```bash
#run unit or e2e tests (ignore it, of no use now)
sudo npm run unit
sudo run e2e tests
#or
npm test
```

## 四、打包

```bash
npm run dll-build
```

注：`npm run dll-dev`会打包到 /dll/dev/ 下，而`npm run dll-build`会打包到
/dll/prod/ 下，分别对应的是开发和 build 过程中文件。/dll/ 目录只是一个过度性的目
录，并非最终线上引用公共库打包文件的目录。

## 五、Nginx 的配置

通过 Nginx 配置两个地址，m.test.com 指向 html 目录，static.test.com 指向附属的静
态资源（static 目录）。

考虑到有的站点需要支持 https，所以下面配了 http 和 https 两套服务器反向代理。

```bash
# http server
server {
    listen       80;
    server_name  m.test.com;

    location / {
        root   D:/enjoywork/static/html/;
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen       80;
    server_name  static.test.com;

    location / {
        root   D:/enjoywork/static/;
        index  index.html;
    }
}

# https server
server {
    listen       443 ssl;
    server_name  m.test.com;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        root   D:/enjoywork/static/html/;
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}

server {
    listen       443 ssl;
    server_name  static.test.com;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;

    location / {
        root   D:/enjoywork/static/;
        index  index.html;
    }
}
```

### 六、常见问题处理

#### 6.1 Error: EACCES: permission denied, open 'xxxxxxxxx' 错误的处理

执行`npm run dll-dev `或者`npm run dll-build `命令时，有时可能会遇到如下错误

Error: EACCES: permission denied, open 'xxxxxxxxx'

这时可能是打包时出现了文件权限问题，通常执行`bash reset.sh `命令即可，这个命令
行里面会自动帮你重置相关文件的权限。

#### 6.2 在热重载（hotreload ）的情况下，添加一个文件或文件夹后，控制台报找不到相应的模块

在热重载（hotreload ）的情况下，添加一个文件或文件夹后，需要先结束`npm run dll-dev`的运行，再重新执行`npm run dll-dev`，以检测到文件的变更。这一点与
vue-cli 生成的项目是一样的。
