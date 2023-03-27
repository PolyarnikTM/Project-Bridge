import ERC20Artifacts from './contractAbi.json' assert { type: 'json' };


async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
}

async function symbol_name() {
  if (typeof window.ethereum !== 'undefined') {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const ERC20 = new ethers.Contract(
        "0x2263e6f927AF4Dbc440c0a8DECADff3eE3A71c8C",
      ERC20Artifacts,
      signer
    );
    const getSymbol = await ERC20.symbol();
    console.log(getSymbol);
    const getName = await ERC20.name();
    console.log(getName);
    return getSymbol, getName
  }
}
export default symbol_name