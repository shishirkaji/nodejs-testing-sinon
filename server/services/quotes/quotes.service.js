import axios from "axios";

const getAllQuotes = async () => {
  const url = "https://type.fit/api/quotes";

  const result = await axios.get(url);
  console.log('here')
  return result.data;
};

export default { getAllQuotes };
