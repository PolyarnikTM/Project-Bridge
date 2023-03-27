const ethereumButton = document.querySelector('.burn');

ethereumButton.addEventListener('click', () => {
    burn();
});

import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };
import wrappedMint from '../wrappedToken/wrappedMint.js' 
import symbol_name from './symbol_name.js' 

const form = document.querySelector('form');
const numberInput = form.querySelector('#number-input');

let numberValue;

form.addEventListener('submit', (event) => {
  event.preventDefault(); // отменяем стандартное поведение формы
//где это задействуется
  numberValue = Number(numberInput.value);
  console.log(`Вы ввели число: ${numberValue}`);
});

async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
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
      console.log(`Вы ввели число: ${numberValue}`);
      const burn = await ERC20.burn(
        numberValue,
      );
      await burn.wait();
      console.log("burnComplete")
      console.log(symbol_name())
      wrappedMint(await signer.getAddress(), numberValue);
    }
}