import axios from "axios";

const baseUrl = "/api/reviews";

const getReviews = async () => (await axios.get(`${baseUrl}?detailsProperty=true`)).data;

const reviewsService = {
  getReviews,
};

export default reviewsService;