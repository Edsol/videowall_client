
#!/bin/bash
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils openbox lightdm -y
sudo apt-get install unclutter chromium-browser openssl shellinabox -y
sudo apt install vsftpd scrot xosd-bin 
# firefox-esr-l10n-it
# libnotify-bin

mkdir -p /home/pi/FTP/files
chmod a-w /home/pi/FTP

sudo echo 'write_enable=YES' >> /etc/vsftpd.conf
sudo echo 'chroot_local_user=YES' >> /etc/vsftpd.conf
sudo echo 'anonymous_enable=NO' >> /etc/vsftpd.conf
sudo echo 'user_sub_token=$USER' >> /etc/vsftpd.conf
sudo echo 'local_root=/home/$USER/FTP' >> /etc/vsftpd.conf

sudo apt-get install nodejs npm -y
sudo npm i -g pm2

echo 'module.exports = {
  apps : [{
    name   : "pi_client",
    script : "pi_client/bin/www"
  }]
}' >> ../ecosystem.config.js

pm2 start ../ecosystem.config.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

#set autologin with GUI
sudo rm -rf /etc/systemd/system/default.target.
Created symlink /etc/systemd/system/default.target → /lib/systemd/system/graphical.target.

npm install

