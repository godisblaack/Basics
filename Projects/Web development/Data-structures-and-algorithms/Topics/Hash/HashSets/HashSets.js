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
import java.util.HashSet;
import java.util.Set;

public class HashSetInitialization {
  public static void main(String[] args) {
    Set<Integer> set = new HashSet<>();

    int[] numbers = {1, 2, 3, 3, 2, 1, 4};

    for (var number : numbers) {
      set.add(number);
    }

    System.out.println(set);

    System.out.println(set.size());

    System.out.println(set.contains(2));

    System.out.println(set.isEmpty());

    set.remove(4);
    System.out.println(set);
    System.out.println(set.size());

    set.add(5);
    System.out.println(set);
    System.out.println(set.size());

    for (var item: set) {
      System.out.println(item);
    }
  }
}
`,`
import java.util.HashSet;
import java.util.Set;

public class CharacterFinderHashSet {
  public static void main(String[] args) {
    FirstRepeatedCharacterFinder finder = new FirstRepeatedCharacterFinder();

    Character result = finder.findFirstRepeatingCharacter("a green apple");

    if (result == ' ') {
      System.out.println("White space");
    } else if (result == Character.MIN_VALUE) {
      System.out.println("No repeating character.");
    } else {
      System.out.println(result);
    }
  }

  public static class FirstRepeatedCharacterFinder {
    public char findFirstRepeatingCharacter(String str) {
      Set<Character> set = new HashSet<>();

      for (var ch : str.toCharArray()) {
        if (set.contains(ch)) {
          System.out.println(set);

          return ch;
        }

        set.add(ch);
      }

      System.out.println(set);
      return Character.MIN_VALUE;
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
  showCode('java');
});