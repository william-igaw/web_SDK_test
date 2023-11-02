sed -i -e "s;%DFN_APP_KEY%;$DFN_APP_KEY;g" -e "s;%DFN_SECRET_KEY%;$DFN_SECRET_KEY;g" ./js/main.js
busybox httpd -f -v -p 80