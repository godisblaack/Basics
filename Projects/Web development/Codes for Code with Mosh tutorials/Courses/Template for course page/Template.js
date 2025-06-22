function showCode(video) {
  const codeContainer = document.getElementById('codeContainer');
  const codeBlock = document.getElementById('code-block');
  let code = '';

  switch(video) {
    case 'videoNumber':
      code = `
Your code goes here.
`;
      break;
    // Add more cases here for other videos
    default:
      code = 'Please select a video to view the code.';
  }

  codeBlock.textContent = code.trim();
  hljs.highlightAll();
}

function copyCode() {
  const codeBlock = document.getElementById('code-block');
  const tempInput = document.createElement('textarea');
  tempInput.value = codeBlock.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Code copied to clipboard!');
}