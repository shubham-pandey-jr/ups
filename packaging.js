const fs = require("fs");

function saveBase64Image(base64Image, outputPath) {
  // Decode the base64 string to a Buffer
  const imageBuffer = Buffer.from(base64Image, "base64");

  // Save the image as a file at the specified output path
  fs.writeFile(outputPath, imageBuffer, (err) => {
    if (err) {
      console.error("Error saving the image:", err);
    } else {
      console.log(`Image saved successfully as ${outputPath}`);
    }
  });
}

// Example usage:

const getAccessToken = require("./ups");

const query = new URLSearchParams({
  additionaladdressvalidation: "contact@a4medicine.co.uk",
}).toString();

const version = "v2403";

const main = async () => {
  try {
    const bt = await getAccessToken();

    const resp = await fetch(
      `https://onlinetools.ups.com/api/shipments/${version}/ship?${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          transId: "123456",
          transactionSrc: "pp",
          Authorization: `Bearer ${bt}`,
        },
        body: JSON.stringify({
          ShipmentRequest: {
            Request: {
              SubVersion: "1801",
              RequestOption: "nonvalidate",
              TransactionReference: { CustomerContext: "" },
            },
            Shipment: {
              Description: "Ship WS test",
              Shipper: {
                Name: "ShipperName",
                AttentionName: "Contact",
                TaxIdentificationNumber: "123456",
                Phone: {
                  Number: "4407908434147",
                  Extension: " ",
                },
                ShipperNumber: "C54781",
                FaxNumber: "8002222222",
                Address: {
                  AddressLine: ["11 Daffodil Lane"],
                  City: "Newport",
                  StateProvinceCode: "NWP",
                  PostalCode: "NP109JJ",
                  CountryCode: "GB",
                },
              },
              ShipTo: {
                Name: "Paul Reeves",
                AttentionName: "Paul Reeves",
                Phone: { Number: "1234567890" },
                Address: {
                  AddressLine: ["401 Trower Road"],
                  City: "Brinkin",
                  StateProvinceCode: "NT", // Update as required by the UPS API
                  PostalCode: "0810",
                  CountryCode: "AU",
                },
                Residential: " ", // Set this if it's a residential address
              },
              ShipFrom: {
                Name: "ShipperName",
                AttentionName: "1160b_74",
                Phone: { Number: "07908434147" },
                // FaxNumber: "1234567890",
                Address: {
                  AddressLine: ["11 Daffodil Lane"],
                  City: "Newport",
                  StateProvinceCode: "NWP",
                  PostalCode: "NP109JJ",
                  CountryCode: "GB",
                },
              },
              PaymentInformation: {
                ShipmentCharge: {
                  Type: "01",
                  BillShipper: { AccountNumber: "C54781" },
                },
              },
              // 65: UPS Saver
              // 08: Expedited
              Service: {
                Code: "65",
                Description: "UPS Standard",
              },
              Package: {
                Description: " ",
                Packaging: {
                  Code: "02",
                  Description: "Nails",
                },
                Dimensions: {
                  UnitOfMeasurement: {
                    Code: "CM",
                    Description: "Inches",
                  },
                  Length: "10",
                  Width: "30",
                  Height: "45",
                },
                PackageWeight: {
                  UnitOfMeasurement: {
                    Code: "KGS",
                    Description: "Pounds",
                  },
                  Weight: "2",
                },
              },
            },
            LabelSpecification: {
              LabelImageFormat: {
                Code: "GIF",
                Description: "GIF",
              },
              HTTPUserAgent: "Mozilla/4.5",
            },
          },
        }),
      }
    );

    const data = await resp.json();

    console.log("data", data?.response?.errors);

    data.ShipmentResponse.ShipmentResults.PackageResults.forEach((result) => {
      console.log("Tracking number:", result.TrackingNumber);
      console.log("Label URL:", result);
      saveBase64Image(
        result.ShippingLabel.GraphicImage,
        `label-${result.TrackingNumber}.gif`
      );
    });
    console.log("data", data);
  } catch (error) {
    console.error("error", error);
  }
};

main();
