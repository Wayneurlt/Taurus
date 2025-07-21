<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar Navigation -->
    <Sidebar />

    <!-- Main Content -->
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
                  id="search"
                  name="search"
                  class="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main class="py-6">
        <div class="px-4 sm:px-6 lg:px-8">
          <!-- Dashboard Overview -->
          <div class="space-y-6">
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            <!-- Stats -->
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                        Total Songs
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ stats.totalSongs }}
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
                          {{ stats.songsGrowth }}%
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
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">
                        Total Playlists
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ stats.totalPlaylists }}
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
                          {{ stats.playlistsGrowth }}%
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">
                        Daily Active Users
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ stats.dailyUsers }}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="truncate text-sm font-medium text-gray-500">
                        Total Revenue
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          ${{ stats.totalRevenue }}
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
            </div>

            <!-- Recent Activity -->
            <div class="rounded-lg bg-white p-6 shadow">
              <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
              <div class="mt-4 flow-root">
                <ul class="-mb-8">
                  <li
                    v-for="(activity, idx) in recentActivities"
                    :key="activity.id"
                  >
                    <div class="relative pb-8">
                      <span
                        v-if="idx !== recentActivities.length - 1"
                        class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      ></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span
                            :class="[
                              activity.iconBackground,
                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                            ]"
                          >
                            <component
                              :is="activity.icon"
                              class="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div
                          class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                        >
                          <div>
                            <p class="text-sm text-gray-500">
                              {{ activity.content }}
                              <span class="font-medium text-gray-900">{{
                                activity.target
                              }}</span>
                            </p>
                          </div>
                          <div
                            class="whitespace-nowrap text-right text-sm text-gray-500"
                          >
                            <time :datetime="activity.datetime">{{
                              activity.date
                            }}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
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

// Current admin data
const currentAdmin = ref({
  id: 1,
  name: "Admin User",
  email: "admin@halomusic.com",
  role: "Super Admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  lastActive: new Date().toISOString(),
});

// Stats data
const stats = ref({
  totalSongs: 2453,
  songsGrowth: 12.5,
  totalPlaylists: 342,
  playlistsGrowth: 8.2,
  dailyUsers: 5842,
  usersGrowth: 5.3,
  totalRevenue: 12543,
  revenueGrowth: 18.7,
});

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    content: "Added",
    target: "New Album - Midnight Memories",
    // icon: PlusIcon,
    iconBackground: "bg-green-500",
    datetime: "2023-07-11T11:00",
    date: "1h ago",
  },
  {
    id: 2,
    content: "Approved",
    target: "New Admin - Jane Smith",
    // icon: CheckCircleIcon,
    iconBackground: "bg-blue-500",
    datetime: "2023-07-11T10:30",
    date: "1h ago",
  },
  {
    id: 3,
    content: "Rejected",
    target: "Song Upload - Explicit Content",
    // icon: XCircleIcon,
    iconBackground: "bg-red-500",
    datetime: "2023-07-11T09:30",
    date: "2h ago",
  },
  {
    id: 4,
    content: "Updated",
    target: "Featured Playlist - Summer Hits",
    // icon: ArrowPathIcon,
    iconBackground: "bg-yellow-500",
    datetime: "2023-07-10T14:30",
    date: "Yesterday",
  },
  {
    id: 5,
    content: "Created",
    target: "New Chart - Top 100 Global",
    // icon: PlusIcon,
    iconBackground: "bg-green-500",
    datetime: "2023-07-10T11:00",
    date: "Yesterday",
  },
]);

// Computed properties
const pendingAdminCount = computed(() => pendingAdmins.value.length);

// Methods
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const signOut = () => {
  // In a real app, this would call your auth service
  navigateTo("/auth/sign-in");
};
</script>
