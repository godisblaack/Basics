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
import java.util.PriorityQueue;

public class PriorityQueueInitialization {
  public static void main(String[] args) {
    PriorityQueue<Integer> queue = new PriorityQueue<>();
    queue.add(5);
    queue.add(1);
    queue.add(3);
    queue.add(2);
    while (!queue.isEmpty()){
      System.out.println(queue.remove());
    }
  }
}
`,`
import java.util.Arrays;

public class ImplementingPriorityQueueUsingArray {
  public static void main(String[] args) {
    PriorityQueueUsingArray queue = new PriorityQueueUsingArray();
    queue.add(40);
    queue.add(20);
    queue.add(30);
    queue.add(10);
    queue.add(50);
    System.out.println(queue);

    var front = queue.remove();
    System.out.println(front);
    System.out.println(queue);

    while (!queue.isEmpty()){
      System.out.println(queue.remove());
    }
  }

  public static class PriorityQueueUsingArray {
    private int[] items = new int[5];
    private int rear;
    private int front;
    private int count;

    public void add(int item) {
      if (isFull()) {
        throw new IllegalStateException();
      }

      items[rear++] = item;

      for (int i = rear - 1; i > front; i--) {
        if (items[i] < items[i-1]) {
          int temp = items[i-1];
          items[i-1] = items[i];
          items[i] = temp;
        }
      }

      count++;
    }

    public int remove() {
      if (isEmpty()) {
        throw new IllegalStateException();
      }

      var item = items[front];
      items[front++] = 0;
      count--;

      return item;
    }

    public int peek() {
      return items[0];
    }

    public boolean isEmpty() {
      return count == 0;
    }

    public boolean isFull() {
      return count == items.length;
    }

    public String toString() {
      var content = Arrays.copyOfRange(items, front, rear);

      return Arrays.toString(content);
    }
  } 
}
/*

  Alternate way 
  
  public static class PriorityQueueUsingArray {
    private int[] items = new int[5];
    private int count;

    public void add(int item) {
      if (isFull()) {
        throw new IllegalStateException();
      }

      var i = shiftItemsToInstert(item);
      items[i] = item;
      count++;
    }

    public int shiftItemsToInstert(int item) {
      int i;
      for (i = count - 1; i >= 0; i--) {
        if (items[i] > item) {
          items[i + 1] = items[i];
        } else {
          break;
        }
      }

      return i + 1;
    }

    public int remove() {
      if (isEmpty()) {
        throw new IllegalStateException();
      }

      return items[--count];
    }

    public boolean isEmpty() {
      return count == 0;
    }

    public boolean isFull() {
      return count == items.length;
    }

    @Override
    public String toString() {
      var content = Arrays.copyOfRange(items, 0, count);

      return Arrays.toString(content);
    }
  }

  In summary, both implementations provide a working priority queue using an array, but they differ in their approach to maintaining the priority order and the efficiency of their operations. The second implementation focuses on maintaining the priority order during the add operation, while the first implementation prioritizes the efficiency of the add operation by rearranging the elements after insertion.
*/
`,`
import java.util.LinkedList;

public class ImplementingPriorityQueueUsingLinkedList {
  public static void main(String[] args) {
    PriorityQueueUsingLinkedList queue = new PriorityQueueUsingLinkedList();
    queue.add(40);
    queue.add(20);
    queue.add(30);
    queue.add(10);
    queue.add(50);
    System.out.println(queue);

    var front = queue.remove();
    System.out.println(front);
    System.out.println(queue);

    while (!queue.isEmpty()){
      System.out.println(queue.remove());
    }
  }

  public static class PriorityQueueUsingLinkedList {
    LinkedList<Integer> list = new LinkedList<>();

    public void add(int item) {
      if (list.isEmpty()) {
        list.add(item);
      } else {
        int index = 0;
        boolean inserted = false;

        for (int current : list) {
          if (current < item) {
            index++;
          } else {
            list.add(index, item);
            inserted = true;
            break;
          }
        }

        if (!inserted) {
          list.addLast(item);
        }
      }
    }

    public int remove() {
      if (list.isEmpty()) {
        throw new IllegalStateException();
      }

      return list.removeFirst();
    }

    public int peek() {
      if (list.isEmpty()) {
        throw new IllegalStateException();
      }

      return list.getFirst();
    }

    public boolean isEmpty() {
      return list.isEmpty();
    }

    @Override
    public String toString() {
      return list.toString();
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