const ethereumButton = document.querySelector('.getBalanceOfWrapped');

ethereumButton.addEventListener('click', () => {
    getBalanceOfWrapped(globalAddress);
});

import ERC20Artifacts from '../Token/contractAbi.json' assert { type: 'json' };
import deploy from "./deployWrappedToken.js";



// const form = document.querySelector('form');
//   const submitTextButton = document.getElementById('submit-text');
//   const textInput = document.getElementById('text-input');

//   submitTextButton.addEventListener('click', async () => {
//     const address = textInput.value;
//     const response = await getBalanceOfWrapped(address)
//     console.log(address);
//   });


async function fetchData(address) {
  try {
      const response = await fetch(`http://localhost:3000/checkAddress/${address}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        }
      })
      console.log(`http://localhost:3000/checkAddress/${address}`)
      const data = await response.json();
      return data;
  } catch (error) {
      return error;
  }
 }

 

async function getBalanceOfWrapped(address) {

    const provider = ethers.getDefaultProvider(
        "https://eth-goerli.g.alchemy.com/v2/Etm9xggOHOsc1Jl3_n_2ncGEAN6ajesw"
      );
    const signer = new ethers.Wallet("8475ce1ffedd5758190e8dc042de201fa9f7335ce0a0ec92d7aa5cff802cedb9", provider);
    const response = await fetchData(address);
    const exists = response.exists;
    const wrapped_token_address = response.wrapped_token_address;
    console.log(address, exists, wrapped_token_address);
    if (exists == true) {
      const ERC20 = new ethers.Contract(
        wrapped_token_address,
        ERC20Artifacts,
        signer
      );
      const getBalanceOf = await ERC20.balanceOf(
        await signer.getAddress()
      );
      console.log(Number(await getBalanceOf));
     } else {
        console.log("bridge is not exists")
     }

    
}