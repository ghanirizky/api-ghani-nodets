import fetch from "node-fetch";

export default class CryptoServices {
  static getList = async () => {
    const param = {
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 10,
      meta: true,
    };

    const url: string = "https://api.livecoinwatch.com/coins/list";
    const config: {} = {
      method: "post",
      headers: {
        "x-api-key": "29797eeb-8b90-4ca0-9752-5c06e78aaf0d",
        "Content-Type": "application/json",
      },
      body: param,
    };

    try {
      const data = await fetch(url, config);

      return data;
    } catch (error) {
      return false;
    }
  };
}
