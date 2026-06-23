import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const users = ref([
        {
            name: 'Sora Tanaka',
            email: 'user@otakuhub.dev',
            password: 'user1234',
            role: 'customer',
            avatar: '',
            isBlocked: false // 🔥 Grabado a fuego: Estado por defecto
        },
        {
            name: 'Admin Hub',
            email: 'admin@otakuhub.dev',
            password: 'admin123',
            role: 'admin',
            avatar: '',
            isBlocked: false // 🔥 Los admins no suelen empezar bloqueados
        },
    ])

    const currentUser = ref(null)
    
    // Nuevo: Estado de favoritos
    const favorites = ref([])

    // Cargar favoritos desde localStorage al iniciar
    const loadFavorites = () => {
        const saved = localStorage.getItem('userFavorites')
        if (saved) {
            favorites.value = JSON.parse(saved)
        }
    }

    // Guardar favoritos en localStorage
    const saveFavorites = () => {
        localStorage.setItem('userFavorites', JSON.stringify(favorites.value))
    }

    function login(email, password) {
        const foundUser = users.value.find((user) => {
            return user.email === email && user.password === password
        })

        if (!foundUser) {
            return false
        }

        // 🧪 TEST DE BLOQUEO: Si está bloqueado, rechazamos el login de inmediato
        if (foundUser.isBlocked) {
            alert('Esta cuenta ha sido bloqueada por el administrador.')
            return false
        }

        currentUser.value = {
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            avatar: foundUser.avatar,
            isAuthenticated: true,
        }
        
        // Cargar favoritos al iniciar sesión
        loadFavorites()

        return currentUser.value
    }

    function register(name, email, password) {
        const userExists = users.value.some((user) => {
            return user.email === email
        })

        if (userExists) {
            return false
        }

        const newUser = {
            name,
            email,
            password,
            role: 'customer',
            avatar: '',
            isBlocked: false // 🔥 Aseguramos que los nuevos registros empiecen activos
        }

        users.value.push(newUser)

        currentUser.value = {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
            isAuthenticated: true,
        }
        
        // Inicializar favoritos vacíos para nuevo usuario
        favorites.value = []
        saveFavorites()

        return currentUser.value
    }

    function updateProfile(newName, newPassword, newAvatar) {
        if (!currentUser.value) return

        const userInList = users.value.find(u => u.email === currentUser.value.email)
        
        if (userInList) {
            if (newName) userInList.name = newName
            if (newPassword) userInList.password = newPassword
            if (newAvatar) userInList.avatar = newAvatar

            currentUser.value.name = userInList.name
            currentUser.value.avatar = userInList.avatar
        }
    }

    // 🔥 NUEVA ACCIÓN PARA EL ADMIN: Bloquear / Desbloquear
    function toggleBlockUser(userIdOrEmail) {
        // Buscamos por email o name ya que tus usuarios estáticos no tienen ID propio aún
        const userInList = users.value.find(u => u.email === userIdOrEmail)
        if (userInList) {
            userInList.isBlocked = !userInList.isBlocked
        }
    }

    // Añadimos toggleBlockUser al return final
    return { users, currentUser, login, register, updateProfile, toggleBlockUser }
    // Nuevas funciones para favoritos
    
    // Añadir un favorito
    function addFavorite(animeData) {
        // Verificar si ya existe
        const exists = favorites.value.find(fav => fav.mal_id === animeData.mal_id)
        if (exists) {
            return { success: false, message: 'Este anime ya está en tus favoritos' }
        }
        
        favorites.value.push({
            id: Date.now(),
            mal_id: animeData.mal_id,
            title: animeData.title,
            content: animeData.synopsis || animeData.content || 'Sin descripción disponible.',
            image_url: animeData.images?.jpg?.image_url || animeData.image_url || '',
            score: animeData.score || 0,
            rating: animeData.rating || 0,
            editing: false
        })
        
        saveFavorites()
        return { success: true, message: 'Añadido a favoritos correctamente' }
    }

    // Eliminar un favorito
    function removeFavorite(id) {
        favorites.value = favorites.value.filter(fav => fav.id !== id)
        saveFavorites()
    }

    // Actualizar un favorito
    function updateFavorite(id, data) {
        const index = favorites.value.findIndex(fav => fav.id === id)
        if (index !== -1) {
            favorites.value[index] = { ...favorites.value[index], ...data }
            saveFavorites()
        }
    }

    // Verificar si un anime está en favoritos
    function isFavorite(malId) {
        return favorites.value.some(fav => fav.mal_id === malId)
    }

    // Cargar favoritos al inicializar el store
    loadFavorites()

    return { 
        users, 
        currentUser, 
        favorites,
        login, 
        register, 
        updateProfile,
        addFavorite,
        removeFavorite,
        updateFavorite,
        isFavorite
    }
})