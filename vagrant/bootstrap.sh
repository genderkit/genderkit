sudo apt-get update
sudo apt-get install -y git ruby ruby-dev make gcc dos2unix nodejs npm libcurl4-openssl-dev aspell aspell-en software-properties-common
ln -s /usr/bin/nodejs /usr/bin/node

sudo apt-get install linux-headers-$(uname -r) build-essential dkms
wget http://download.virtualbox.org/virtualbox/6.1.2/VBoxGuestAdditions_6.1.2.iso
sudo mkdir /media/VBoxGuestAdditions
sudo mount -o loop,ro VBoxGuestAdditions_6.1.2.iso /media/VBoxGuestAdditions
sudo sh /media/VBoxGuestAdditions/VBoxLinuxAdditions.run
rm VBoxGuestAdditions_6.1.2.iso
sudo umount /media/VBoxGuestAdditions
sudo rmdir /media/VBoxGuestAdditions

gem install jekyll bundler rake

if [ ! -d "/vagrant/git" ]; then
  mkdir /vagrant/git
fi
cd /vagrant/git
if [ ! -d "/vagrant/git/genderkit" ]; then
  git clone git@github.com:genderkit/genderkit.git
fi
cd /vagrant/git/genderkit

bundle install
