const ethereumButton = document.querySelector('.transferFrom');

ethereumButton.addEventListener('click', () => {
    transferFrom();
});

import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };


async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function transferFrom() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const ERC20 = new ethers.Contract(
          "0x80f2884B1E88d03f8C0dDB04811255e247B8c0b1",
        ERC20Artifacts,
        signer
      );
      const transferFrom = await ERC20.transferFrom(
        "0x21Fa3686C6bCACC9473D7A7dA24ef525dB58106f",
        "0x0457E3dF3b1e60FFC0B095ACdac1c0a95475C9a4",
        1,
      );
      await transferFrom.wait();
      console.log(Number(transferFrom));
    }
}