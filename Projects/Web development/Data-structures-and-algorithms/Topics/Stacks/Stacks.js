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
import java.util.Stack;

public class StackInitialization {
  public static void main(String[] args) {
    Stack<Integer> integerStack = new Stack<>();
    integerStack.push(10);
    integerStack.push(20);
    integerStack.push(30);
    System.out.println(integerStack);

    var top = integerStack.pop();
    System.out.println(top);
    System.out.println(integerStack);
    
    top = integerStack.peek();
    System.out.println(top);
    
    Stack<String> stringStack = new Stack<>();
    String str = "abcd";
    stringStack.push(str);
    
    var topElement = stringStack.pop();
    System.out.println(topElement);
    System.out.println(stringStack);
  }
}
`,`
import java.util.Arrays;

public class StackUsingArray {
  public static void main(String[] args) {
    Stack stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.pop();
    System.out.println(stack);
    System.out.println(stack.peek());
    System.out.println(stack);
  }

  public static class Stack {
    private int[] items = new int[5];
    private int count = 0;

    public void push(int item) {
      if (count == items.length) {
        throw new StackOverflowError();
      }

      items[count++] = item;
    }

    public int pop() {
      if (count == 0) {
        throw new IllegalStateException();
      }

      return items[--count];
    }

    @Override
    public String toString() {
      var content = Arrays.copyOfRange(items, 0, count);
      return Arrays.toString(content);
    }

    public int peek() {
      if (count == 0) {
        throw new IllegalStateException();
      }

      return items[count - 1];
    }

    public boolean isEmpty() {
      return count == 0;
    }
  }
}
`,
`
import java.util.LinkedList;

public class StackUsingLinkedList {
  public static void main(String[] args) {
    Stack stack = new Stack();
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.pop();
    System.out.println(stack);
    System.out.println(stack.peek());
    System.out.println(stack);
  }

  public static class Stack {
    private LinkedList<Integer> list = new LinkedList<>();

    public void push(int item) {
      list.addFirst(item);
    }

    public int pop() {
      if(list.isEmpty()) {
        throw new IllegalStateException();
      }

      return list.removeFirst();
    }

    @Override
    public String toString() {
      return list.toString();
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
  }
}
`,`
// Using the class "StackWithFeatures" we can reverse a given string and check whether an expression is balanced or not.

import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class StackWithFeatures {
  public static void main(String[] args) {
    String string = "abcd";
    
    StringReverser reverser = new StringReverser();
    var result = reverser.reverse(string);
    System.out.println(result);

    Expression expression = new Expression();
    var results = expression.isBalanced("(1+ {2 * <3>}/[4])");
    System.out.println(results);
  }

  public static class StringReverser {
    public String reverse(String string) {
      if (string == null) {
        throw new IllegalArgumentException("Input string cannot be null");
      }

      Stack<Character> stack = new Stack<>();
      
      for (char ch : string.toCharArray()) {
        stack.push(ch);
      }

      StringBuffer reversed = new StringBuffer(); // The StringBuffer class in Java is a mutable sequence of characters. It is similar to the String class, but it allows you to modify the characters within the sequence, unlike the immutable String class.
      while (!stack.empty()) {
        reversed.append(stack.pop());
      }

      return reversed.toString();

      /* 
        Visual representation

        +---------------+
        |  Stack  |
        |  (capacity 16)  |
        |  'd'  |
        |  'c'  |
        |  'b'  |
        |  'a'  |
        +---------------+
        |  reversed  |
        |  "dcba"  |
        +---------------+
        |  Memory  |
        |  (allocated for the objects)  |
        +---------------+
       */

       /*
        Alternate way

        for (int i = 0; i < string.length(); i++) {
          stack.push(string.charAt(i));
        }

        String reversed = "";
        while (!stack.empty()) {
          reversed += stack.pop(); // This concatination is expensive because everytime this line execute a new string object will be created in memory, because strings are immutable in java, we cannot modify them, when we try to modify them a new memory is allocated and characters are copied in that memory space. 
        }
      
        Visual representation

        +---------------+
        |  Stack  |
        |  (capacity 16)  |
        |  'd'  |
        |  'c'  |
        |  'b'  |
        |  'a'  |
        +---------------+
        |  reversed  |
        |  "d"  |
        +---------------+
        |  reversed  |
        |  "dc"  |
        +---------------+
        |  reversed  |
        |  "dcb"  |
        +---------------+
        |  reversed  |
        |  "dcba"  |
        +---------------+
        |  Memory  |
        |  (allocated for the objects)  |
        +---------------+
       */
    }
  }

  public static class Expression {
    private final List<Character> leftBrackets = Arrays.asList('(', '<', '[', '{');
    private final List<Character> rightBrackets = Arrays.asList(')', '>', ']', '}');

    public boolean isBalanced(String input) {
      Stack<Character> stack = new Stack<>();

      for (char ch : input.toCharArray()) {
        if (isLeftBracket(ch)) {
          stack.push(ch);
        }

        if (isRightBracket(ch)) {
          if (stack.empty()) {
            return false;
          }

          var top = stack.pop();
          if (!bracketsMatch(top, ch)) {
            return false;
          }
        }
      }

      return stack.empty();
    }

    private boolean isLeftBracket(char ch) {
      return leftBrackets.contains(ch);
    }

    private boolean isRightBracket(char ch) {
      return rightBrackets.contains(ch);
    }

    private boolean bracketsMatch(char left, char right) {
      return leftBrackets.indexOf(left) == rightBrackets.indexOf(right);
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