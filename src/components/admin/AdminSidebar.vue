<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="admin-sidebar d-flex flex-column justify-content-between p-3 text-white">
    <div>
      <div class="mb-4">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <g stroke="#fcfcfc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.667" clip-path="url(#a)">
                <path d="M9.18 2.345a.833.833 0 0 1 1.639 0l.876 4.632a1.67 1.67 0 0 0 1.328 1.328l4.632.876a.833.833 0 0 1 0 1.638l-4.632.876a1.67 1.67 0 0 0-1.328 1.328l-.876 4.632a.833.833 0 0 1-1.638 0l-.876-4.632a1.67 1.67 0 0 0-1.328-1.328l-4.632-.876a.833.833 0 0 1 0-1.638l4.632-.876a1.67 1.67 0 0 0 1.328-1.328zM16.667 1.667V5M18.333 3.333H15M3.333 18.333a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333"/>
              </g>
              <defs>
                <clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath>
              </defs>
            </svg>
          </span>
          <div class="d-flex flex-column">
            <span class="logo-text">OtakuHub</span>
            <small class="text-muted text-uppercase fw-semibold" style="font-size: 0.6rem; letter-spacing: 1px; margin-top: -2px;">Admin Panel</small>
          </div>
        </RouterLink>
      </div>

      <nav class="nav flex-column gap-2">
        <RouterLink to="/admin/usuarios" class="nav-link d-flex align-items-center gap-2 rounded px-3 py-2 text-white">
          <i class="bi bi-people-fill"></i> Usuarios
        </RouterLink>
        <RouterLink to="/admin/destacados" class="nav-link d-flex align-items-center gap-2 rounded px-3 py-2 text-white text-opacity-50">
          <i class="bi bi-star-fill"></i> Destacados
        </RouterLink>
      </nav>
    </div>

    <div class="sidebar-footer border-top border-secondary border-opacity-25 pt-3">
      <div class="d-flex align-items-center gap-2 mb-3">
        <img src="https://avatar.iran.liara.run/public/git/boy" alt="Avatar Admin" class="rounded-circle" width="40" height="40">
        <div>
          <p class="m-0 fw-semibold small">Akira Admin</p>
          <small class="text-muted" style="font-size: 0.75rem;">admin@otakuhub.dev</small>
        </div>
      </div>
      <button class="btn btn-link text-white text-opacity-70 p-0 text-decoration-none small d-flex align-items-center gap-2">
        <i class="bi bi-box-arrow-left"></i> Cerrar sesión
      </button>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.admin-sidebar {
  width: 260px;
  background-color: #0b0e14;
  height: 100vh;
  position: sticky;
  top: 0;
}

/* Estilos exactos del logo de tu compañera */
.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &-icon {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #7c4dff, #b766f2);
  }

  &-text {
    font-size: 20px;
    font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
    line-height: 1.4;
    font-weight: 700;
  }
}

/* Enlaces del menú */
.nav-link {
  transition: all 0.2s ease;
  
  &:hover, &.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.05);
    color: #b766f2 !important; /* Le metemos el lila del logo cuando se active */
    opacity: 1 !important;
  }
}
</style>