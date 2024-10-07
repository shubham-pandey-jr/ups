const formData = {
  grant_type: "client_credentials",
};

async function main() {
  try {
    const resp = await fetch(
      `https://onlinetools.ups.com/security/v1/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-merchant-id": "C54781",
          Authorization:
            "Basic " +
            btoa(
              "58C0kvkOc50R8cCejMEAKGG4fPdaDXaHorG1tgksO6TmU1lA:DfI27CNJ1kcmN0yQcC1QvAe4BTHDwmGa2q5Kyv37VJAodJg1WqDGGzKuaGqCpzvi"
            ),
        },
        body: new URLSearchParams(formData).toString(),
      }
    );

    console.log("resp", resp.body);

    const data = await resp.json();
    console.log(data.access_token);

    return data.access_token;
  } catch (error) {
    console.error("error", error);
  }
}

module.exports = main;
