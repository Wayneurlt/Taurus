<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar Navigation -->
    <Sidebar />
    <div class="pl-64">
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
      <main class="py-6">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mb-6 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">Content Management</h1>
            <div class="flex space-x-3">
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
          <div class="mb-6 border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="activeTab = tab.name"
                :class="[
                  activeTab === tab.name
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
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

          <!-- Content Table -->
          <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div v-if="activeTab === 'songs'">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
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
                          {{ song.artist }}
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="text-sm text-gray-900">
                          {{ song.album || "Single" }}
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
          class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >​</span
          >
          <div
            class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left"
                >
                  <h3
                    class="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {{ modalTitle }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <!-- Song Form -->
                    <div v-if="uploadType === 'song'" class="space-y-4">
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
                          >Album</label
                        >
                        <input
                          v-model="newSong.album"
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
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="uploadContent"
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ editingItem ? "Save Changes" : "Upload" }}
              </button>
              <button
                @click="showUploadModal = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
          class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >​</span
          >
          <div
            class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
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
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="deleteItem"
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete
              </button>
              <button
                @click="showDeleteModal = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
import { ref, computed } from "vue";

// Content data
const songs = ref([
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    duration: 203,
    cover:
      "https://images.unsplash.com/photo-1593693397641-714041a9957d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    status: "published",
    audioUrl: "https://example.com/audio1.mp3",
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    duration: 215,
    cover:
      "https://images.unsplash.com/photo-1593693397641-714041a9957d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    status: "published",
    audioUrl: "https://example.com/audio2.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    genre: "Pop",
    duration: 223,
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    status: "draft",
    audioUrl: "https://example.com/audio3.mp3",
  },
]);

const albums = ref([
  {
    id: 1,
    title: "After Hours",
    artist: "The Weeknd",
    genre: "Pop",
    songCount: 14,
    releaseDate: "2020-03-20",
    cover:
      "https://images.unsplash.com/photo-1593693397641-714041a9957d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    genre: "Pop",
    songCount: 11,
    releaseDate: "2020-03-27",
    cover:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
]);

const playlists = ref([
  {
    id: 1,
    title: "Today's Top Hits",
    description: "The most popular songs right now",
    songCount: 50,
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Chill Vibes",
    description: "Relaxing music for your downtime",
    songCount: 30,
    cover:
      "https://images.unsplash.com/photo-1516223725333-d39e34648725?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    featured: false,
  },
]);

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

// Methods
const resetForms = () => {
  newSong.value = {
    title: "",
    artist: "",
    album: "",
    genre: "",
    cover: null,
    audioUrl: null,
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
      song.artist.toLowerCase().includes(query) ||
      (song.album && song.album.toLowerCase().includes(query))
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
    if (uploadType.value === "song") return newSong.value.artist;
    if (uploadType.value === "album") return newAlbum.value.artist;
    return "";
  },
  set(value) {
    if (uploadType.value === "song") {
      newSong.value.artist = value;
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
    // In a real app, you would upload this and get a URL.
    // For this mock, we'll just store a temporary blob URL.
    newSong.value.audioUrl = URL.createObjectURL(file);
  }
};

const uploadContent = () => {
  if (uploadType.value === "song") {
    if (editingItem.value) {
      const index = songs.value.findIndex((s) => s.id === editingItem.value.id);
      if (index !== -1)
        songs.value[index] = { ...songs.value[index], ...newSong.value };
    } else {
      songs.value.push({
        id: Date.now(),
        ...newSong.value,
        duration: 180,
        status: "draft",
      });
    }
  } else if (uploadType.value === "album") {
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
};

const editItem = (item) => {
  editingItem.value = { ...item }; // Use a copy to avoid reactive changes before saving
  if ("duration" in item) {
    uploadType.value = "song";
    newSong.value = { ...item };
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

const deleteItem = () => {
  const { type, id } = itemToDelete.value;
  if (type === "song") {
    songs.value = songs.value.filter((s) => s.id !== id);
  } else if (type === "album") {
    albums.value = albums.value.filter((a) => a.id !== id);
  } else if (type === "playlist") {
    playlists.value = playlists.value.filter((p) => p.id !== id);
  }
  showDeleteModal.value = false;
};

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
