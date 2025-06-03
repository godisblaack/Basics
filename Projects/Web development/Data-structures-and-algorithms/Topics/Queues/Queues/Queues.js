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
import java.util.ArrayDeque;
import java.util.Queue;

public class QueueInitialization {
  public static void main(String[] args) {
    Queue<Integer> queue = new ArrayDeque<>();

    queue.add(10);
    queue.add(20);
    queue.add(30);
    System.out.println(queue);
    
    var front = queue.remove();
    System.out.println(front);
    System.out.println(queue);
  }
}
`,`
import java.util.Arrays;

public class QueueUsingArray {
  public static void main(String[] args) {
    ArrayQueue queue = new ArrayQueue(5);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    System.out.println(queue);

    var front = queue.dequeue();
    System.out.println(front);
    System.out.println(queue);
  }

  public static class ArrayQueue {
    private int[] items;
    private int rear;
    private int front;
    private int count;

    public ArrayQueue(int capacity) {
      items = new int[capacity];
    }

    public void enqueue(int item) {
      if (isFull()) {
        throw new IllegalStateException();
      }
      
      items[rear++] = item;
      count++;
    }
    
    public int dequeue() {
      if (isEmpty()) {
        throw new IllegalStateException();
      }

      var item = items[front];
      items[front++] = 0;
      count--;
      
      return item;
    }

    public int peek() {
      return items[front];
    }

    public boolean isEmpty() {
      return (count == 0);
    }

    public boolean isFull() {
      return (rear == items.length);
    }

    @Override
    public String toString() {
      return Arrays.toString(items);
    }
  }
}
`,`
import java.util.Arrays;

public class CircularQueueUsingArray {
  public static void main(String[] args) {
    ArrayQueue queue = new ArrayQueue(5);
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    queue.enqueue(50);
    System.out.println(queue);
    
    var front = queue.dequeue();
    System.out.println(front);
    queue.enqueue(50);
    System.out.println(queue);
  }

  public static class ArrayQueue {
    private int[] items;
    private int rear;
    private int front;
    private int count;

    public ArrayQueue(int capacity) {
      items = new int[capacity];
    }

    public void enqueue(int item) {
      if (isFull()) {
        throw new IllegalStateException();
      }
      
      items[rear] = item;
      rear = (rear + 1) % items.length;
      count++;
    }
    
    public int dequeue() {
      if (isEmpty()) {
        throw new IllegalStateException();
      }

      var item = items[front];
      items[front] = 0;
      front = (front + 1) % items.length;
      count--;
      
      return item;
    }

    public int peek() {
      return items[front];
    }

    public boolean isEmpty() {
      return (count == 0);
    }

    public boolean isFull() {
      return ((rear + 1) % items.length == front);
    }

    @Override
    public String toString() {
      return Arrays.toString(items);
    }
  }
}
`,`
// This queue is implemented using linked list so there is no logic for "isEmpty" and "isFull" functions.

import java.util.Arrays;
import java.util.LinkedList;

public class QueueUsingLinkedList {
  public static void main(String[] args) {
    LinkedListQueue queue = new LinkedListQueue();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    System.out.println(queue.size());
    System.out.println(queue);

    var front = queue.dequeue();
    System.out.println(front);
    System.out.println(queue.size());
    System.out.println(queue);
  }

  public static class LinkedListQueue {
    LinkedList<Integer> list = new LinkedList<>();
    private int count;

    public void enqueue(int item) {
      list.addLast(item);
      count++;
    }
    
    public int dequeue() {
      if (list.isEmpty()) {
        throw new RuntimeException("Queue is empty");
      }

      int item = list.removeFirst();
      count--;
      
      return item;
    }

    public int peek() {
      return list.getFirst();
    }

    public int size() {
      return count;
    }

    @Override
    public String toString() {
      return Arrays.toString(list.toArray());
    }
  }
}
`,`
import java.util.Stack;

public class QueueUsingStack {
  public static void main(String[] args) {
    StackQueue queue = new StackQueue();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    System.out.println(queue.size());
    System.out.println(queue);

    var front = queue.dequeue();
    System.out.println(front);
    System.out.println(queue.size());
    System.out.println(queue.peek());
    System.out.println(queue);
  }

  public static class StackQueue {
    Stack<Integer> stack = new Stack<>();
    private int count;

    public void enqueue(int item) {
      stack.push(item);
      count++;
    }
    
    public int dequeue() {
      if (isEmpty()) {
        throw new RuntimeException("Queue is empty");
      }

      int item = popLastElementFromStack();
      count--;
      
      return item;
    }

    public int peek() {
      return stack.peek();
    }

    public boolean isEmpty() {
      return stack.isEmpty();
    }

    public int size() {
      return count;
    }

    @Override
    public String toString() {
      return stack.toString();
    }

    public int popLastElementFromStack() {
      Stack<Integer> newStack = new Stack<>();

      while (!stack.isEmpty()) {
        newStack.push(stack.pop());
      }

      var item = newStack.pop();

      while (!newStack.isEmpty()) {
        stack.push(newStack.pop());
      }

      return item;
    }
  }
}
/*
  Alternate way
  This method does not have the feature to view the content of the queue.

  public static class QueueWithTwoStacks {
    private Stack<Integer> stack1 = new Stack<>();
    private Stack<Integer> stack2 = new Stack<>();
    private int count;

    public void enqueue(int item) {
      stack1.push(item);
      count++;
    }
    
    public int dequeue() {
      if(isEmpty()) {
        throw new IllegalStateException();
      }

      moveStack1ToStack2();

      count--;

      return stack2.pop();
    }

    
    public int peek() {
      if(isEmpty()) {
        throw new IllegalStateException();
      }
      
      moveStack1ToStack2();

      return stack2.peek();
    }

    private void moveStack1ToStack2() {
      if (stack2.isEmpty()) {
        while (!stack1.isEmpty()) {
          stack2.push(stack1.pop());
        }
      }
    }

    public boolean isEmpty() {
      return stack1.isEmpty() && stack2.isEmpty();
    }
    
    public int size() {
      return count;
    }
  }
*/
`,`
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Stack;

public class QueueWithReverseFeatures {
  public static void main(String[] args) {
    Queue<Integer> queue = new ArrayDeque<>();
    queue.add(10);
    queue.add(20);
    queue.add(30);
    System.out.println(queue);
    reverse(queue);
    System.out.println(queue);
  }

  public static void reverse(Queue<Integer> queue) {
    Stack<Integer> stack = new Stack<>();
    while (!queue.isEmpty()) {
      stack.push(queue.remove());
    }
    while (!stack.isEmpty()) {
      queue.add(stack.pop());
    }
  }
}
/*
  The issue with the approach is that it doesn't actually reverse the original queue. Let's break it down:

  The method creates a new queue (newQueue) and iterates over the original queue, removing elements from it and adding them to newQueue.
  However, the assignment queue = newQueue; only reassigns the local reference variable queue to point to the new queue. It does not modify the original queue passed as an argument.
  To address this, we need to modify the original queue directly. One common approach to reverse a queue is by using a stack.

  public static void reverse(Queue<Integer> queue) {
    Queue<Integer> newQueue = new ArrayDeque<>();

    for (int i = 0; i < queue.size(); i++) {
      newQueue.add(queue.remove());
    }

    queue = newQueue;
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