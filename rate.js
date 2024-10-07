// const query = new URLSearchParams({
//   additionalinfo: "string",
// }).toString();

// const getAccessToken = require("./ups");

// const version = "v2403";
// const requestoption = "rate";

// const main = async () => {
//   try {
//     const bt = await getAccessToken();

//     const resp = await fetch(
//       `https://wwwcie.ups.com/api/rating/${version}/rate`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           transId: "string",
//           transactionSrc: "testing",
//           Authorization: `Bearer ${bt}`,
//         },
//         body: JSON.stringify({
//           RateRequest: {
//             Request: {
//               TransactionReference: {
//                 CustomerContext: "CustomerContext",
//               },
//             },
//             Shipment: {
//               Shipper: {
//                 Name: "ShipperName",
//                 ShipperNumber: "C54781",
//                 Address: {
//                   AddressLine: [
//                     "ShipperAddressLine",
//                     "ShipperAddressLine",
//                     "ShipperAddressLine",
//                   ],
//                   City: "TIMONIUM",
//                   StateProvinceCode: "MD",
//                   PostalCode: "21093",
//                   CountryCode: "US",
//                 },
//               },
//               ShipTo: {
//                 Name: "ShipToName",
//                 Address: {
//                   AddressLine: [
//                     "ShipToAddressLine",
//                     "ShipToAddressLine",
//                     "ShipToAddressLine",
//                   ],
//                   City: "Alpharetta",
//                   StateProvinceCode: "GA",
//                   PostalCode: "30005",
//                   CountryCode: "US",
//                 },
//               },
//               ShipFrom: {
//                 Name: "ShipFromName",
//                 Address: {
//                   AddressLine: [
//                     "ShipFromAddressLine",
//                     "ShipFromAddressLine",
//                     "ShipFromAddressLine",
//                   ],
//                   City: "TIMONIUM",
//                   StateProvinceCode: "MD",
//                   PostalCode: "21093",
//                   CountryCode: "US",
//                 },
//               },
//               PaymentDetails: {
//                 ShipmentCharge: {
//                   Type: "01",
//                   BillShipper: {
//                     AccountNumber: "C54781",
//                   },
//                 },
//               },
//               Service: {
//                 Code: "03",
//                 Description: "Ground",
//               },
//               NumOfPieces: "1",
//               Package: {
//                 SimpleRate: {
//                   Description: "SimpleRateDescription",
//                   Code: "XS",
//                 },
//                 PackagingType: {
//                   Code: "02",
//                   Description: "Packaging",
//                 },
//                 Dimensions: {
//                   UnitOfMeasurement: {
//                     Code: "IN",
//                     Description: "Inches",
//                   },
//                   Length: "5",
//                   Width: "5",
//                   Height: "5",
//                 },
//                 PackageWeight: {
//                   UnitOfMeasurement: {
//                     Code: "LBS",
//                     Description: "Pounds",
//                   },
//                   Weight: "1",
//                 },
//               },
//             },
//           },
//         }),
//       }
//     );

//     const data = await resp.json();
//     console.log("data", data.response.errors);
//     console.log(data);
//   } catch (e) {
//     console.error(e);
//   }
// };

// main();


const getAccessToken = require("./ups");
const version = "v2403"; // UPS API version
const requestoption = "rate"; // Rate request option

const main = async () => {
  try {
    const bt = await getAccessToken(); // Get your access token

    // Fetch rate using UPS API
    const resp = await fetch(
      `https://wwwcie.ups.com/api/rating/${version}/rate`, // Rating API endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transId: "string", // Replace with actual transaction ID
          transactionSrc: "testing", // Replace with actual transaction source if needed
          Authorization: `Bearer ${bt}`,
        },
        body: JSON.stringify({
          RateRequest: {
            Request: {
              TransactionReference: {
                CustomerContext: "CustomerContext", // Optional context for tracking
              },
            },
            Shipment: {
              Shipper: {
                Name: "ShipperName", // Replace with actual shipper name
                ShipperNumber: "C54781", // Your UPS account number
                Address: {
                  AddressLine: [
                    "11 Daffodil Lane",
                  ],
                  City: "Newport",
                  StateProvinceCode: "NWP", // State or Province code
                  PostalCode: "NP109JJ",
                  CountryCode: "GB", // United Kingdom
                },
              },
              ShipTo: {
                Name: "Paul Reeves", // Replace with actual recipient name
                Address: {
                  AddressLine: [
                    "401 Trower Road", // ShipTo address line 1
                  ],
                  City: "Brinkin",
                  StateProvinceCode: "NT", // Northern Territory
                  PostalCode: "0810",
                  CountryCode: "AU", // Australia
                },
              },
              ShipFrom: {
                Name: "ShipperName", // Replace with actual shipper name
                Address: {
                  AddressLine: [
                    "11 Daffodil Lane", // ShipFrom address line 1
                  ],
                  City: "Newport",
                  StateProvinceCode: "NWP", // State or Province code
                  PostalCode: "NP109JJ",
                  CountryCode: "GB", // United Kingdom
                },
              },
              PaymentDetails: {
                ShipmentCharge: {
                  Type: "01", // Bill type (01 = Shipper pays)
                  BillShipper: {
                    AccountNumber: "C54781", // UPS account number for billing
                  },
                },
              },
              Service: {
                Code: "08", // "03" for UPS Ground service (you can change this based on international service codes)
                Description: "Ground",
              },
              NumOfPieces: "1", // Number of pieces in the shipment
              Package: {
                SimpleRate: {
                  Description: "SimpleRateDescription",
                  Code: "M", // UPS Simple Rate code (XS is an example)
                },
                PackagingType: {
                  Code: "02", // "02" refers to customer-supplied packaging
                  Description: "Packaging",
                },
                Dimensions: {
                  UnitOfMeasurement: {
                    Code: "IN", // Inches for package dimensions
                    Description: "Inches",
                  },
                  Length: "10", // Adjust based on actual dimensions
                  Width: "30", // Adjust based on actual dimensions
                  Height: "45", // Adjust based on actual dimensions
                },
                PackageWeight: {
                  UnitOfMeasurement: {
                    Code: "LBS", // Pounds for package weight
                    Description: "Pounds",
                  },
                  Weight: "2", // Adjust based on actual weight
                },
              },
            },
          },
        }),
      }
    );

    const data = await resp.json();
    if (data.response.errors) {
      console.error("UPS Error:", data.response.errors);
    } else {
      console.log("Rate Response Data:", data);
    }
  } catch (e) {
    console.error("Error fetching rates:", e);
  }
};

main();
