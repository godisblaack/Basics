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
import java.util.LinkedList;

public class HashTableImplementation {
  public static void main(String[] args) {
    HashTableFunction table = new HashTableFunction();
    table.put(6, "A");
    table.put(8, "B");
    table.put(11, "C");
    System.out.println(table.get(6));
    System.out.println(table.get(9));
    table.remove(6);
    System.out.println(table.get(6));
    table.remove(9); // This will throw an exception.
  }

  public static class HashTableFunction {
    private class Entry {
      private int key;
      private String value;

      public Entry(int key, String value) {
        this.key = key;
        this.value = value;
      }
    }

    private LinkedList<Entry>[] entries = new LinkedList[5];  

    public void put(int key, String value) {
      var entry = getEntry(key);
      if (entry != null) {
        entry.value = value;
        return;
      }
      
      getOrCreateBucket(key).add(new Entry(key, value));
    }


    public String get(int key) {
      var entry = getEntry(key);
      
      return (entry == null) ? null : entry.value;
    }

    public void remove(int key) {
      var entry = getEntry(key);

      if (entry == null) {
        throw new IllegalStateException();
      }

      getBucket(key).remove(entry);
    }

    private LinkedList<Entry> getBucket(int key) {
      return entries[hash(key)]; 
    }

    private LinkedList<Entry> getOrCreateBucket(int key) {
      var index = hash(key);
      var bucket = entries[index];
      
      if (bucket == null) {
        bucket = new LinkedList<>();
        entries[index] = bucket;
    }

      return bucket;
    }

    // Alternate way
    // private LinkedList<Entry> getOrCreateBucket(int key) {
    //   var index = hash(key);
    //   if (entries[index] == null) {
    //       entries[index] = new LinkedList<>();
    //   }

    //   return entries[index];
    // }

    private Entry getEntry(int key) {
      var bucket = getBucket(key);

      if (bucket !=null) {
        for (var entry : bucket) {
          if (entry.key == key) {
            return entry;
          }
        }
      }

      return null;
    }

    private int hash(int key) {
      return key % entries.length;
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