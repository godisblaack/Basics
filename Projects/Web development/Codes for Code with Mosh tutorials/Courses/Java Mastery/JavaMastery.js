function showCode(video) {
  const codeContainer = document.getElementById('codeContainer');
  const codeBlock = document.getElementById('code-block');
  let code = '';

  switch(video) {
    case 'video3':
      code = `
public class Video3 {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`;
      break;
    case 'video8':
      code = `
public class Video8 {
  public static void main(String[] args) {

    // Initializing a variable

    int age = 30;
    age = 35;
    System.out.println(age);

    // Copying value of one variable into another

    int myAge = 30;
    int herAge = myAge;
    System.out.println(herAge);
  }
}
`;
      break;
    // Add more cases here for other videos
    default:
      code = 'Please select a video to view the code.';
  }

  codeBlock.textContent = code.trim();
  hljs.highlightAll();
}

function copyCode() {
  const codeBlock = document.getElementById('code-block');
  const tempInput = document.createElement('textarea');
  tempInput.value = codeBlock.textContent;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Code copied to clipboard!');
}
