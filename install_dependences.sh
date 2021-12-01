
#!/bin/bash
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils openbox lightdm unclutter -y
sudo apt-get install chromium-browser vsftpd scrot openssl shellinabox -y
sudo apt install lightdm osd_cat 
# libnotify-bin

mkdir -p /home/pi/FTP/files
chmod a-w /home/pi/FTP

sudo echo 'write_enable=YES' >> /etc/vsftpd.conf
sudo echo 'chroot_local_user=YES' >> /etc/vsftpd.conf
sudo echo 'anonymous_enable=NO' >> /etc/vsftpd.conf
sudo echo 'user_sub_token=$USER' >> /etc/vsftpd.conf
sudo echo 'local_root=/home/$USER/FTP' >> /etc/vsftpd.conf

# local_umask=022
# chroot_local_user=YES
# anonymous_enable=NO
# user_sub_token=$USER
# local_root=/home/$USER/FTP


sudo apt-get install nodejs npm -y

#sudo touch /lib/systemd/system/pi_client.service
#CREATE SERVICE
#sudo echo '
#[Unit]
#Description=pi_client.js -videowall cliente
#After=network.target

#[Service]
#Restart=on-failure
#WorkingDirectory=/home/pi/pi_client
#ExecStart=/usr/bin/node /home/pi/pi_client/bin/www
#StandardOutput=syslog
#StandardError=syslog
#SyslogIdentifier=pi_client

#[Install]
#WantedBy=multi-user.target
#' >> /lib/systemd/system/pi_client.service

#sudo systemctl daemon-reload
#sudo systemctl start pi_client

sudo npm i -g pm2
echo 'module.exports = {
  apps : [{
    name   : "pi_client",
    script : ".pi_client/bin/www"
  }]
}' >> ecosystem.config.js

pm2 start ecosystem.config.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

