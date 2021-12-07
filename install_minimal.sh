#!/bin/bash
sudo apt update
sudo apt upgrade -y

sudo apt install scrot -y
sudo apt install vsftpd -y

#mkdir -p /home/pi/FTP/files
#chmod a-w /home/pi/FTP

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

sudo apt install nodejs -y
sudo apt install npm -y
sudo npm i -g pm2
pm2 init simple

touch ecosystem.config.js

echo 'module.exports = {
  apps : [{
    name   : "pi_client",
    script : "pi_client/bin/www"
  }]
}' >> ../ecosystem.config.js

pm2 start ../ecosystem.config.js

#edit ecosystem.config.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

#start ssh service
sudo service ssh start

