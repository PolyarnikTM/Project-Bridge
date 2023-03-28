const ethereumButton = document.querySelector('.burn');

ethereumButton.addEventListener('click', () => {
    burn(globalAddress);
});

import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };
import wrappedMint from '../wrappedToken/wrappedMint.js' 
import name_symbol from './name_symbol.js' 
import deploy from '../wrappedToken/deployWrappedToken.js'

const form = document.querySelector('form');
const numberInput = form.querySelector('#number-input');

let numberValue;
// let addressValue;



form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем стандартное поведение формы

  numberValue = Number(numberInput.value);
  console.log(`Вы ввели число: ${numberValue}`);
});

// const textInput2 = document.getElementById('text-input2');
// const submitButton2 = document.querySelector('.submit2');

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

// submitButton2.addEventListener('click', async (event) => {
//   event.preventDefault();
//   const address = textInput2.value;
//   addressValue = address;
//     console.log(address);
// });

const data = {
  address: "F",
  wrappedAddress: "0x",

};

async function sendData(data) {
  try {
      const response = await fetch("http://localhost:3000/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      body: JSON.stringify(data),
      });
      // const da = await response.json();
      // return da;
  } catch (error) {
      return error;
  }
}

async function fetchData(address) {
try {
    const response = await fetch(`http://localhost:3000/checkAddress/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
    console.log(`http://localhost:3000/checkAddress/${address}`);
    const data = await response.json();
    return data;
} catch (error) {
    return error;
}
}

async function burn(tokenAddress) {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const ERC20 = new ethers.Contract(
          tokenAddress,
        ERC20Artifacts,
        signer
      );

      const burn = await ERC20.burn(
        numberValue,
      );

      await burn.wait();
      const response = await fetchData(tokenAddress);
      const exists = response.exists;
      const wrapped_token_address = response.wrapped_token_address;
      console.log(wrapped_token_address, exists)
      if (exists == true) {
        await wrappedMint(await signer.getAddress(), numberValue, wrapped_token_address);
       } else {
        const [name, symbol] = await name_symbol()
        const wrappedTokenAddress = await deploy(name, symbol)
        data.wrappedAddress = wrappedTokenAddress;
        data.address = tokenAddress;
        await sendData(data);
       }


      // const tokenAddress = await deploy(name, symbol);
      // await sendData(data);
    }
}