window.onload = function() {
    var logoDiv = document.querySelector('.logo');
    
    var imgElement = document.createElement('img');
    
    imgElement.src = 'https://raw.githubusercontent.com/godisblaack/Leetquest/master/images/logo/logo.png';
    
    imgElement.width = 50;
    imgElement.height = 50; 
    
    logoDiv.appendChild(imgElement);
};
