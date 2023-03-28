const ethereumButton = document.querySelector('.burn');

ethereumButton.addEventListener('click', () => {
    burn();
});

import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };
import wrappedMint from '../wrappedToken/wrappedMint.js' 
import name_symbol from './name_symbol.js' 
import deploy from '../wrappedToken/deployWrappedToken.js'

const form = document.querySelector('form');
const numberInput = form.querySelector('#number-input');

let numberValue;

form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем стандартное поведение формы

  numberValue = Number(numberInput.value);
  console.log(`Вы ввели число: ${numberValue}`);
});

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

const data = {
  address: "F",

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

async function burn() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const ERC20 = new ethers.Contract(
          "0x2263e6f927AF4Dbc440c0a8DECADff3eE3A71c8C",
        ERC20Artifacts,
        signer
      );

      // const burn = await ERC20.burn(
      //   numberValue,
      // );

      // await burn.wait();
      const [name, symbol] = await name_symbol()
      const tokenAddress = await deploy(name, symbol);
      data.address = tokenAddress;
      await sendData(data);
      // await wrappedMint(await signer.getAddress(), numberValue, tokenAddress);
    }
}