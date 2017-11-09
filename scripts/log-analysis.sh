#!/bin/sh

# Before running this script you must have installed the AWS CLI.
# On ubuntu, do:
# 1) sudo apt-get install python-pip python-dev build-essential 
# 2) pip install --upgrade --user awscli
# 3) Set up the AWS credentials using aws configure
#
# You will also need to install request-log-analyzer:
# gem install request-log-analyzer

#echo "Downloading request log files..."
aws s3 sync s3://genderkit/logs ./logs/logfiles/

echo "Downloading bots list..."
wget -O ~/bots.json https://raw.githubusercontent.com/genderkit/crawler-user-agents/master/crawler-user-agents.json

echo "Extracting bots from list"
cp /vagrant/git/genderkit/scripts/extract-bots.js ~
nodejs ~/extract-bots.js > /home/vagrant/botoutput.txt

cat /vagrant/git/genderkit/scripts/custom-exclusions.txt >> /home/vagrant/botoutput.txt 

# Extras bots I've found
# -e "Ocarinabot" -e "TelegramBot" -e "Cliqzbot" -e "epicbot" -e "SEMrushBot" -e "Primalbot" -e "DuckDuckGo-Favicons-Bot" -e "GnowitNewsbot" -e "Ocarinabot" -e "Primalbot" -e "YandexImages" -e "Leikibot" -e "LinkArchiver" -e "linkfluence" -e "PaperLiBot" -e "infegy.com" -e "Digg Deeper" -e "dcrawl" -e "Snacktory" -e "AndersPinkBot" -e "Fyrebot" -e "EveryoneSocialBot" -e "Discordbot" -e LivelapBot -e broken-link-checker -e "S3Console/0.4" -e "Mastodon/1" -e "GNU Social" -e "archive.org_bot" -e "Mediatoolkitbot" -e "InfoPath.2" -e "Luminator-robots"
# Main bots list from https://github.com/monperrus/crawler-user-agents/blob/master/crawler-user-agents.json
echo "Concatenating logs..."
#cat ./logs/logfiles/* | grep -v -e "FBRV/[0-9][0-9]" -e 80.229.172.125 -e "Ocarinabot" -e "TelegramBot" -e "Cliqzbot" -e "epicbot" -e "SEMrushBot" -e "DuckDuckGo-Favicons-Bot" -e "GnowitNewsbot" -e "YandexImages" -e "Leikibot" -e "LinkArchiver" -e "linkfluence" -e "favicon.ico" -e "Spider" -e "PaperLiBot" -e "infegy.com" -e "Wget" -e "wlwmanifest.xml" -e "fontawesome-webfont" -e "GET / HTTP/1.0"   -e "REST.HEAD.OBJECT" -e "REST.GET.OBJECT" -e "REST.PUT.OBJECT" -e "BATCH.DELETE.OBJECT" -e broken-link-checker -e "S3Console/0.4" -e "Digg Deeper" -e "dcrawl" -e "Snacktory" -e "AndersPinkBot" -e "Fyrebot" -e "EveryoneSocialBot" -e "Discordbot" -e "LivelapBot" -e "Mastodon/1" -e "GNU Social" -e "archive.org_bot" -e "Mediatoolkitbot" -e "InfoPath.2" -e "Luminator-robots" -e "Googlebot" -e "Googlebot-Mobile" -e "Googlebot-Image" -e "Googlebot-News" -e "Googlebot-Video" -e "AdsBot-Google-Mobile" -e "Mediapartners-Google" -e "APIs-Google" -e "bingbot" -e "slurp" -e "java" -e "wget" -e "curl" -e "Commons-HttpClient" -e "Python-urllib" -e "libwww" -e "httpunit" -e "nutch" -e "Go-http-client" -e "phpcrawl" -e "msnbot" -e "jyxobot" -e "FAST-WebCrawler" -e "FAST Enterprise Crawler" -e "BIGLOTRON" -e "Teoma" -e "convera" -e "seekbot" -e "Gigabot" -e "Gigablast" -e "exabot" -e "GingerCrawler" -e "webmon " -e "HTTrack" -e "UsineNouvelleCrawler" -e "antibot" -e "netresearchserver" -e "speedy" -e "fluffy" -e "findlink" -e "msrbot" -e "panscient" -e "yacybot" -e "AISearchBot" -e "IOI" -e "ips-agent" -e "tagoobot" -e "MJ12bot" -e "woriobot" -e "yanga" -e "buzzbot" -e "mlbot" -e "YandexBot" -e "purebot" -e "Linguee Bot" -e "CyberPatrol" -e "voilabot" -e "baiduspider" -e "citeseerxbot" -e "spbot" -e "twengabot" -e "postrank" -e "turnitinbot" -e "scribdbot" -e "page2rss" -e "sitebot" -e "linkdex" -e "Adidxbot" -e "blekkobot" -e "ezooms" -e "dotbot" -e "discobot" -e "heritrix" -e "findthatfile" -e "sistrix crawler" -e "AhrefsBot" -e "ahrefsbot" -e "Aboundex" -e "domaincrawler" -e "wbsearchbot" -e "summify" -e "ccbot" -e "edisterbot" -e "seznambot" -e "ec2linkfinder" -e "gslfbot" -e "aihitbot" -e "facebookexternalhit" -e "yeti" -e "RetrevoPageAnalyzer" -e "lb-spider" -e "sogou" -e "lssbot" -e "careerbot" -e "wotbox" -e "wocbot" -e "ichiro" -e "DuckDuckBot" -e "lssrocketcrawler" -e "drupact" -e "webcompanycrawler" -e "acoonbot" -e "openindexspider" -e "gnam gnam spider" -e "backlinkcrawler" -e "coccoc" -e "integromedb" -e "content crawler spider" -e "toplistbot" -e "seokicks-robot" -e "it2media-domain-crawler" -e "elisabot" -e "proximic" -e "changedetection" -e "blexbot" -e "arabot" -e "niki-bot" -e "CrystalSemanticsBot" -e "rogerbot" -e "360Spider" -e "psbot" -e "InterfaxScanBot" -e "CC Metadata Scaper" -e "GrapeshotCrawler" -e "urlappendbot" -e "brainobot" -e "fr-crawler" -e "binlar" -e "SimpleCrawler" -e "Twitterbot" -e "cXensebot" -e "smtbot" -e "A6-Indexer" -e "ADmantX" -e "Facebot" -e "OrangeBot" -e "memorybot" -e "AdvBot" -e "MegaIndex" -e "SemanticScholarBot" -e "ltx71" -e "nerdybot" -e "xovibot" -e "BUbiNG" -e "Qwantify" -e "Applebot" -e "TweetmemeBot" -e "crawler4j" -e "findxbot" -e "SemrushBot" -e "yoozBot" -e "lipperhey" -e "Domain Re-Animator Bot" -e "AddThis" -e "Screaming Frog SEO Spider" -e "MetaURI" -e "Scrapy" -e "OpenHoseBot" -e "CapsuleChecker" -e "IstellaBot" -e "betaBot" -e "netEstate NE Crawler" -e "SafeSearch microdata crawler" -e "Sonic" -e "Sysomos" -e "Trove" -e "deadlinkchecker" -e "Slack-ImgProxy" -e "Embedly" -e "RankActiveLinkBot" -e "iskanie" -e "SafeDNSBot" -e "SkypeUriPreview" -e "Veoozbot" -e "Slackbot" -e "redditbot" -e "datagnionbot" -e "Google-Adwords-Instant" -e "WhatsApp" -e "contxbot" -e "pinterest" -e "electricmonk" -e "GarlikCrawler" -e "vebidoobot" -e "FemtosearchBot" -e "Yahoo Link Preview" -e "MetaJobBot" -e "DomainStatsBot" -e "mindUpBot" -e "Daum" -e "Jugendschutzprogramm-Crawler" -e "Xenu Link Sleuth" -e "Pcore-HTTP" -e "moatbot" -e "KosmioBot" -e "Pingdom" -e "PhantomJS" > ./logs/concatenated.txt
cat ./logs/logfiles/* | grep -v -f "/home/vagrant/botoutput.txt" > ./logs/concatenated.txt

echo "Generating report..."
request-log-analyzer --no-progress --format amazon_s3 ./logs/concatenated.txt --output html --file ./logs/log-analysis.html

echo "Done."