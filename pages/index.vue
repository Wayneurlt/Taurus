<template>
  <div class="bg-black text-white min-h-screen pb-24">
    <!-- Navbar -->
    <nav
      class="bg-black text-white p-4 flex items-center justify-between sticky top-0 z-50"
    >
      <div class="flex items-center space-x-4">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg> -->
        <img src="assets/images/logo.png" alt="Logo" class="h-12 w-auto" />
      </div>

      <div class="flex-1 max-w-md mx-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            class="w-full bg-gray-800 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            v-model="searchQuery"
            @input="handleSearch"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
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
        <button class="hover:text-green-500" @click="toggleTheme">
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
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="p-6">
      <!-- Featured Charts -->
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Featured Charts</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="playlist in featuredPlaylists"
            :key="playlist.id"
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            @click="viewPlaylist(playlist)"
          >
            <img
              :src="playlist.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
              class="w-full aspect-square object-cover rounded mb-2"
              :alt="playlist.title"
            />
            <h3 class="font-medium truncate">{{ playlist.title }}</h3>
            <p class="text-gray-400 text-sm truncate">
              {{ playlist.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Trending Now -->
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Trending Now</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="song in trendingSongs"
            :key="song.id"
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer flex items-center space-x-4"
            @click="playSong(song)"
          >
            <img
              :src="song.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
              class="w-16 h-16 object-cover rounded"
              :alt="song.title"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium truncate">{{ song.title }}</h3>
              <p class="text-gray-400 text-sm truncate">{{ song.artist }}</p>
            </div>
            <button
              class="text-gray-400 hover:text-green-500"
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
      </section>

      <!-- Popular Artists -->
      <section class="mb-8" v-if="!searchQuery">
        <h2 class="text-2xl font-bold mb-4">Popular Artists</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="artist in popularArtists"
            :key="artist.id"
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer text-center"
            @click="viewArtist(artist)"
          >
            <img
              :src="artist.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
              class="w-full aspect-square object-cover rounded-full mb-2 mx-auto"
              :alt="artist.name"
            />
            <h3 class="font-medium truncate">{{ artist.name }}</h3>
            <p class="text-gray-400 text-sm">Artist</p>
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
            class="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer flex items-center space-x-4"
            @click="playSong(song)"
          >
            <img
              :src="song.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
              class="w-12 h-12 object-cover rounded"
              :alt="song.title"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium truncate">{{ song.title }}</h3>
              <p class="text-gray-400 text-sm truncate">{{ song.artist }}</p>
            </div>
            <span class="text-gray-400 text-sm">{{
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
            class="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer text-center"
            @click="viewArtist(artist)"
          >
            <img
              :src="artist.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
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
      class="bg-gray-900 text-white p-4 fixed bottom-0 left-0 right-0 border-t border-gray-800"
    >
      <div class="flex items-center justify-between">
        <!-- Song Info -->
        <div class="flex items-center space-x-4 w-1/4">
          <img
            :src="currentSong?.image || 'https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg'"
            class="w-12 h-12 rounded"
            alt="Song cover"
          />
          <div class="min-w-0">
            <h4 class="font-medium truncate">
              {{ currentSong?.title || "Not playing" }}
            </h4>
            <p class="text-gray-400 text-sm truncate">
              {{ currentSong?.artist || "Select a song" }}
            </p>
          </div>
          <button
            class="text-gray-400 hover:text-white"
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
            <button @click="shuffle" class="text-gray-400 hover:text-white">
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
            <button @click="prevSong" class="text-gray-400 hover:text-white">
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
              class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105"
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
            <button @click="nextSong" class="text-gray-400 hover:text-white">
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
              class="text-gray-400 hover:text-white"
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
            <span class="text-xs text-gray-400">{{
              formatTime(currentTime)
            }}</span>
            <div
              class="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
              @click="seek"
            >
              <div
                class="h-full bg-green-500"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{
              formatTime(currentSong?.duration || 0)
            }}</span>
          </div>
        </div>

        <!-- Volume Controls -->
        <div class="flex items-center justify-end space-x-4 w-1/4">
          <button @click="toggleMute" class="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-if="volume > 0.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              v-else-if="volume > 0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clip-rule="evenodd"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
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
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
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
            class="w-24 accent-green-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// Mock data
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

const trendingSongs = ref([
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: 203,
    image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: 215,
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    duration: 223,
    image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    duration: 138,
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    duration: 178,
    image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: 6,
    title: "Montero",
    artist: "Lil Nas X",
    duration: 137,
    image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
]);

const popularArtists = ref([
  { id: 1, name: "The Weeknd", image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg" },
  { id: 2, name: "Dua Lipa", image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg" },
  { id: 3, name: "Justin Bieber", image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg" },
  { id: 4, name: "Olivia Rodrigo", image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg" },
  { id: 5, name: "Lil Nas X", image: "https://images.pexels.com/photos/352505/pexels-photo-352505.jpeg" },
  { id: 6, name: "Doja Cat", image: "https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg" },
]);

// Player state
const currentSong = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const volume = ref(0.7);
const isMuted = ref(false);
const repeatMode = ref("none"); // 'none', 'one', 'all'
const audioElement = ref(null);
const searchQuery = ref("");

// Liked songs
const likedSongs = ref([]);

// Initialize audio element
onMounted(() => {
  audioElement.value = new Audio();
  audioElement.value.volume = volume.value;

  audioElement.value.addEventListener("timeupdate", updateProgress);
  audioElement.value.addEventListener("ended", handleSongEnd);
  audioElement.value.addEventListener("play", () => (isPlaying.value = true));
  audioElement.value.addEventListener("pause", () => (isPlaying.value = false));

  // Load liked songs from localStorage
  const storedLikes = localStorage.getItem("likedSongs");
  if (storedLikes) {
    likedSongs.value = JSON.parse(storedLikes);
  }
});

// Watch for volume changes
watch(volume, (newVolume) => {
  if (audioElement.value) {
    audioElement.value.volume = newVolume;
  }
});

// Player functions
const playSong = (song) => {
  if (!song.audioUrl) return;

  currentSong.value = song;
  if (audioElement.value) {
    audioElement.value.src = song.audioUrl;
    audioElement.value
      .play()
      .then(() => (isPlaying.value = true))
      .catch((err) => console.error("Error playing song:", err));
  }
};

const togglePlay = () => {
  if (!currentSong.value) {
    if (trendingSongs.value.length > 0) {
      playSong(trendingSongs.value[0]);
    }
    return;
  }

  if (isPlaying.value) {
    audioElement.value.pause();
  } else {
    audioElement.value.play();
  }
};

const updateProgress = () => {
  if (audioElement.value) {
    const duration =
      audioElement.value.duration || currentSong.value?.duration || 1;
    currentTime.value = audioElement.value.currentTime;
    progress.value = (audioElement.value.currentTime / duration) * 100;
  }
};

const seek = (e) => {
  if (!audioElement.value || !currentSong.value) return;

  const seekBar = e.currentTarget;
  const clickPosition = e.clientX - seekBar.getBoundingClientRect().left;
  const seekBarWidth = seekBar.clientWidth;
  const seekPercentage = clickPosition / seekBarWidth;
  const seekTime =
    seekPercentage *
    (currentSong.value.duration || audioElement.value.duration);

  audioElement.value.currentTime = seekTime;
};

const nextSong = () => {
  if (!currentSong.value) return;

  const currentIndex = trendingSongs.value.findIndex(
    (s) => s.id === currentSong.value.id
  );
  const nextIndex = (currentIndex + 1) % trendingSongs.value.length;
  playSong(trendingSongs.value[nextIndex]);
};

const prevSong = () => {
  if (!currentSong.value) return;

  const currentIndex = trendingSongs.value.findIndex(
    (s) => s.id === currentSong.value.id
  );
  const prevIndex =
    (currentIndex - 1 + trendingSongs.value.length) %
    trendingSongs.value.length;
  playSong(trendingSongs.value[prevIndex]);
};

const handleSongEnd = () => {
  if (repeatMode.value === "one") {
    audioElement.value.currentTime = 0;
    audioElement.value.play();
  } else {
    nextSong();
  }
};

const toggleRepeat = () => {
  const modes = ["none", "one", "all"];
  const currentIndex = modes.indexOf(repeatMode.value);
  repeatMode.value = modes[(currentIndex + 1) % modes.length];
};

const shuffle = () => {
  const randomIndex = Math.floor(Math.random() * trendingSongs.value.length);
  playSong(trendingSongs.value[randomIndex]);
};

const toggleMute = () => {
  if (audioElement.value) {
    isMuted.value = !isMuted.value;
    audioElement.value.muted = isMuted.value;
  }
};

// Like functionality
const toggleLike = (song) => {
  if (!song) return;

  const index = likedSongs.value.findIndex((s) => s.id === song.id);
  if (index === -1) {
    likedSongs.value.push(song);
  } else {
    likedSongs.value.splice(index, 1);
  }

  // Save to localStorage
  localStorage.setItem("likedSongs", JSON.stringify(likedSongs.value));
};

const isLiked = (song) => {
  return song && likedSongs.value.some((s) => s.id === song.id);
};

// Search functionality
const handleSearch = () => {
  // Implemented through computed properties
};

const filteredSongs = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return trendingSongs.value.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );
});

const filteredArtists = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase();
  return popularArtists.value.filter((artist) =>
    artist.name.toLowerCase().includes(query)
  );
});

// Utility functions
const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatDuration = (seconds) => {
  return formatTime(seconds);
};

const viewPlaylist = (playlist) => {
  // In a full app, this would navigate to a playlist page
  console.log("Viewing playlist:", playlist.title);
};

const viewArtist = (artist) => {
  // In a full app, this would navigate to an artist page
  console.log("Viewing artist:", artist.name);
};

const toggleTheme = () => {
  // Simple theme toggle - in a real app you might use a proper dark/light mode solution
  document.documentElement.classList.toggle("dark");
};
</script>
