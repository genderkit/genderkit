sudo apt-get update
sudo apt-get install -y git ruby ruby-dev make gcc dos2unix nodejs npm libcurl4-openssl-dev aspell aspell-en software-properties-common zlib1g-dev build-essential patch zlib1g-dev liblzma-dev libxslt1-dev imagemagick linux-headers-$(uname -r) build-essential dkms
gem install jekyll bundler rake
sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) vagrant /vagrant
mkdir /vagrant/git
cd /vagrant/git
git clone git@github.com:genderkit/genderkit.git
cd /vagrant/git/genderkit
bundle install
