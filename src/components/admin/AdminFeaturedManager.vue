<script setup>
import { ref } from 'vue'

// Base de datos simulada basada en los ejemplos de tu diseño
const animeDatabase = {
  '21': 'One Piece',
  '5114': 'Fullmetal Alchemist: Brotherhood',
  '11061': 'Hunter x Hunter (2011)',
  '52991': 'Sousou no Frieren'
}

// IDs destacados iniciales de la lista
const featuredAnimes = ref([
  { id: '52991', title: 'Sousou no Frieren' },
  { id: '21', title: 'One Piece' },
  { id: '11061', title: 'Hunter x Hunter (2011)' },
  { id: '5114', title: 'Fullmetal Alchemist: Brotherhood' }
])

const inputFeaturedId = ref('')
const inputWeeklyId = ref('')

// Estado para el Anime de la semana
const weeklyAnime = ref({ id: '52991', title: 'Sousou no Frieren' })

// Errores o alertas visuales
const errorMessage = ref('')

// Función para añadir anime destacado
const handleAddFeatured = () => {
  errorMessage.value = ''
  const id = inputFeaturedId.value.trim()

  if (!id) return

  // Validar si ya está en la lista
  if (featuredAnimes.value.some(anime => anime.id === id)) {
    errorMessage.value = 'Este MAL ID ya está añadido en destacados.'
    return
  }

  // Validar límite máximo de 4
  if (featuredAnimes.value.length >= 4) {
    errorMessage.value = 'El panel solo permite un máximo de 4 animes destacados.'
    return
  }

  // Buscar título en nuestra base de datos o poner uno por defecto
  const title = animeDatabase[id] || `Anime Desconocido (ID: ${id})`
  
  featuredAnimes.value.push({ id, title })
  inputFeaturedId.value = ''
}

// Función para eliminar destacado
const handleRemoveFeatured = (id) => {
  featuredAnimes.value = featuredAnimes.value.filter(anime => anime.id !== id)
}

// Función para guardar anime de la semana
const handleSaveWeekly = () => {
  const id = inputWeeklyId.value.trim()
  if (!id) return

  const title = animeDatabase[id] || `Anime Desconocido (ID: ${id})`
  weeklyAnime.value = { id, title }
  inputWeeklyId.value = ''
}
</script>

<template>
  <div class="d-flex flex-column gap-5">
    
    <div class="card border rounded-4 shadow-sm p-4 bg-white">
      <h2 class="fw-bold h4 mb-1 text-dark">Destacados de la Home</h2>
      <p class="text-muted small mb-4">Añade el MAL ID de los animes a destacar (máx. 4).</p>
      
      <div class="input-group mb-2 custom-input-group">
        <input 
          type="text" 
          class="form-control py-2.5 px-3" 
          placeholder="MAL ID (ej. 21)" 
          v-model="inputFeaturedId"
          @keyup.enter="handleAddFeatured"
          :disabled="featuredAnimes.length >= 4"
        >
        <button 
          class="btn btn-purple px-4 d-flex align-items-center gap-2" 
          type="button" 
          @click="handleAddFeatured"
          :disabled="featuredAnimes.length >= 4"
        >
          Añadir
        </button>
      </div>

      <div v-if="errorMessage" class="text-danger small mb-3 fw-medium">
        {{ errorMessage }}
      </div>

      <div class="d-flex flex-column gap-3 mt-2">
        <div 
          v-for="anime in featuredAnimes" 
          :key="anime.id" 
          class="d-flex justify-content-between align-items-center border rounded-3 p-3 bg-light-subtle shadow-xs"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="text-dark fw-semibold small">MAL ID: {{ anime.id }}</span>
            <span class="text-muted small">&mdash; {{ anime.title }}</span>
          </div>
          <button class="btn p-0 border-0 text-secondary hover-danger fw-bold" @click="handleRemoveFeatured(anime.id)">
            X
          </button>
        </div>
      </div>
      
      <small class="text-muted mt-3 d-block">
        <strong>Ejemplos válidos:</strong> 21 (One Piece) • 5114 (FMA) • 11061 (HxH) • 52991 (Frieren)
      </small>
    </div>

    <div class="card border rounded-4 shadow-sm p-4 bg-white">
      <h2 class="fw-bold h4 mb-1 text-dark">Anime de la semana</h2>
      <p class="text-muted small mb-4">Define el MAL ID que aparecerá en la barra lateral del Home.</p>
      
      <div class="input-group mb-3 custom-input-group">
        <input 
          type="text" 
          class="form-control py-2.5 px-3" 
          placeholder="MAL ID semanal (ej. 52991)" 
          v-model="inputWeeklyId"
          @keyup.enter="handleSaveWeekly"
        >
        <button class="btn btn-purple px-4" type="button" @click="handleSaveWeekly">
          Guardar
        </button>
      </div>

      <div class="d-flex justify-content-between align-items-center border rounded-3 p-3 bg-light-subtle">
        <div class="d-flex align-items-center gap-2">
          <span class="text-dark fw-semibold small">Actual: MAL ID {{ weeklyAnime.id }}</span>
          <span class="text-muted small" v-if="weeklyAnime.title">&mdash; {{ weeklyAnime.title }}</span>
        </div>
        <button class="btn p-0 border-0 text-secondary hover-danger fw-bold" @click="weeklyAnime = { id: '', title: 'Ninguno seleccionado' }">
          X
        </button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.btn-purple {
  background-color: #7c4dff;
  color: white;
  font-weight: 600;
  border: none;
  
  &:hover {
    background-color: #635bff;
    color: white;
  }
  
  &:disabled {
    background-color: #e2e8f0;
    color: #949aae;
    cursor: not-allowed;
  }
}

.custom-input-group {
  input {
    border-color: #e2e8f0;
    border-right: none;
    
    &:focus {
      border-color: #a78bfa;
      box-shadow: 0 0 0 0.25rem rgba(124, 77, 255, 0.1);
    }
  }
}

.bg-light-subtle {
  background-color: #f8fafc;
  border-color: #e2e8f0 !important;
}

.hover-danger:hover {
  color: #dc2626 !important;
}

.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
}
</style>