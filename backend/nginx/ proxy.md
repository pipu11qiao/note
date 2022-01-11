#### 跨域配置


```nginx.conf
location / {

	add_header Access-Control-Allow-Origin *;
	add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
	add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

	if ($request_method = 'OPTIONS') {
		return 204;
	}
}
```

#### 反向代理

```nginx.conf
  location = /test.png{
            proxy_pass https://docimg6.docs.qq.com/image/z8k8Egjo0bW0PUMdetyvSw.png?w=1000&h=1000;
        }
```

```nginx.conf

 location = /test.png{
	add_header Access-Control-Allow-Origin *;
	add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
	add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

	if ($request_method = 'OPTIONS') {
		return 204;
	}
            proxy_pass https://docimg6.docs.qq.com/image/z8k8Egjo0bW0PUMdetyvSw.png?w=1000&h=1000;
        }
````
#### lua

