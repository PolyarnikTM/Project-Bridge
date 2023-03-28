document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    globalAddress = 42;
    console.log('New value of globalAddress: ' + globalAddress);
  });

  const form = document.querySelector('form');
  const submitTextButton = document.getElementById('submit-text');
  const textInput = document.getElementById('text-input');

  submitTextButton.addEventListener('click', async () => {
    const address = textInput.value;
    const response = await getBalanceOfWrapped(address)
    console.log(address);
  });