


const cardInput = document.getElementById('cardsName');
const cardButton = document.getElementById('cardSubmit');
const cardResults = document.getElementById('cardResults');

async function getCardPrice(cardName, gameName="Pokemon", condition = "Near Mint"){
  try {
    const response = await fetch(`http://localhost:3000/getPrice?cardName=${encodeURIComponent(cardName)}&gameName=${gameName}&condition=${condition}`);
    const data = await response.json();
    return data.price || null;
  } catch (err){
    console.error(err);
    return null;
  }
}

cardButton.addEventListener('click', async() => {
  const inputValue = cardInput.value;
  const price = await getCardPrice(inputValue);

  if (price != null){
    cardResults.innerHTML = `${inputValue} Market Price (Near Mint): $${price}`;
  } else {
    cardResults.innerHTML = `No pricing found for ${inputValue}`;
  }
})