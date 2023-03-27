const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});

async function buyTokens(e) {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined'){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const signer = provider.getSigner();

        const exchange = new ethers.Contract('CONTRACT_ADDRESS', abi, signer);
    
}
}