const express = require("express");
const EasyPost = require('@easypost/api');


const app = express();
const port = process.env.PORT || "8000";

const api = new EasyPost('EZTK03bfc6e43a7d4047b34dd9878c0ceb1318ZXuxYYP6mQ8T34VxGZKw'); 

app.get("/", (req, res) => {
    res.status(200).send({'API Check:': 'Api is working!!!'});
});


app.get("/rates", (req, res) => {
  const from_address = {
    street1: '417 MONTGOMERY ST',
    street2: 'FLOOR 5',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94104',
    country: 'US',
    company: 'EasyPost',
    phone: '415-123-4567',
  };
  
  // from_address.save().then('From Address!!!',console.log)
  
  const to_address = {
          name: 'Dr. Steve Brule',
          street1: '179 N Harbor Dr',
          city: 'Redondo Beach',
          state: 'CA',
          zip: '90277',
          country: 'US',
          phone: '4155559999',
        };
  
  // to_address.save('To Address!!!',console.log);
  
  const prcel = {
    length: 20.2,
    width: 10.9,
    height: 5,
    weight: 65.9
  };
  // parcel.save(console.log);
  
  const custom_info = {
          eel_pfc: 'NOEEI 30.37(a)',
          customs_certify: true,
          customs_signer: 'Steve Brule',
          contents_type: 'merchandise',
          contents_explanation: '',
          restriction_type: 'none',
          restriction_comments: '',
          non_delivery_option: 'abandon',
          declaration: 'Here is a bunch of information...',
      
          customs_items: [
            new api.CustomsItem({
              'description': 'Sweet shirts 1',
              'quantity': 2,
              'weight': 11,
              'value': 23,
              'hs_tariff_number': '654321',
              'origin_country': 'US',
              'code': '123'
            }),
          ]
        };
  
  // custom_info.save(console.log);
  
  const toAddress = new api.Address(to_address);
  const fromAddress = new api.Address(from_address);
  const parcel = new api.Parcel(prcel);
  //customer info is optional
  const customsInfo = new api.CustomsInfo(custom_info);  
  
  const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    customs_info: customsInfo
  });

  // Shipment objects will be saveed with the rates objects
  var shpmnt = shipment.save();
  shipment.save().then(s=>{
      // shipment.rates.forEach((rate, index) => {
  //   var carrier = 'rate_carrier' + index;
  //   var service = 'rate_service' + index;
  //   var rate = 'rate' + index;
  //   var rate_id = 'rate_id' + index;
  //   var rates = {
  //     carrier: rate.carrier,
  //     service: rate.service,
  //     rate:rate.rate,
  //     rate_id: rate.id
  //   }
  // });
      api.Shipment.retrieve(s.id).then(s => {
      s.regenerateRates()
        .then(s => {
          console.log('LowestRate Object:', s.lowestRate());
              res.status(200).send({'Lowest Rate Value':s.lowestRate().rate});
        });
    });
  }).catch(console.log);
});


app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});