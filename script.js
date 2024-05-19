document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const videoPlatform = document.getElementById('video-platform');
  const addVideoForm = document.getElementById('add-video-form');
  const videosContainer = document.getElementById('videos-container');

  const validEmail = "usuario@ejemplo.com";
  const validPassword = "contraseña123";

  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (email === validEmail && password === validPassword) {
          loginForm.style.display = 'none';
          videoPlatform.style.display = 'block';
          loadVideos();
      } else {
          alert('Credenciales incorrectas, intente de nuevo.');
      }
  });

  function loadVideos() {
      const videos = JSON.parse(localStorage.getItem('videos')) || [];
      videosContainer.innerHTML = '';
      videos.forEach(video => {
          const videoElement = createVideoElement(video.url, video.title);
          videosContainer.appendChild(videoElement);
      });
  }

  addVideoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const url = document.getElementById('video-url').value;
      const title = document.getElementById('video-title').value;
      addVideo(url, title);
      document.getElementById('video-url').value = '';
      document.getElementById('video-title').value = '';
  });

  function addVideo(url, title) {
      const videos = JSON.parse(localStorage.getItem('videos')) || [];
      videos.push({ url, title });
      localStorage.setItem('videos', JSON.stringify(videos));
      const videoElement = createVideoElement(url, title);
      videosContainer.appendChild(videoElement);
  }

  function createVideoElement(url, title) {
      const container = document.createElement('div');
      container.className = 'video';

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.frameBorder = 0;
      iframe.allowFullscreen = true;
      iframe.width = "640";
      iframe.height = "360";
      container.appendChild(iframe);

      const titleLabel = document.createElement('h3');
      titleLabel.textContent = title;
      container.appendChild(titleLabel);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.onclick = function () {
          container.remove();
          removeVideo(url);
      };
      container.appendChild(deleteButton);

      return container;
  }

  function removeVideo(url) {
      let videos = JSON.parse(localStorage.getItem('videos'));
      videos = videos.filter(video => video.url !== url);
      localStorage.setItem('videos', JSON.stringify(videos));
  }
});
