const codes = {
  // Update the key to match the new topic
  c: [
    `
// Only java code is available, as of now!
`
  ],
  cpp: [
    `
// Only java code is available, as of now!
`
  ],
  csharp: [
    `
// Only java code is available, as of now!
`
  ],
  java: [
    `
// Only java code is available, as of now!
`
  ],
  python: [
    `
# Only java code is available, as of now!
`
  ],
  javascript: [
    `
// Only java code is available, as of now!
`
  ]
  // Add more languages as needed
};

function showCode(language) {
  const codeBlocks = document.querySelectorAll('.code-container pre code');
  const langBtns = document.querySelectorAll('.lang-btn');
  const codeBtns = document.querySelectorAll('.code-btn');
  const codeBlockSelector = document.getElementById('code-block-selector');

  codeBlocks.forEach((block, i) => {
    block.textContent = codes[language][i] || codes[language][0];
    block.className = `language-${language}`;
    block.style.display = 'none';
  });

  codeBlocks[0].style.display = 'block';

  langBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`.lang-btn[onclick="showCode('${language}')"]`);
  activeBtn.classList.add('active');

  codeBtns.forEach((btn, i) => {
    btn.style.display = i < codes[language].length ? 'inline-block' : 'none';
  });

  codeBlockSelector.style.display = codes[language].length > 1 ? 'block' : 'none';
  hljs.highlightAll();
}

function showCodeBlock(index) {
  const codeBlocks = document.querySelectorAll('.code-container pre code');
  const codeBtns = document.querySelectorAll('.code-btn');

  codeBlocks.forEach((block, i) => {
    block.style.display = i === index ? 'block' : 'none';
  });

  codeBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  hljs.highlightAll();
}

function copyCode() {
  const codeBlock = document.querySelector('.code-container pre code:not([style*="none"])');
  const tempInput = document.createElement('textarea');
  tempInput.value = codeBlock.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Code copied to clipboard!');
}

function getCurrentLanguage() {
  const activeBtn = document.querySelector('.lang-btn.active');
  return activeBtn.getAttribute('onclick').replace("showCode('", "").replace("')", "");
}

document.addEventListener('DOMContentLoaded', () => {
  showCode('java');
});