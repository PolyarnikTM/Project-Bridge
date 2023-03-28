import wrappedTokenABI from './wrappedTokenABI.json' assert { type: 'json' };

async function wrappedMint(to, amount, tokenAddress) {
      const provider = ethers.getDefaultProvider(
        "https://eth-goerli.g.alchemy.com/v2/Etm9xggOHOsc1Jl3_n_2ncGEAN6ajesw"
      );
      const signer = new ethers.Wallet("8475ce1ffedd5758190e8dc042de201fa9f7335ce0a0ec92d7aa5cff802cedb9", provider);
  
      const ERC20 = new ethers.Contract(
        tokenAddress,
        wrappedTokenABI,
        signer
      );
      console.log(tokenAddress, wrappedMint, signer)
      const WrappedMint = await ERC20.mint(
        to,
        amount,
      );
      await WrappedMint.wait();
    
}
export default wrappedMint