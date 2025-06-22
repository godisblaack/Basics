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
import java.util.Arrays;

public class InitializingArrays {
  public static void main(String[] args) {
    // Initializing array

    // int[] numbers = new int[3];
    // numbers[0] = 10;
    // numbers[1] = 20;
    // numbers[2] = 30;

    int[] numbers = {10, 20, 30}; // Alternate way

    System.out.println(Arrays.toString(numbers));

    System.out.println(numbers.length);
  }
}
`,`
public class ArrayWithFeatures {
  public static void main(String[] args) {
    Array numbers = new Array(3);
    numbers.insert(10);
    numbers.insert(20);
    numbers.insert(30);
    numbers.insert(40);

    numbers.print();

    numbers.removeAt(3);
    numbers.print();

    System.out.println(numbers.indexOf(10)); // This will return the first occurance of the element passed.
  }

  public static class Array {
    private int[] items;
    private int count;
  
    public Array(int length) {
      items = new int[length];
    }
  
    public void insert(int item) {
      if (items.length == count) {
        int [] newItems = new int[count * 2];
  
        for (int i = 0; i < items.length; i++) {
          newItems[i] = items[i];
        }
  
        items = newItems;
      }
  
      items[count++] = item;
    }
  
    public void removeAt(int index) {
      if (index < 0 || index >= count) {
        throw new IllegalArgumentException();
      }
  
      for (int i = index; i < count; i++) {
        items[index] = items[index + 1];
      }
      count--;
    }
  
    public int indexOf(int item) {
      for (int i = 0; i < count; i++) {
        if (items[i] == item) {
          return i;
        }
      }
      return -1;
    }
  
    public void print() {
      for (int i = 0; i < count; i++) {
        System.out.println(items[i]);
      }
    }
  }
}
`, `
import java.util.ArrayList;

public class DynamicArray {
  public static void main(String[] args) {
    ArrayList<Integer> list = new ArrayList<>();
    list.add(10);
    list.add(20);
    list.add(30);

    list.remove(0);

    System.out.println(list.lastIndexOf(20));

    System.out.println(list.contains(20));

    System.out.println(list.size());

    list.toArray(); // This converts ArrayList to a regular array object.

    System.out.println(list);
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