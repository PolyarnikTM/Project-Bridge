const ethereumButton = document.querySelector('.transfer');

ethereumButton.addEventListener('click', () => {
    transfer();
});

import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };


async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function transfer() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const ERC20 = new ethers.Contract(
          "0x2263e6f927AF4Dbc440c0a8DECADff3eE3A71c8C",
        ERC20Artifacts,
        signer
      );
      const transfer = await ERC20.transfer(
        "0x0457E3dF3b1e60FFC0B095ACdac1c0a95475C9a4",
        1,
      );
      await transfer.wait();
    }
}