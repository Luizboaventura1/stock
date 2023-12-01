export default function productCalculation() {
  const input = (value1, value2, totalAmount, valueChosen) => {
    return parseInt(value1) - ((parseInt(value2) / parseInt(totalAmount)) * parseInt(valueChosen));
  };

  const output = (value, totalAmount, valueChosen) => {
    return (parseInt(value) / parseInt(totalAmount)) * parseInt(valueChosen);
  };

  return {
    input,
    output
  }
}
