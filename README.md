# Installtions:
git clone https://github.com/muzammalrahim/fedex.git
cd fedex
npm install

# Run project
nodemon


# EasyPost
# command: You can also use seperate command for easypost
npm install @easypost/api --save


# Easypost TestKey and ProductionKey
If you want to use different Keys, You need to signup for EasyPost to generates apikeys for test and productions environments.


# EasyPost api reference
https://www.easypost.com/getting-started

# NOTE
to_address, from_address and pracel are objects which are parameters to shipment objects. They can also be crated seperately as well and can be saved in easypost, which can be retrieved through apis..

Nevigate to /rates to get the rate for the shipment, also rates object is console log in the command line of node.
