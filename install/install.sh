
#!/bin/bash
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils openbox obconf lightdm -y
sudo apt-get install unclutter chromium-browser openssl shellinabox -y
sudo apt install vsftpd scrot xosd-bin conky jq -y
sudo apt-get install firmware-linux-nonfree libgl1-mesa-dri xserver-xorg-video-ati

# lightdm-settings
# firefox-esr-l10n-it
# libnotify-bin

# Configure FTP
mkdir -p /home/debian/FTP/files
chmod a-w /home/debian/FTP

sudo echo 'write_enable=YES' >> /etc/vsftpd.conf
sudo echo 'chroot_local_user=YES' >> /etc/vsftpd.conf
sudo echo 'anonymous_enable=NO' >> /etc/vsftpd.conf
sudo echo 'user_sub_token=$USER' >> /etc/vsftpd.conf
sudo echo 'local_root=/home/$USER/FTP' >> /etc/vsftpd.conf


# Configure PM2 app service
sudo apt-get install nodejs npm -y
sudo npm i -g pm2

echo 'module.exports = {
  apps : [{
    name   : "videowallClient",
    script : "bin/www",
    "watch": "../",
    "ignore_watch" : ["node_modules"],
    "log_date_format": "YYYY-MM-DD HH:mm Z",
  }]
}' >> ../ecosystem.config.js

pm2 start ../ecosystem.config.js
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/debian
pm2 save --force


npm install

mkdir /home/debian/.config/conky
cp conky.conf /home/debian/.config/conky

mkdir /home/debian/.config/openbox
sudo echo '/usr/bin/conky &' >> /home/debian/.config/openbox/autostart