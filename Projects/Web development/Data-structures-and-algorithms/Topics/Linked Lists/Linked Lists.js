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
import java.util.LinkedList;

public class LinkedListsInitialization {
  public static void main(String[] args) {
    LinkedList<Integer> list = new LinkedList<>();

    list.addLast(10);
    list.addLast(20);
    list.addLast(30);
    list.addLast(40);
    list.addLast(50);
    System.out.println(list);

    list.addFirst(5);
    System.out.println(list);
    
    list.remove(1);
    System.out.println(list);
    
    list.removeFirst();
    System.out.println(list);

    System.out.println(list.contains(30));

    System.out.println(list.indexOf(20));

    System.out.println(list.size());

    System.out.println(list);

    var array = list.toArray();
    System.out.println(Arrays.toString(array));
  }
}

/*
  Warning: LinkedList is a raw type. References to generic type LinkedList<E> should be parameterized.

  import java.util.Arrays;
  import java.util.LinkedList;

  public class LinkedListsInitialization {
    public static void main(String[] args) {
      LinkedList list = new LinkedList();

      list.addLast(10);
      list.addLast(20);
      list.addLast(30);
      list.addLast(40);
      list.addLast(50);
      System.out.println(list);

      list.addFirst(5);
      System.out.println(list);
      
      list.remove(1);
      System.out.println(list);
      
      list.removeFirst();
      System.out.println(list);

      System.out.println(list.contains(30));

      System.out.println(list.indexOf(20));

      System.out.println(list.size());

      System.out.println(list);

      var array = list.toArray();
      System.out.println(Arrays.toString(array));
    }
  }
 */
`,`
import java.util.Arrays;
import java.util.NoSuchElementException;

public class LinkedListWithFeatures {
  public static void main(String[] args) {
    var list = new LinkedList();

    System.out.println(list.size());
    
    list.addLast(10);
    list.addLast(20);
    list.addLast(30);
    list.addFirst(01);

    System.out.println(list.size());

    System.out.println(list.indexOf(40));
    System.out.println(list.contains(30));

    list.removeFirst();
    list.removeLast();

    System.out.println(list.size());

    list.addLast(30);
    list.addLast(40);

    var array = list.toArray();
    System.out.println(Arrays.toString(array));
    
    
    list.reverse();
    array = list.toArray();
    System.out.println(Arrays.toString(array));
    
    System.out.println(list.getKthFromTheEnd(3));

  }

  public static class LinkedList {
    private class Node {
      private int value;
      private Node next;

      public Node(int value) {
        this.value = value;
      }
    }

    private Node first;
    private Node last;
    private int size;

    public void addLast(int item) {
      var node = new Node(item);

      if (isEmpty()) {
        first = last = node;
      } else {
        last.next = node;
        last = node;
      }

      size++;
    }

    public void addFirst(int item) {
      var node = new Node(item);
      
      if (isEmpty()) {
        first = last = node;
      } else {
        node.next = first;
        first = node;
      }

      size++;
    }

    private boolean isEmpty() {
      return first == null;
    }

    public int indexOf(int item) {
      int index = 0;
      var current = first;

      while (current != null) {
        if (current.value == item) {
          return index;
        }
        current = current.next;
        index++;
      }

      return -1;
    }

    public boolean contains(int item) {
      return indexOf(item) != -1;
    }

    public void removeFirst() {
      if (isEmpty()) {
        throw new NoSuchElementException();
      }

      if (first == last) {
        first = last = null;
        return;
      } else {
        var second = first.next;
        first.next = null;
        first = second;
      }

      size--;
    }

    public void removeLast() {
      if (isEmpty()) {
        throw new NoSuchElementException();
      }

      if (first == last) {
        first = last = null;
      } else {
        var previous = getPrevious(last);
        last = previous;
        last.next = null;
      }

      size--;
    }

    private Node getPrevious (Node node) {
      var current = first;

      while (current != null) {
        if (current.next == node) {
          return current;
        }

        current = current.next;
      }

      return null;
    }

    public int size() {
      return size;
    }

    public int[] toArray() {
      int[] array = new int[size];
      var current = first;
      var index = 0;
       while (current != null) {
        array[index++] = current.value;
        current = current.next;
       }

       return array;
    }
  
    public void reverse() {
      if (isEmpty()) {
        return;
      }

      var previous = first;
      var current = first.next;

      while (current != null) {
        var next = current.next;
        current.next = previous;
        previous = current;
        current = next;
      }
      
      last = first;
      last.next = null;
      first = previous;
    }
    
    public int getKthFromTheEnd(int k) {
      var current = first;
      var previous = first;

      if (isEmpty()) {
        throw new RuntimeException("List is empty.");
      }

      if (k < 0) {
        throw new IllegalArgumentException("Invalid Input!");
      }

      for (int i = 0; i < k - 1; i++) {
        current = current.next;
        
        if (current == null) {
          throw new IllegalArgumentException("List does not have " + k + " elements.");
        }
      }

      while (current != last) {
        previous = previous.next;
        current = current.next;
      }

      return previous.value;
    }
  }
}

/*
 Call the funtion "testEdgeCases();" from main to test the Linked list for edge cases.
        
  public static void testEdgeCases() {
    // 1. Reverse an empty list
    LinkedList emptyList = new LinkedList();
    emptyList.reverse();
    System.out.println("Reversing an empty list: " + Arrays.toString(emptyList.toArray())); // Output: []

    // 2. Get the Kth element from the end of an empty list
    try {
      emptyList.getKthFromTheEnd(3);
      System.out.println("Getting Kth element from an empty list: FAILED");
    } catch (RuntimeException e) {
      System.out.println("Getting Kth element from an empty list: PASSED");
    }

    // 3. Get the Kth element from the end of a list with less than K elements
    LinkedList shortList = new LinkedList();
    shortList.addLast(10);
    shortList.addLast(20);
    try {
      shortList.getKthFromTheEnd(3);
      System.out.println("Getting Kth element from a short list: FAILED");
    } catch (IllegalArgumentException e) {
      System.out.println("Getting Kth element from a short list: PASSED");
    }

    // 4. Get the Kth element from the end with a negative K
    try {
      shortList.getKthFromTheEnd(-1);
      System.out.println("Getting Kth element with negative K: FAILED");
    } catch (IllegalArgumentException e) {
      System.out.println("Getting Kth element with negative K: PASSED");
    }

    // 5. Reverse a list with a single node
    LinkedList singleNodeList = new LinkedList();
    singleNodeList.addLast(10);
    singleNodeList.reverse();
    System.out.println("Reversing a list with a single node: " + Arrays.toString(singleNodeList.toArray())); // Output: [10]

    // 6. Reverse a list with two nodes
    LinkedList twoNodeList = new LinkedList();
    twoNodeList.addLast(10);
    twoNodeList.addLast(20);
    twoNodeList.reverse();
    System.out.println("Reversing a list with two nodes: " + Arrays.toString(twoNodeList.toArray())); // Output: [20, 10]

    // 7. Remove the first and last nodes from an empty list
    emptyList.removeFirst();
    emptyList.removeLast();
    System.out.println("Removing first and last from an empty list: " + Arrays.toString(emptyList.toArray())); // Output: []

    // 8. Remove the first and last nodes from a list with a single node
    singleNodeList.removeFirst();
    singleNodeList.removeLast();
    System.out.println("Removing first and last from a list with a single node: " + Arrays.toString(singleNodeList.toArray())); // Output: []

    // 9. Remove the first node from a list with a single node
    singleNodeList.addLast(10);
    singleNodeList.removeFirst();
    System.out.println("Removing first node from a list with a single node: " + Arrays.toString(singleNodeList.toArray())); // Output: []

    // 10. Remove the last node from a list with a single node
    singleNodeList.addLast(10);
    singleNodeList.removeLast();
    System.out.println("Removing last node from a list with a single node: " + Arrays.toString(singleNodeList.toArray())); // Output: []

    // 11. Remove the first node from an empty list
    try {
      emptyList.removeFirst();
      System.out.println("Removing first node from an empty list: FAILED");
    } catch (NoSuchElementException e) {
      System.out.println("Removing first node from an empty list: PASSED");
    }

    // 12. Remove the last node from an empty list
    try {
      emptyList.removeLast();
      System.out.println("Removing last node from an empty list: FAILED");
    } catch (NoSuchElementException e) {
      System.out.println("Removing last node from an empty list: PASSED");
    }

    // 13. Add a node to the beginning of an empty list
    emptyList.addFirst(10);
    System.out.println("Adding a node to the beginning of an empty list: " + Arrays.toString(emptyList.toArray())); // Output: [10]

    // 14. Add a node to the end of an empty list
    emptyList = new LinkedList();
    emptyList.addLast(10);
    System.out.println("Adding a node to the end of an empty list: " + Arrays.toString(emptyList.toArray())); // Output: [10]

    // 15. Get the index of an item not present in the list
    LinkedList list = new LinkedList();
    list.addLast(10);
    list.addLast(20);
    list.addLast(30);
    int index = list.indexOf(40);
    System.out.println("Getting the index of an item not present in the list: " + index); // Output: -1

    // 16. Check if an item not present in the list is contained
    boolean contains = list.contains(40);
    System.out.println("Checking if an item not present in the list is contained: " + contains); // Output: false
  }
    
  --------------------------------------------------

  Output for the testEdgeCase

  Reversing an empty list: []
  Getting Kth element from an empty list: PASSED
  Getting Kth element from a short list: PASSED
  Getting Kth element with negative K: PASSED
  Reversing a list with a single node: [10]
  Reversing a list with two nodes: [20, 10]
  Removing first and last from an empty list: []
  Removing first and last from a list with a single node: []
  Removing first node from a list with a single node: []
  Removing last node from a list with a single node: []
  Removing first node from an empty list: PASSED
  Removing last node from an empty list: PASSED
  Adding a node to the beginning of an empty list: [10]
  Adding a node to the end of an empty list: [10]
  Getting the index of an item not present in the list: -1
  Checking if an item not present in the list is contained: false
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