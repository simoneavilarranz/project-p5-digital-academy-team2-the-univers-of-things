<script setup>
// Importamos tu nuevo sidebar usando el alias @ que prefiere el equipo
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="flex-grow-1" style="padding: 40px; background: #f8f9fa;">
      <h1 class="fw-bold">Usuarios</h1>
      <p class="text-muted">Gestiona el acceso de los usuarios registrados.</p>
      
      </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
</style>