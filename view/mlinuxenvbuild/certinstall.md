#### 1、申请域名证书
>1.5 申请域名证书

**<a href="https://zerossl.com/" target="_blank">去zerossl申请免费证书</a>，该机构的证书为90天有效期**
<pre class="prettyprint lang-s">
#下载的证书文件后缀名是.crt
#合并ca_bundle.crt 和 certificate.crt这2个文件，将ca_bundle里面的内容追加到certificate.crt的尾部
cat certificate.crt ca_bundle.crt > yourdomain.crt
</pre>

#### 2、在nginx.conf中配置域名的证书
<pre class="prettyprint lang-properties">
server {
	listen 443 ssl;
	server_name  star.edk4j.com;
	root /www/star/;
	index index.html index.htm;
	access_log  logs/host.access-star.log;

	#charset koi8-r;

	client_header_buffer_size 32k;
	large_client_header_buffers 4 128k;
	charset UTF-8;

	#.pem或者.crt证书文件
	#下面设置使用的相对路径，路径是$NGINX_HOME/conf/文件夹下的相对路径
	ssl_certificate cert/certificate.crt;
	#.key证书密钥文件
	ssl_certificate_key cert/private.key;
	ssl_session_timeout 5m;
	#表示使用的加密套件的类型
	#ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	#表示使用的TLS协议的类型
	#ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	#ssl_prefer_server_ciphers on;

	location / {
		index  index.html;
		#try_files $uri $uri/ /index.html;
	}
	
	#......
	
	error_page  403              /403.html;
	error_page  404              /404.html;
}
</pre>