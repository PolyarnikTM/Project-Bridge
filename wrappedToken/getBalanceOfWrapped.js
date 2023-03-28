const ethereumButton = document.querySelector('.getBalanceOfWrapped');

ethereumButton.addEventListener('click', () => {
    getBalanceOfWrapped();
});

import ERC20Artifacts from '../Token/contractAbi.json' assert { type: 'json' };
import deploy from "./deployWrappedToken.js";




async function getBalanceOfWrapped() {

    const provider = ethers.getDefaultProvider(
        "https://eth-goerli.g.alchemy.com/v2/Etm9xggOHOsc1Jl3_n_2ncGEAN6ajesw"
      );
    const signer = new ethers.Wallet("8475ce1ffedd5758190e8dc042de201fa9f7335ce0a0ec92d7aa5cff802cedb9", provider);

    const ERC20 = new ethers.Contract(
        "0x5B4a53987f4310440af400F83836F2Ae28AD42E0",
      ERC20Artifacts,
      signer
    );
    const getBalanceOf = await ERC20.balanceOf(
      await signer.getAddress()
    );
    console.log(Number(await getBalanceOf));
}