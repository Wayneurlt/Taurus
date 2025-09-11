<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar Navigation -->
    <Sidebar />

    <!-- Bottom Navigation (Mobile Only) -->
    <BottomNavigation />

    <div class="pl-0 lg:pl-64 pb-16 lg:pb-0">
      <!-- Top Navigation -->
      <div
        class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white"
      >
        <div class="flex flex-1 justify-between px-4">
          <div class="flex flex-1">
            <div class="flex w-full max-w-lg items-center md:ml-0">
              <div class="relative w-full">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
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
                <input
                  v-model="searchQuery"
                  id="search"
                  name="search"
                  class="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Search content..."
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <main class="py-4 sm:py-6">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Content Management</h1>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mobile-stack">
              <button
                @click="openUploadModal('song')"
                type="button"
                class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="-ml-0.5 mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Song
              </button>
              <button
                @click="openUploadModal('album')"
                type="button"
                class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="-ml-0.5 mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Album
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mb-4 sm:mb-6 border-b border-gray-200">
            <nav class="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="activeTab = tab.name"
                :class="[
                  activeTab === tab.name
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-3 sm:py-4 text-sm font-medium flex-shrink-0',
                ]"
              >
                {{ tab.label }}
                <span
                  v-if="tab.count > 0"
                  :class="[
                    activeTab === tab.name
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-900',
                    'ml-2 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block',
                  ]"
                >
                  {{ tab.count }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <div class="mt-2 text-sm text-red-700">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <!-- Content Table -->
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-12">
              <div class="flex items-center space-x-2">
                <svg class="animate-spin h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-gray-500">Loading...</span>
              </div>
            </div>

            <div v-else-if="activeTab === 'songs'">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 mobile-table">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Artist
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Album
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="song in filteredSongs" :key="song.id">
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-10 w-10 flex-shrink-0">
                            <img
                              class="h-10 w-10 rounded"
                              :src="
                                song.cover || 'https://via.placeholder.com/150'
                              "
                              :alt="song.title"
                            />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {{ song.title }}
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ song.genre }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm text-gray-900">
                          {{ song.artist?.name || "Unknown Artist" }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm text-gray-900">
                          {{ song.album?.title || "Single" }}
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ formatDuration(song.duration) }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <span
                          :class="[
                            song.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800',
                            'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-4',
                          ]"
                        >
                          {{ song.status }}
                        </span>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                      >
                        <button
                          @click="editItem(song)"
                          class="text-green-600 hover:text-green-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          @click="confirmDelete(song)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-if="filteredSongs.length === 0"
                class="px-6 py-4 text-center text-gray-500"
              >
                No songs found
              </div>
            </div>

            <div v-if="activeTab === 'albums'">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Cover
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Artist
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Songs
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Release Date
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="album in filteredAlbums" :key="album.id">
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded"
                            :src="
                              album.cover || 'https://via.placeholder.com/150'
                            "
                            :alt="album.title"
                          />
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ album.title }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ album.genre }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm text-gray-900">
                          {{ album.artist }}
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ album.songCount }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ formatDate(album.releaseDate) }}
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                      >
                        <button
                          @click="editItem(album)"
                          class="text-green-600 hover:text-green-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          @click="confirmDelete(album)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-if="filteredAlbums.length === 0"
                class="px-6 py-4 text-center text-gray-500"
              >
                No albums found
              </div>
            </div>

            <div v-if="activeTab === 'playlists'">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Cover
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Songs
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="playlist in filteredPlaylists"
                      :key="playlist.id"
                    >
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded"
                            :src="
                              playlist.cover ||
                              'https://via.placeholder.com/150'
                            "
                            :alt="playlist.title"
                          />
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ playlist.title }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-500 line-clamp-2">
                          {{ playlist.description }}
                        </div>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        {{ playlist.songCount }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <span
                          :class="[
                            playlist.featured
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800',
                            'inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-4',
                          ]"
                        >
                          {{ playlist.featured ? "Featured" : "Standard" }}
                        </span>
                      </td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                      >
                        <button
                          @click="editItem(playlist)"
                          class="text-green-600 hover:text-green-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          @click="confirmDelete(playlist)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                v-if="filteredPlaylists.length === 0"
                class="px-6 py-4 text-center text-gray-500"
              >
                No playlists found
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Upload/Edit Modal -->
      <div v-if="showUploadModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div
          class="flex min-h-screen items-center justify-center px-4 py-4 text-center sm:block sm:p-0"
        >
          <div
            class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:align-middle"
          >
            <div class="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
              <div class="w-full">
                <div class="flex items-center justify-between mb-6">
                  <h3
                    class="text-xl font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {{ modalTitle }}
                  </h3>
                  <button
                    @click="showUploadModal = false"
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div class="space-y-6 max-h-[70vh] overflow-y-auto">
                    <!-- Song Form -->
                    <div v-if="uploadType === 'song'" class="space-y-6">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Song Title</label
                        >
                        <input
                          v-model="newSong.title"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Artist</label
                        >
                        <input
                          v-model="formArtist"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Album</label
                        >
                        <input
                          v-model="newSong.albumName"
                          type="text"
                          placeholder="Single"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Genre</label
                        >
                        <input
                          v-model="newSong.genre"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Duration (seconds)</label
                        >
                        <input
                          v-model="newSong.duration"
                          type="number"
                          min="1"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Status</label
                        >
                        <select
                          v-model="newSong.status"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                        <p class="mt-1 text-xs text-gray-500">Published songs will appear on the client side</p>
                      </div>
                      </div>
                      
                      <!-- Full-width fields -->
                      <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2"
                          >Audio File <span class="text-red-500">*</span></label
                        >
                        <div class="relative">
                          <input
                            type="file"
                            accept="audio/*"
                            @change="handleAudioUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer border border-gray-300 rounded-lg p-2"
                            required
                          />
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Supported formats: MP3, WAV, M4A</p>
                        <!-- Audio Preview -->
                        <div v-if="newSong.audioUrl" class="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p class="text-sm text-gray-600 mb-2">Audio Preview:</p>
                          <audio controls class="w-full">
                            <source :src="newSong.audioUrl" type="audio/wav">
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2"
                          >Cover Image</label
                        >
                        <div class="relative">
                          <input
                            type="file"
                            accept="image/*"
                            @change="handleCoverUpload"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer border border-gray-300 rounded-lg p-2"
                          />
                        </div>
                        <p class="mt-1 text-xs text-gray-500">Recommended: 400x400px, JPG/PNG</p>
                        <!-- Image Preview -->
                        <div v-if="newSong.cover" class="mt-2">
                          <p class="text-sm text-gray-600 mb-2">Image Preview:</p>
                          <img :src="newSong.cover" alt="Cover preview" class="w-20 h-20 object-cover rounded-lg border">
                        </div>
                      </div>
                    </div>
                    <!-- Album Form -->
                    <div v-if="uploadType === 'album'" class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Album Title</label
                        >
                        <input
                          v-model="newAlbum.title"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Genre</label
                        >
                        <input
                          v-model="newAlbum.genre"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <!-- Playlist Form -->
                    <div v-if="uploadType === 'playlist'" class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Playlist Title</label
                        >
                        <input
                          v-model="newPlaylist.title"
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700"
                          >Description</label
                        >
                        <textarea
                          v-model="newPlaylist.description"
                          rows="3"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Common Fields -->
                    <div v-if="uploadType === 'song' || uploadType === 'album'">
                      <label class="block text-sm font-medium text-gray-700"
                        >Artist</label
                      >
                      <input
                        v-model="formArtist"
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div v-if="uploadType !== 'playlist'">
                      <label class="block text-sm font-medium text-gray-700"
                        >Cover Image</label
                      >
                      <input
                        type="file"
                        @change="handleCoverUpload"
                        accept="image/*"
                        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                      />
                    </div>
                    <div v-if="uploadType === 'song'">
                      <label class="block text-sm font-medium text-gray-700"
                        >Audio File</label
                      >
                      <input
                        type="file"
                        @change="handleAudioUpload"
                        accept="audio/*"
                        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8"
            >
              <button
                @click="uploadContent"
                type="button"
                :disabled="loading"
                class="inline-flex w-full justify-center items-center rounded-lg border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Processing...' : (editingItem ? "Save Changes" : "Upload") }}
              </button>
              <button
                @click="showUploadModal = false"
                type="button"
                :disabled="loading"
                class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div
          class="flex min-h-screen items-center justify-center px-4 py-4 text-center sm:block sm:p-0"
        >
          <div
            class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <svg
                    class="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Delete {{ itemToDelete.type }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete "{{
                        itemToDelete.title
                      }}"? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8"
            >
              <button
                @click="deleteItem"
                type="button"
                :disabled="loading"
                class="inline-flex w-full justify-center items-center rounded-lg border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
              >
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ loading ? 'Deleting...' : 'Delete' }}
              </button>
              <button
                @click="showDeleteModal = false"
                type="button"
                :disabled="loading"
                class="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Content data
const songs = ref([]);
const loading = ref(false);
const error = ref(null);

const albums = ref([]);
const playlists = ref([]);

// UI State
const activeTab = ref("songs");
const searchQuery = ref("");
const showUploadModal = ref(false);
const showDeleteModal = ref(false);
const uploadType = ref("song"); // 'song', 'album', or 'playlist'
const itemToDelete = ref({});
const editingItem = ref(null);

// Form data
const newSong = ref({});
const newAlbum = ref({});
const newPlaylist = ref({});

// API Functions
const fetchSongs = async () => {
  try {
    loading.value = true;
    error.value = null;
    console.log('Fetching songs for admin...');
    const response = await $fetch('/api/songs');
    console.log('Admin API Response:', response);
    songs.value = response.songs || [];
    console.log('Admin songs loaded:', songs.value.length);
  } catch (err) {
    console.error('Error fetching songs:', err);
    error.value = 'Failed to fetch songs. Please try again.';
    songs.value = [];
  } finally {
    loading.value = false;
  }
};

const createSong = async (songData) => {
  try {
    const response = await $fetch('/api/songs', {
      method: 'POST',
      body: songData
    });
    return response;
  } catch (err) {
    console.error('Error creating song:', err);
    throw err;
  }
};

const updateSong = async (id, songData) => {
  try {
    const response = await $fetch(`/api/songs/${id}`, {
      method: 'PUT',
      body: songData
    });
    return response;
  } catch (err) {
    console.error('Error updating song:', err);
    throw err;
  }
};

const deleteSong = async (id) => {
  try {
    const response = await $fetch(`/api/songs/${id}`, {
      method: 'DELETE'
    });
    return response;
  } catch (err) {
    console.error('Error deleting song:', err);
    throw err;
  }
};

// Methods
const resetForms = () => {
  newSong.value = {
    title: "",
    artistName: "",
    albumName: "",
    genre: "",
    duration: 180,
    cover: null,
    audioUrl: null,
    audioFile: null, // Store the actual file object
    status: "published", // Default to published
  };
  newAlbum.value = { title: "", artist: "", genre: "", cover: null };
  newPlaylist.value = { title: "", description: "" };
};

// Tabs configuration
const tabs = computed(() => [
  { name: "songs", label: "Songs", count: songs.value.length },
  { name: "albums", label: "Albums", count: albums.value.length },
  { name: "playlists", label: "Playlists", count: playlists.value.length },
]);

// Computed properties for filtering
const filteredSongs = computed(() => {
  if (!searchQuery.value) return songs.value;
  const query = searchQuery.value.toLowerCase();
  return songs.value.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist?.name?.toLowerCase().includes(query) ||
      (song.album && song.album.title?.toLowerCase().includes(query))
  );
});

const filteredAlbums = computed(() => {
  if (!searchQuery.value) return albums.value;
  const query = searchQuery.value.toLowerCase();
  return albums.value.filter(
    (album) =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );
});

const filteredPlaylists = computed(() => {
  if (!searchQuery.value) return playlists.value;
  const query = searchQuery.value.toLowerCase();
  return playlists.value.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(query) ||
      playlist.description.toLowerCase().includes(query)
  );
});

const modalTitle = computed(() => {
  const typeName =
    uploadType.value.charAt(0).toUpperCase() + uploadType.value.slice(1);
  if (editingItem.value) return `Edit ${typeName}`;
  return `Upload New ${typeName}`;
});

const formArtist = computed({
  get() {
    if (uploadType.value === "song") return newSong.value.artistName;
    if (uploadType.value === "album") return newAlbum.value.artist;
    return "";
  },
  set(value) {
    if (uploadType.value === "song") {
      newSong.value.artistName = value;
    } else if (uploadType.value === "album") {
      newAlbum.value.artist = value;
    }
  },
});

// Formatting helpers
const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Modal and form handling
const openUploadModal = (type) => {
  uploadType.value = type;
  editingItem.value = null;
  resetForms();
  showUploadModal.value = true;
};

const handleCoverUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target =
        uploadType.value === "song" ? newSong.value : newAlbum.value;
      if (target) {
        target.cover = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const handleAudioUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a', 'audio/ogg'];
    if (!allowedTypes.includes(file.type)) {
      error.value = 'Please select a valid audio file (MP3, WAV, M4A, OGG)';
      return;
    }
    
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      error.value = 'File size must be less than 50MB';
      return;
    }
    
    // Create a blob URL for the uploaded file
    const blobUrl = URL.createObjectURL(file);
    newSong.value.audioUrl = blobUrl;
    newSong.value.audioFile = file; // Store the file object for later use
    
    // Show success message
    console.log(`✅ File uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(`📁 File type: ${file.type}`);
    console.log(`🔗 Blob URL created: ${blobUrl}`);
    
    // Clear any previous errors
    error.value = null;
  }
};

const uploadContent = async () => {
  try {
    loading.value = true;
    error.value = null;

    if (uploadType.value === "song") {
      // Validate required fields
      if (!newSong.value.title?.trim()) {
        error.value = "Song title is required";
        return;
      }
      if (!newSong.value.artistName?.trim()) {
        error.value = "Artist name is required";
        return;
      }
      if (!newSong.value.audioUrl) {
        error.value = "Audio file is required";
        return;
      }
      if (!newSong.value.duration || newSong.value.duration < 1) {
        error.value = "Duration must be at least 1 second";
        return;
      }

      // Upload audio file if it's a new file
      let audioUrl = newSong.value.audioUrl;
      if (newSong.value.audioFile) {
        console.log('Uploading audio file...');
        const formData = new FormData();
        formData.append('file', newSong.value.audioFile);
        
        const uploadResponse = await $fetch('/api/upload/audio', {
          method: 'POST',
          body: formData
        });
        
        if (uploadResponse.success) {
          audioUrl = uploadResponse.url;
          console.log('✅ Audio uploaded successfully:', uploadResponse.url);
        } else {
          throw new Error('Failed to upload audio file');
        }
      }

      // Prepare song data with the uploaded audio URL
      const songData = {
        ...newSong.value,
        audioUrl: audioUrl
      };

      if (editingItem.value) {
        // Update existing song
        const response = await updateSong(editingItem.value.id, songData);
        if (response.success) {
          // Update local state
          const index = songs.value.findIndex((s) => s.id === editingItem.value.id);
          if (index !== -1) {
            songs.value[index] = response.song;
          }
        }
      } else {
        // Create new song
        const response = await createSong(songData);
        if (response.success) {
          // Add to local state
          songs.value.unshift(response.song);
        }
      }
    } else if (uploadType.value === "album") {
      // Handle album creation/update (mock for now)
      if (editingItem.value) {
        const index = albums.value.findIndex(
          (a) => a.id === editingItem.value.id
        );
        if (index !== -1)
          albums.value[index] = { ...albums.value[index], ...newAlbum.value };
      } else {
        albums.value.push({
          id: Date.now(),
          ...newAlbum.value,
          songCount: 0,
          releaseDate: new Date().toISOString().split("T")[0],
        });
      }
    } else if (uploadType.value === "playlist") {
      // Handle playlist creation/update (mock for now)
      if (editingItem.value) {
        const index = playlists.value.findIndex(
          (p) => p.id === editingItem.value.id
        );
        if (index !== -1)
          playlists.value[index] = {
            ...playlists.value[index],
            ...newPlaylist.value,
          };
      }
    }
    
    showUploadModal.value = false;
    resetForms();
  } catch (err) {
    console.error('Error uploading content:', err);
    error.value = 'Failed to upload content. Please try again.';
  } finally {
    loading.value = false;
  }
};

const editItem = (item) => {
  editingItem.value = { ...item }; // Use a copy to avoid reactive changes before saving
  if ("duration" in item) {
    uploadType.value = "song";
    newSong.value = {
      title: item.title,
      artistName: item.artist?.name || "",
      albumName: item.album?.title || "",
      genre: item.genre || "",
      duration: item.duration || 180,
      cover: item.cover || null,
      audioUrl: item.audioUrl || null,
      audioFile: null, // Will be set when user uploads a new file
      status: item.status || "published",
    };
  } else if ("releaseDate" in item) {
    uploadType.value = "album";
    newAlbum.value = { ...item };
  } else {
    uploadType.value = "playlist";
    newPlaylist.value = { ...item };
  }
  showUploadModal.value = true;
};

const confirmDelete = (item) => {
  let type;
  if ("duration" in item) type = "song";
  else if ("releaseDate" in item) type = "album";
  else type = "playlist";

  itemToDelete.value = { id: item.id, title: item.title, type };
  showDeleteModal.value = true;
};

const deleteItem = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const { id, type } = itemToDelete.value;
    
    if (type === "song") {
      await deleteSong(id);
      // Remove from local state
      songs.value = songs.value.filter((s) => s.id !== id);
    } else if (type === "album") {
      // Handle album deletion (mock for now)
      albums.value = albums.value.filter((a) => a.id !== id);
    } else if (type === "playlist") {
      // Handle playlist deletion (mock for now)
      playlists.value = playlists.value.filter((p) => p.id !== id);
    }
    
    showDeleteModal.value = false;
  } catch (err) {
    console.error('Error deleting item:', err);
    error.value = 'Failed to delete item. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Add keyboard support for modals
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (showUploadModal.value) {
      showUploadModal.value = false;
    }
    if (showDeleteModal.value) {
      showDeleteModal.value = false;
    }
  }
};

// Initialize data on mount
onMounted(() => {
  fetchSongs();
  document.addEventListener('keydown', handleKeydown);
});

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

// Initialize forms on component creation
resetForms();
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;

  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
