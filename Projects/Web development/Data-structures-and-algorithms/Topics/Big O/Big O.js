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
// Time complexity
// Code 1
public class Main{
  public void log(int[] numbers) {
    // O(1)
    System.out.println(numbers[0]);
  }
}

// Code 2
public class Main{
  public void log(int[] numbers) {
    // We can write O(constant) -> O(1)
    // O(2) -> O(1)
    System.out.println(numbers[0]);
    System.out.println(numbers[1]);
  }
}

--------------------------------------------------

// Space complexity
public class Main {
  public void greet(String[] names) {
    // O(1)
    for (int i = 0; i < names.length; i++) {
      System.out.println("Hi " + names[i]);
    }
  }
}
`,`
// Time complexity
// Code 1
public class Main{
  public void log(int[] numbers) {
    // O(1 + n + n + 1) -> O(n)
    // We do not consider constants.
    System.out.println(numbers[0]);

    for (int number : numbers) {
      System.out.println(number);
    }

    for (int number : numbers) {
      System.out.println(number);
    }

    System.out.println(numbers[1]);
  }
}

// Code 2
public class Main{
  public void log(int[] numbers, String[] names) {
    // O(n + m)
    for (int number : numbers) {
      System.out.println(number);
    }

    for (String name : names) {
      System.out.println(name);
    }
  }
}

--------------------------------------------------

// Space complexity
public class Main {
  public void greet(String[] names) {
    // O(n)
    String[] copy = new String[names.length];

    for (int i = 0; i < names.length; i++) {
      System.out.println("Hi " + names[i]);
    }
  }
}
`,`
public class Main{
  public void log(int[] numbers, String[] names) {
    // O(n + (n * n)) -> O(n^2)
    for (int number : numbers) {
        System.out.println(number);
    }

    for (int number : numbers) {
      for (int number : numbers) {
        System.out.println(number);
      }
    }
  }
}
`,`
public class Main{
  public void log(int[] numbers, String[] names) {
    // O((n * n) + (n * n * n)) -> O(n^3)
    for (int number : numbers) {
      for (int number : numbers) {
        System.out.println(number);
      }
    }

    for (int number : numbers) {
      for (int number : numbers) {
        for (int number : numbers) {
          System.out.println(number);
        }
      }
    }
  }
}
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
  showCode('c');
});