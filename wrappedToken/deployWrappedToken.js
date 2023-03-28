import abi from "./newWrappedTokenABI.json" assert { type: 'json' };


let bytecodeSUUU;

async function deploy(name, symbol) {
      const provider = ethers.getDefaultProvider(
        "https://eth-goerli.g.alchemy.com/v2/Etm9xggOHOsc1Jl3_n_2ncGEAN6ajesw"
      );
      const signer = new ethers.Wallet("8475ce1ffedd5758190e8dc042de201fa9f7335ce0a0ec92d7aa5cff802cedb9", provider);

      await fetch("./wrappedToken/wrappedToken.bin")
        .then(response => response.text())
        .then(bytecode => {
            bytecodeSUUU = bytecode;
        })
        .catch(error => console.error(error));
      const factory = new ethers.ContractFactory(abi, bytecodeSUUU, signer);
        let contractAddress;
        await factory.deploy(name, symbol).then((contract) => {
        console.log('Contract deployed at:', contract.address);
        contractAddress = contract.address;
        
      });
        return contractAddress
}
export default deploy