
window.addEventListener('load', function () {
            const video = document.getElementById('video');
            const canvas = document.getElementById('mcanvas');
            const snapButton = document.getElementById('snap');
            const retryButton = document.getElementById('retry');
            const saveButton = document.getElementById('save');
            const form = document.getElementById('form');
            const printButton = document.getElementById('print');
            const processedImage = document.getElementById('processedImage');
            const imgForm = document.getElementById('imgForm')
            const context = canvas.getContext('2d');
    
            let currentState = 1; // pasar a un string 
            let arrayState = []; // Se declara la variable arrayState fuera de las funciones para que sea accesible para ambas funciones
    
            function show(elementclass) {
                // Seleccionar todos los elementos con la clase especificada
                arrayState = document.querySelectorAll(elementclass);
            
                // Iterar sobre los elementos y mostrarlos
                arrayState.forEach(element => {
                    element.style.display = 'block';
                });
            }
            
            function hide(elementclass) {
                arrayState = document.querySelectorAll(elementclass);
                // Iterar sobre los elementos almacenados en arrayState y ocultarlos
                arrayState.forEach(element => {
                    element.style.display = 'none';
                });
            }
            
    
            function switchState(newState) {
                hide(`.state${currentState}`);
                currentState = newState;
                show(`.state${currentState}`);
            }
    
            function initializeCamera() {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        video.srcObject = stream;
                        video.onloadedmetadata = () => {
                            switchState(1);
                        };
                    })
                    .catch(error => {
                        console.error('Error al acceder a la cámara:', error);
                    });
            }
    
            function capturePhoto() {  
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                switchState(2);
            }
    
            function retryCapture() {
                switchState(1);
            }
    
            function savePhoto() {
                    dataURL = canvas.toDataURL(); // Convertir imagen a base64
                    // Aquí puedes enviar 'dataURL' a tu servidor para guardarla en la base de datos
                    console.log('Imagen guardada:', dataURL);
                    imgForm.src = dataURL
                switchState(3);
            }
    
            function continueProcess() {
                // Aquí puedes agregar lógica para continuar con el proceso
                fetch(formulario.action, {
                    method: 'POST',
                    body: new FormData(formulario)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al enviar los datos al servidor');
                    }
                    return response.text(); // Leer la respuesta del servidor como texto
                })
                .then(data => {
                    // Manejar la respuesta del servidor
                    respuestaContainer.textContent = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                switchState(4);
            }
    
            function printImage() {
                // Aquí puedes agregar lógica para imprimir la imagen
            }
    
            snapButton.addEventListener('click', capturePhoto);
            retryButton.addEventListener('click', retryCapture);
            saveButton.addEventListener('click', savePhoto);
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                continueProcess();
                
            });
            printButton.addEventListener('click', printImage);
            initializeCamera()
    
    });