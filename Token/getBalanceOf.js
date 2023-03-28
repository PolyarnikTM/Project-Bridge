const ethereumButton = document.querySelector('.getBalanceOf');

ethereumButton.addEventListener('click', () => {
    getBalanceOf();
});

import ERC20Artifacts from '../Token/contractAbi.json' assert { type: 'json' };


async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function getBalanceOf() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const ERC20 = new ethers.Contract(
      globalAddress,
      ERC20Artifacts,
      signer
    );
    const getBalanceOf = await ERC20.balanceOf(
      await signer.getAddress()
    );
    console.log(Number(getBalanceOf));
  }
}