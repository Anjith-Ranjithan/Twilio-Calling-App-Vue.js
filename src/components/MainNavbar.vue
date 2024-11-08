<template>
    <nav class="navbar navbar-expand-sm navbar-light">
      <div class="container-fluid">
        <!-- App Name -->
        <a class="navbar-brand" href="#">Twilio Call App</a>
        <!-- Toggle button for mobile responsiveness -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Careers</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MainNavbar'
  }
  </script>
  
  
  <style scoped>
  /* Additional custom styles for the navbar (optional) */
  </style>
  