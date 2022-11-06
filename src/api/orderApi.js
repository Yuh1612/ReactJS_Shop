import orderConfig from "./orderConfig";

const orderApi = {
  async getProvinces() {
    return await orderConfig.get("provinces/");
  },
  async getReviewByProductId(productId, rating = 0, limit = 20, page = 1) {
    return await orderConfig.get(
      `/reviews?product=${productId}&rating=${rating}&limit=${limit}&page=${page}`
    );
  },
  async getWard(idProvice) {
    return await orderConfig.get(`wards/${idProvice}`);
  },
  async getDistrict(idWard) {
    return await orderConfig.get(`wards/${idWard}`);
  },
  getUsersByUsername(username) {
    return orderConfig.get(`/user/getUsersByUsername/${username}`);
  },
  async getVoucher() {
    return await orderConfig.get(`/sv3/vouchers/`);
  },
  async getFeeShip(data) {
    return await orderConfig.post(`/sv3/fee/`, data);
  },
  async getService(data) {
    return await orderConfig.post(`sv3/services`, data);
  },
  async createOrder(data) {
    return await orderConfig.post(`/sv3/orders/`, data);
  },
  async getInformationShop(idShop) {
    return await orderConfig.post(`/sv1/users/${idShop}`);
  },
};

export default orderApi;
