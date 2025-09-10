<template>
  <!-- Added transition-colors for smooth theme switching -->
  <div
    class="bg-gray-100 text-black dark:bg-gray-900 dark:text-white min-h-screen pb-20 sm:pb-24 transition-colors duration-300"
  >
    <!-- Navbar -->
    <nav
      class="bg-white text-black dark:bg-gray-800 dark:text-white p-3 sm:p-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <!-- Mobile Layout -->
      <div class="block sm:hidden">
        <!-- Top Row: Logo and Theme Toggle -->
        <div class="flex items-center justify-between mb-3">
          <img src="assets/images/logo.png" alt="Logo" class="h-8 w-auto" />
          <button
            class="hover:text-green-500 transition-colors duration-200"
            @click="toggleTheme"
            aria-label="Toggle dark mode"
          >
            <!-- Moon Icon for Light Mode -->
            <svg
              v-if="theme === 'light'"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <!-- Sun Icon for Dark Mode -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
        
        <!-- Search Bar Row -->
        <div class="relative">
          <input
            type="text"
            placeholder="Search songs, artists..."
            class="w-full bg-gray-200 dark:bg-gray-700 rounded-full py-2.5 px-4 pr-10 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 absolute right-3 top-3 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden sm:flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="assets/images/logo.png" alt="Logo" class="h-12 w-auto" />
      </div>

      <div class="flex-1 max-w-md mx-4">
        <div class="relative">
                    <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            class="w-full bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-4 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute right-3 top-2.5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          class="hover:text-green-500 transition-colors duration-200"
          @click="toggleTheme"
          aria-label="Toggle dark mode"
        >
          <!-- Moon Icon for Light Mode -->
          <svg
            v-if="theme === 'light'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <!-- Sun Icon for Dark Mode -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="p-4 sm:p-6">
      <!-- Featured Charts -->
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Featured Charts</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="playlist in featuredPlaylists"
            :key="playlist.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            @click="viewPlaylist(playlist)"
          >
            <img
              :src="
                playlist.image ||
                'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
              "
              class="w-full aspect-square object-cover rounded mb-2"
              :alt="playlist.title"
            />
            <h3 class="font-medium truncate">{{ playlist.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm truncate">
              {{ playlist.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Trending Now -->
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Trending Now</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p class="mt-2 text-gray-500 dark:text-gray-400">Loading songs...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button @click="fetchSongs" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Try Again
          </button>
        </div>
        
        <!-- Songs Grid -->
        <div v-else-if="trendingSongs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="song in trendingSongs"
            :key="song.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer flex items-center space-x-4"
            @click="playSong(song)"
          >
            <img
              :src="
                song.cover ||
                'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
              "
              class="w-16 h-16 object-cover rounded"
              :alt="song.title"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium truncate">{{ song.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm truncate">
                {{ song.artist?.name || "Unknown Artist" }}
              </p>
            </div>
            <button
              class="text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors duration-200"
              @click.stop="toggleLike(song)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                :class="{ 'text-green-500 fill-current': isLiked(song) }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- No Songs Message -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No songs available at the moment.</p>
        </div>
      </section>
      <!-- Popular Artists -->
       
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Popular Artists</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="artist in popularArtists"
            :key="artist.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer text-center"
            @click="viewArtist(artist)"
          >
            <img
              :src="
                artist.image ||
                'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
              "
              class="w-full aspect-square object-cover rounded-full mb-2 mx-auto"
              :alt="artist.name"
            />
            <h3 class="font-medium truncate">{{ artist.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Artist</p>
          </div>
        </div>
      </section>

      <!-- Search Results -->
      <section v-if="searchQuery">
        <h2 class="text-2xl font-bold mb-4">
          Search Results for "{{ searchQuery }}"
        </h2>

        <!-- Songs -->
        <h3 class="text-xl font-semibold mb-3 mt-6">Songs</h3>
        <div class="space-y-2">
          <div
            v-for="song in filteredSongs"
            :key="song.id"
            class="bg-white dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer flex items-center space-x-4"
            @click="playSong(song)"
          >
            <img
              :src="
                song.cover || song.image ||
                'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
              "
              class="w-12 h-12 object-cover rounded"
              :alt="song.title"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium truncate">{{ song.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm truncate">
                {{ song.artist?.name || "Unknown Artist" }}
              </p>
            </div>
            <span class="text-gray-500 dark:text-gray-400 text-sm">{{
              formatDuration(song.duration)
            }}</span>
          </div>
        </div>

        <!-- Artists -->
        <h3 class="text-xl font-semibold mb-3 mt-6">Artists</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="artist in filteredArtists"
            :key="artist.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer text-center"
            @click="viewArtist(artist)"
          >
            <img
              :src="
                artist.image ||
                'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
              "
              class="w-full aspect-square object-cover rounded-full mb-2 mx-auto"
              :alt="artist.name"
            />
            <h3 class="font-medium truncate">{{ artist.name }}</h3>
          </div>
        </div>
      </section>
    </main>

    <!-- Player Controls -->
    <div
      class="bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-3 sm:p-4 fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <!-- Mobile Layout -->
      <div class="block sm:hidden">
        <!-- Song Info Row -->
        <div class="flex items-center space-x-3 mb-3">
          <img
            :src="
              currentSong?.image ||
              'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
            "
            class="w-10 h-10 rounded flex-shrink-0"
            alt="Song cover"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-medium truncate text-sm">
              {{ currentSong?.title || "Not playing" }}
            </h4>
            <p class="text-gray-500 dark:text-gray-400 text-xs truncate">
              {{ currentSong?.artist || "Select a song" }}
            </p>
          </div>
          <button
            class="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 flex-shrink-0"
            @click="toggleLike(currentSong)"
            v-if="currentSong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="{ 'text-green-500 fill-current': isLiked(currentSong) }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="flex items-center space-x-2 mb-3">
          <span class="text-xs text-gray-500 dark:text-gray-400 w-8">{{
            formatTime(currentTime)
          }}</span>
          <div
            class="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer transition-colors duration-300"
            @click="seek"
          >
            <div
              class="h-full bg-green-500 transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400 w-8">{{
            formatTime(currentSong?.duration || 0)
          }}</span>
        </div>

        <!-- Player Controls -->
        <div class="flex items-center justify-center space-x-6">
          <button
            @click="shuffle"
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            @click="prevSong"
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
              />
            </svg>
          </button>
          <button
            @click="togglePlay"
            class="bg-black text-white dark:bg-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="!isPlaying"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-else
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            @click="nextSong"
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
              />
            </svg>
          </button>
          <button
            @click="toggleRepeat"
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              :class="{ 'text-green-500': repeatMode !== 'none' }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Desktop Layout -->
      <div class="hidden sm:flex items-center justify-between">
        <!-- Song Info -->
        <div class="flex items-center space-x-4 w-1/4">
          <img
            :src="
              currentSong?.image ||
              'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'
            "
            class="w-12 h-12 rounded"
            alt="Song cover"
          />
          <div class="min-w-0">
            <h4 class="font-medium truncate">
              {{ currentSong?.title || "Not playing" }}
            </h4>
            <p class="text-gray-500 dark:text-gray-400 text-sm truncate">
              {{ currentSong?.artist || "Select a song" }}
            </p>
          </div>
          <button
            class="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            @click="toggleLike(currentSong)"
            v-if="currentSong"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              :class="{ 'text-green-500 fill-current': isLiked(currentSong) }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <!-- Player Controls -->
        <div class="flex flex-col items-center w-2/4">
          <div class="flex items-center space-x-6">
            <button
              @click="shuffle"
              class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button
              @click="prevSong"
              class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                />
              </svg>
            </button>
            <button
              @click="togglePlay"
              class="bg-black text-white dark:bg-white dark:text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                v-if="!isPlaying"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                v-else
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              @click="nextSong"
              class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </button>
            <button
              @click="toggleRepeat"
              class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                :class="{ 'text-green-500': repeatMode !== 'none' }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <div class="w-full flex items-center space-x-2 mt-2">
            <span class="text-xs text-gray-500 dark:text-gray-400">{{
              formatTime(currentTime)
            }}</span>
            <div
              class="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer transition-colors duration-300"
              @click="seek"
            >
              <div
                class="h-full bg-green-500 transition-all duration-300"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{
              formatTime(currentSong?.duration || 0)
            }}</span>
          </div>
        </div>

        <!-- Volume Controls -->
        <div class="flex items-center justify-end space-x-4 w-1/4">
          <button
            @click="toggleMute"
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="volume > 0.5 && !isMuted"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072m1.414-8.486a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707-.707L5.586 15z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-else-if="volume > 0 && !isMuted"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707-.707L5.586 15z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-else
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707-.707L5.586 15z"
                clip-rule="evenodd"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model="volume"
            class="w-32 accent-green-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// --- THEME IMPLEMENTATION ---
const theme = ref("dark"); // 'light' or 'dark'

// Check for saved theme preference or system preference
const getInitialTheme = () => {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return "dark"; // Default theme for SSR
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Initialize theme
theme.value = getInitialTheme();

const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
  // Only access localStorage in browser environment
  if (typeof window !== 'undefined') {
  localStorage.setItem("theme", theme.value);
  }
};

// Watch for theme changes and update the document class
watch(
  theme,
  (newTheme) => {
    // Only update document in browser environment
    if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  },
  { immediate: true }
);

// Watch for system theme changes when no preference is set
onMounted(() => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (e) => {
    if (!localStorage.getItem("theme")) {
      theme.value = e.matches ? "dark" : "light";
    }
  };
  mediaQuery.addEventListener("change", handleSystemThemeChange);
});
// --- END THEME IMPLEMENTATION ---

// --- MOCK DATA ---
const featuredPlaylists = ref([
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The most popular songs right now",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
  {
    id: 2,
    title: "R&B Hits",
    description: "The hottest R&B tracks",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
  {
    id: 3,
    title: "Workout Energy",
    description: "Power your workout",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
  {
    id: 4,
    title: "Chill Vibes",
    description: "Relax and unwind",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
  {
    id: 5,
    title: "Party Hits",
    description: "Keep the party going",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
  {
    id: 6,
    title: "Focus Flow",
    description: "Music to concentrate",
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
  },
]);

const trendingSongs = ref([]);
const loading = ref(false);
const error = ref(null);

// API Functions
const fetchSongs = async () => {
  try {
    loading.value = true;
    error.value = null;
    console.log('Fetching songs from API...');
    const response = await $fetch('/api/songs?status=published&limit=20');
    console.log('API Response:', response);
    trendingSongs.value = response.songs || [];
    console.log('Songs loaded:', trendingSongs.value.length);
    console.log('First few songs:', trendingSongs.value.slice(0, 3).map(s => ({ title: s.title, artist: s.artist?.name, audioUrl: s.audioUrl })));
  } catch (err) {
    console.error('Error fetching songs:', err);
    error.value = 'Failed to fetch songs. Please try again later.';
    trendingSongs.value = [];
  } finally {
    loading.value = false;
  }
};

const popularArtists = ref([]);

// Fetch artists from database
const fetchArtists = async () => {
  try {
    const response = await $fetch('/api/artists?limit=6');
    popularArtists.value = response.artists || [];
  } catch (err) {
    console.error('Error fetching artists:', err);
    popularArtists.value = [];
  }
};

const allSongs = computed(() => [...trendingSongs.value]);
const likedSongs = ref(new Set());

// --- PLAYER STATE ---
const currentSong = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const volume = ref(0.7);
const isMuted = ref(false);
const repeatMode = ref("none"); // 'none', 'one', 'all'
const audioElement = ref(null);
const searchQuery = ref("");
let lastVolume = volume.value;
// --- END PLAYER STATE ---

// --- COMPUTED PROPERTIES ---
const filteredSongs = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return allSongs.value.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      (song.artist?.name || "").toLowerCase().includes(query)
  );
});

const filteredArtists = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return popularArtists.value.filter((artist) =>
    artist.name.toLowerCase().includes(query)
  );
});
// --- END COMPUTED PROPERTIES ---

// --- METHODS ---
const playSong = (song) => {
  console.log('Playing song:', song);
  console.log('Audio URL:', song.audioUrl);
  
  if (currentSong.value?.id === song.id) {
    togglePlay();
  } else {
    currentSong.value = song;
    if (audioElement.value) {
      // Stop current audio if playing
      audioElement.value.pause();
      audioElement.value.currentTime = 0;
      
      // Ensure we have a valid audio URL
      let audioUrl = song.audioUrl;
      if (!audioUrl) {
        console.error('No audio URL provided for song:', song.title);
        return;
      }
      
      // Convert relative URLs to absolute URLs if needed
      if (audioUrl.startsWith('/uploads/')) {
        audioUrl = `http://localhost:3001${audioUrl}`;
        console.log('Converted relative URL to absolute:', audioUrl);
      }
      
      // Set new audio source
      audioElement.value.src = audioUrl;
      audioElement.value.load(); // Force reload of the audio element
      
      // Add error event listener for better debugging
      audioElement.value.onerror = (e) => {
        console.error('Audio element error:', e);
        console.error('Failed to load audio from:', audioUrl);
        isPlaying.value = false;
      };
      
      audioElement.value.oncanplay = () => {
        console.log('Audio can play, duration:', audioElement.value.duration);
      };
      
      // Try to play with better error handling
      const playPromise = audioElement.value.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('✅ Audio started playing successfully');
          console.log('Duration:', audioElement.value.duration);
          isPlaying.value = true;
        }).catch((error) => {
          console.error('❌ Error playing audio:', error);
          console.log('Audio URL that failed:', audioUrl);
          isPlaying.value = false;
          
          // Show user-friendly error message
          if (error.name === 'NotAllowedError') {
            console.log('⚠️ User needs to interact with the page first');
          } else if (error.name === 'NotSupportedError') {
            console.log('⚠️ Audio format not supported');
          } else {
            console.log('⚠️ Unknown audio error:', error.message);
          }
        });
      }
    } else {
      console.error('Audio element not initialized');
    }
  }
};

const togglePlay = () => {
  if (!currentSong.value) return;
  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const nextSong = () => {
  if (!currentSong.value) return;
  const currentIndex = allSongs.value.findIndex(
    (s) => s.id === currentSong.value.id
  );
  const nextIndex = (currentIndex + 1) % allSongs.value.length;
  playSong(allSongs.value[nextIndex]);
};

const prevSong = () => {
  if (!currentSong.value) return;
  const currentIndex = allSongs.value.findIndex(
    (s) => s.id === currentSong.value.id
  );
  const prevIndex =
    (currentIndex - 1 + allSongs.value.length) % allSongs.value.length;
  playSong(allSongs.value[prevIndex]);
};

const toggleRepeat = () => {
  const modes = ["none", "all", "one"];
  const currentModeIndex = modes.indexOf(repeatMode.value);
  repeatMode.value = modes[(currentModeIndex + 1) % modes.length];
};

const shuffle = () => {
  alert("Shuffle functionality not implemented yet.");
};

const seek = (event) => {
  if (!audioElement.value || !currentSong.value) return;
  const timeline = event.currentTarget;
  const rect = timeline.getBoundingClientRect();
  const percentage = (event.clientX - rect.left) / rect.width;
  audioElement.value.currentTime = percentage * currentSong.value.duration;
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (isMuted.value) {
    lastVolume = volume.value;
    volume.value = 0;
  } else {
    volume.value = lastVolume > 0 ? lastVolume : 0.5;
  }
};

const toggleLike = (song) => {
  if (!song) return;
  if (likedSongs.value.has(song.id)) {
    likedSongs.value.delete(song.id);
  } else {
    likedSongs.value.add(song.id);
  }
};

const isLiked = (song) => {
  if (!song) return false;
  return likedSongs.value.has(song.id);
};

const handleSearch = () => {
  // Logic handled by computed properties
};

const viewPlaylist = (playlist) => {
  alert(`Viewing playlist: ${playlist.title}`);
};

const viewArtist = (artist) => {
  alert(`Viewing artist: ${artist.name}`);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatDuration = (seconds) => formatTime(seconds);
// --- END METHODS ---

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  // Fetch songs and artists from API
  fetchSongs();
  fetchArtists();
  
  // Initialize audio element
  audioElement.value = new Audio();

  // Set up audio event listeners
  audioElement.value.addEventListener("timeupdate", () => {
    currentTime.value = audioElement.value.currentTime;
    if (currentSong.value) {
      progress.value =
        (audioElement.value.currentTime / currentSong.value.duration) * 100;
    }
  });

  audioElement.value.addEventListener("ended", () => {
    if (repeatMode.value === "one") {
      audioElement.value.currentTime = 0;
      audioElement.value.play();
    } else if (repeatMode.value === "all") {
      nextSong();
    } else {
      isPlaying.value = false;
    }
  });
});

watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
    if (newVolume > 0) {
      isMuted.value = false;
    }
  }
});
</script>
