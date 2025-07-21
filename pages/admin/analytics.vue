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
                  id="analytics-search"
                  name="analytics-search"
                  class="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Search analytics..."
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
          <h1 class="text-2xl font-bold text-gray-900 mb-6">
            Analytics Dashboard
          </h1>

          <!-- Date Range Selector -->
          <div
            class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="mb-4 sm:mb-0">
              <h2 class="text-lg font-medium text-gray-900">
                Platform Performance
              </h2>
              <p class="text-sm text-gray-500">
                Track your streaming metrics and user engagement
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <select
                v-model="timeRange"
                class="rounded-md border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option
                  v-for="range in timeRanges"
                  :key="range.value"
                  :value="range.value"
                >
                  {{ range.label }}
                </option>
              </select>
              <button
                class="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Export
              </button>
            </div>
          </div>

          <!-- Stats Cards -->
          <div
            class="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div class="rounded-lg bg-white p-6 shadow">
              <div class="flex items-center">
                <div class="flex-shrink-0 rounded-md bg-green-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-600"
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
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="truncate text-sm font-medium text-gray-500">
                      Total Streams
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">
                        {{ formatNumber(stats.totalStreams) }}
                      </div>
                      <div
                        class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 flex-shrink-0 self-center"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Increased by</span>
                        {{ stats.streamsGrowth }}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow">
              <div class="flex items-center">
                <div class="flex-shrink-0 rounded-md bg-blue-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="truncate text-sm font-medium text-gray-500">
                      Active Users
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">
                        {{ formatNumber(stats.activeUsers) }}
                      </div>
                      <div
                        class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 flex-shrink-0 self-center"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Increased by</span>
                        {{ stats.usersGrowth }}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow">
              <div class="flex items-center">
                <div class="flex-shrink-0 rounded-md bg-purple-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="truncate text-sm font-medium text-gray-500">
                      Revenue
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">
                        ${{ formatNumber(stats.revenue) }}
                      </div>
                      <div
                        class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 flex-shrink-0 self-center"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Increased by</span>
                        {{ stats.revenueGrowth }}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="rounded-lg bg-white p-6 shadow">
              <div class="flex items-center">
                <div class="flex-shrink-0 rounded-md bg-yellow-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="truncate text-sm font-medium text-gray-500">
                      Avg. Session
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">
                        {{ stats.avgSession }} min
                      </div>
                      <div
                        class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 flex-shrink-0 self-center"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="sr-only">Increased by</span>
                        {{ stats.sessionGrowth }}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Streams Chart -->
            <div class="rounded-lg bg-white p-6 shadow">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">
                  Streams Over Time
                </h3>
                <div class="flex space-x-2">
                  <button
                    v-for="type in streamTypes"
                    :key="type.value"
                    @click="streamType = type.value"
                    :class="[
                      streamType === type.value
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-600 hover:bg-gray-100',
                      'rounded-md px-3 py-1 text-sm font-medium',
                    ]"
                  >
                    {{ type.label }}
                  </button>
                </div>
              </div>
              <div class="h-80">
                <!-- Chart placeholder - replace with actual chart library -->
                <div class="flex h-full items-center justify-center bg-gray-50">
                  <div class="text-center">
                    <p class="text-gray-500">Streams chart will appear here</p>
                    <p class="text-sm text-gray-400">
                      (Using Chart.js or similar)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- User Acquisition -->
            <div class="rounded-lg bg-white p-6 shadow">
              <h3 class="mb-4 text-lg font-medium text-gray-900">
                User Acquisition
              </h3>
              <div class="h-80">
                <!-- Chart placeholder -->
                <div class="flex h-full items-center justify-center bg-gray-50">
                  <div class="text-center">
                    <p class="text-gray-500">
                      User acquisition chart will appear here
                    </p>
                    <p class="text-sm text-gray-400">
                      (Pie/donut chart showing sources)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Content Section -->
          <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <!-- Top Songs -->
            <div class="rounded-lg bg-white shadow">
              <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Top Songs
                </h3>
              </div>
              <div class="px-4 py-5 sm:p-6">
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="(song, index) in topSongs"
                    :key="song.id"
                    class="py-4"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 text-gray-800 font-medium w-8">
                        {{ index + 1 }}
                      </div>
                      <div class="ml-3 flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded"
                          :src="song.cover"
                          :alt="song.title"
                        />
                      </div>
                      <div class="ml-4 min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">
                          {{ song.title }}
                        </p>
                        <p class="truncate text-sm text-gray-500">
                          {{ song.artist }}
                        </p>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <p class="text-sm text-gray-500">
                          {{ formatNumber(song.streams) }} streams
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
                <button
                  class="mt-4 w-full rounded-md bg-gray-50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  View all songs
                </button>
              </div>
            </div>

            <!-- Top Playlists -->
            <div class="rounded-lg bg-white shadow">
              <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Top Playlists
                </h3>
              </div>
              <div class="px-4 py-5 sm:p-6">
                <ul class="divide-y divide-gray-200">
                  <li
                    v-for="(playlist, index) in topPlaylists"
                    :key="playlist.id"
                    class="py-4"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 text-gray-800 font-medium w-8">
                        {{ index + 1 }}
                      </div>
                      <div class="ml-3 flex-shrink-0">
                        <img
                          class="h-10 w-10 rounded"
                          :src="playlist.cover"
                          :alt="playlist.title"
                        />
                      </div>
                      <div class="ml-4 min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">
                          {{ playlist.title }}
                        </p>
                        <p class="truncate text-sm text-gray-500">
                          {{ playlist.followers }} followers
                        </p>
                      </div>
                      <div class="ml-4 flex-shrink-0">
                        <span
                          v-if="playlist.featured"
                          class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800"
                        >
                          Featured
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
                <button
                  class="mt-4 w-full rounded-md bg-gray-50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  View all playlists
                </button>
              </div>
            </div>
          </div>

          <!-- Geographic Data -->
          <div class="mt-6 rounded-lg bg-white shadow">
            <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                Geographic Distribution
              </h3>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="h-96">
                <!-- Map placeholder -->
                <div class="flex h-full items-center justify-center bg-gray-50">
                  <div class="text-center">
                    <p class="text-gray-500">Geographic map will appear here</p>
                    <p class="text-sm text-gray-400">
                      (Using a map library like Leaflet)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Time range options
const timeRanges = ref([
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "12m", label: "Last 12 months" },
]);

const timeRange = ref("30d");

// Stream type options
const streamTypes = ref([
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "free", label: "Free" },
]);

const streamType = ref("all");

// Stats data
const stats = ref({
  totalStreams: 1245327,
  streamsGrowth: 12.5,
  activeUsers: 84321,
  usersGrowth: 8.3,
  revenue: 45289,
  revenueGrowth: 18.7,
  avgSession: 32,
  sessionGrowth: 5.2,
});

// Top content data
const topSongs = ref([
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    streams: 1245327,
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    streams: 987321,
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    streams: 876543,
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    streams: 765432,
    cover: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    streams: 654321,
    cover: "https://via.placeholder.com/150",
  },
]);

const topPlaylists = ref([
  {
    id: 1,
    title: "Today's Top Hits",
    followers: 1245327,
    cover: "https://via.placeholder.com/150",
    featured: true,
  },
  {
    id: 2,
    title: "Chill Vibes",
    followers: 987321,
    cover: "https://via.placeholder.com/150",
    featured: false,
  },
  {
    id: 3,
    title: "Workout Energy",
    followers: 876543,
    cover: "https://via.placeholder.com/150",
    featured: true,
  },
  {
    id: 4,
    title: "R&B Hits",
    followers: 765432,
    cover: "https://via.placeholder.com/150",
    featured: false,
  },
  {
    id: 5,
    title: "Party Hits",
    followers: 654321,
    cover: "https://via.placeholder.com/150",
    featured: false,
  },
]);

// Formatting functions
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// In a real implementation, you would:
// 1. Fetch data based on timeRange selection
// 2. Integrate with charting libraries (Chart.js, ApexCharts, etc.)
// 3. Implement map visualization
// 4. Add loading states
// 5. Add error handling
</script>

<style scoped>
/* Add any custom styles here */
</style>
