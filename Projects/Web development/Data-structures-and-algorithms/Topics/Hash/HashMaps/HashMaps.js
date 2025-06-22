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
import java.util.HashMap;

public class HashMapInitialization {
  public static void main(String[] args) {
    HashMap<Integer, String> map = new HashMap<>();

    map.put(1, "Mosh");
    map.put(2, "John");
    map.put(3, "Mary");
    System.out.println(map);

    map.put(3, "Marianne");
    System.out.println(map);

    map.put(4, null);
    map.put(null, null);
    System.out.println(map);

    map.remove(null);
    System.out.println(map);

    var value = map.get(3);
    System.out.println(value);

    map.containsKey(3); // O(1)
    map.containsValue("Mosh"); // O(n)

    for (var item: map.keySet()) {
      System.out.println(item);
    }
    
    for (var item: map.entrySet()) {
      System.out.println(item);
    }
  }
}
/*
  Alternate way

  import java.util.HashMap;
  import java.util.Map;


  public class HashMapInitialization {
    public static void main(String[] args) {
      Map<Integer, String> map = new HashMap<>();

      map.put(1, "Mosh");
      map.put(2, "John");
      map.put(3, "Mary");
      System.out.println(map);

      map.put(3, "Marianne");
      System.out.println(map);

      map.put(4, null);
      map.put(null, null);
      System.out.println(map);

      map.remove(null);
      System.out.println(map);

      var value = map.get(3);
      System.out.println(value);

      map.containsKey(3); // O(1)
      map.containsValue("Mosh"); // O(n)

      for (var item: map.keySet()) {
        System.out.println(item);
      }
      
      for (var item: map.entrySet()) {
        System.out.println(item);
      }
    }
  }
*/
`,`
import java.util.HashMap;
import java.util.Map;

public class CharacterFinderHashMap {
  public static void main(String[] args) {
    FirstNonRepeatedCharacterFinder finder = new FirstNonRepeatedCharacterFinder();

    var result = finder.findFirstNonRepeatingCharacter("a green apple");
    System.out.println(result);
  }

  public static class FirstNonRepeatedCharacterFinder {
    public char findFirstNonRepeatingCharacter(String str) {
      Map<Character, Integer> map = new HashMap<>();
      
      var chars = str.toCharArray();
      for (var ch : chars) {
        var count = map.containsKey(ch) ? map.get(ch) : 0;
        map.put(ch, count + 1);
      }

      for (var ch : chars) {
        if (map.get(ch) == 1) {
          System.out.println(map);
          return ch;
        }
      }

      System.out.println(map);
      return Character.MIN_VALUE; // If no non-repeating character is found, return a specific character (e.g., 'N', you can do this by replacing "Character.MIN_VALUE" with "'N'") to indicate that no non-repeating character was found. This ensures that the output is always visible in the console, even if the first non-repeating character happens to be a null character ('\u0000').
    }
  }
}

/*
  import java.util.HashMap;
  import java.util.Map;

  public class CharacterFinderHashMap {
    public static void main(String[] args) {
      FirstNonRepeatedCharacterFinder finder = new FirstNonRepeatedCharacterFinder();

      var result = finder.findFirstNonRepeatingCharacter("a green applergl");
      System.out.println(result);
    }

    public static class FirstNonRepeatedCharacterFinder {
      public char findFirstNonRepeatingCharacter(String str) {
        Map<Character, Integer> map = new HashMap<>();
        
        var chars = str.toCharArray();

        for (var ch : chars) {
          var count = map.containsKey(ch) ? map.get(ch) : 0;
          if (ch == ' ') {
            map.put('B', count + 1); // Instead of blank space we are inserting "B".
          } else {
            map.put(ch, count + 1);
          } 
        }

        for (var ch : map.keySet()) { // We cannot compare ch with chars because content of chars and HashMap is different.
          if (map.get(ch) == 1) {
            System.out.println(map);

            return ch;
          }
        }

        System.out.println(map);
        return Character.MIN_VALUE;
      }
    }
  }
 */
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