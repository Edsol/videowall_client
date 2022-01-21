
#!/bin/bash
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils openbox obconf lightdm -y
sudo apt-get install unclutter chromium openssl shellinabox -y
sudo apt install thunar git htop curl psmisc vsftpd scrot xosd-bin conky jq -y
sudo apt-get install firmware-linux-nonfree libgl1-mesa-dri xserver-xorg-video-ati -y


# firefox-esr-l10n-it

# Configure FTP
# mkdir -p /home/debian/FTP/files
# chmod a-w /home/debian/FTP

# sudo echo 'write_enable=YES' >> /etc/vsftpd.conf
# sudo echo 'chroot_local_user=YES' >> /etc/vsftpd.conf
# sudo echo 'anonymous_enable=NO' >> /etc/vsftpd.conf
# sudo echo 'user_sub_token=$USER' >> /etc/vsftpd.conf
# sudo echo 'local_root=/home/$USER/FTP' >> /etc/vsftpd.conf



# add nodejs source
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
sudo apt update
sudo apt-get install nodejs npm -y

sudo npm i -g pm2
sudo npm i -g http-server nodemon concurrently
# npm install @prisma/client
npm install



# Configure PM2 app service
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u powering --hp /home/powering
pm2 start ../pm2.config.js
pm2 save --force


mkdir -p /home/powering/.config/{conky,openbox}
cp conky.conf /home/powering/.config/conky
touch /home/powering/.config/openbox/autostart
sudo echo '/usr/bin/conky & xset -dpms & xset s off &' >> /home/powering/.config/openbox/autostart


# Run one time to create profile
DISPLAY=:0 chromium --profile-directory=Default1 https://edoo.poweringsrl.it &
DISPLAY=:0 chromium --profile-directory=Default2 https://edoo.poweringsrl.it &

npx prisma db push
