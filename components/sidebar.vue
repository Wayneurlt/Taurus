<template>
  <!-- Mobile menu button -->
  <button
    @click="toggleSidebar"
    class="fixed bottom-4 right-4 z-50 rounded-full bg-green-600 p-4 text-white shadow-lg lg:hidden"
  >
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>

  <!-- Sidebar Navigation -->
  <div
    :class="[
      'fixed inset-y-0 z-40 hidden lg:flex w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
      isSidebarOpen ? 'left-0' : '-left-64 lg:left-0',
    ]"
  >
    <!-- Close button for mobile -->
    <button
      @click="toggleSidebar"
      class="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
    >
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <div class="flex h-16 items-center border-b border-gray-200 px-4">
      <img
        class="ml-3 h-12 w-auto"
        src="/images/b-logo.png"
        alt="Admin Logo"
      />
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto p-4">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100"
        :class="{
          'bg-green-50 text-green-700': $route.path.startsWith(link.to),
        }"
        @click="handleNavigation"
      >
        <component :is="link.icon" class="h-5 w-5" />
        <span class="ml-3">{{ link.name }}</span>
        <span
          v-if="link.count && link.count > 0"
          class="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
        >
          {{ link.count }}
        </span>
      </NuxtLink>
    </nav>

    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center">
        <img
          class="h-9 w-9 rounded-full"
          :src="currentAdmin.avatar || 'https://via.placeholder.com/150'"
          alt="Admin avatar"
        />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ currentAdmin.name }}
          </p>
          <p class="text-xs font-medium text-gray-500">
            {{ currentAdmin.role }}
          </p>
        </div>
      </div>
      <button
        @click="signOut"
        class="mt-4 w-full rounded-md bg-gray-100 py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Sign out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Icons for the sidebar
const HomeIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  `,
};

const ContentIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  `,
};

const AnalyticsIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `,
};

const AdminIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  `,
};

const SettingsIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  `,
};

// Sidebar state
const isSidebarOpen = ref(false);

// Toggle sidebar function
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Handle navigation click
const handleNavigation = () => {
  // On mobile, close the sidebar after navigation
  if (window.innerWidth < 1024) {
    isSidebarOpen.value = false;
  }
};

// Current admin data
const currentAdmin = ref({
  id: 1,
  name: "Admin User",
  email: "admin@halomusic.com",
  role: "Super Admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
});

// Navigation links
const navLinks = ref([
  {
    name: "Dashboard",
    to: "/admin",
    icon: HomeIcon,
  },
  {
    name: "Content",
    to: "/admin/content",
    icon: ContentIcon,
  },
  {
    name: "Analytics",
    to: "/admin/analytics",
    icon: AnalyticsIcon,
  },
  {
    name: "Admin Management",
    to: "/admin/admins",
    icon: AdminIcon,
    count: 2,
  },
  {
    name: "Settings",
    to: "/admin/settings",
    icon: SettingsIcon,
  },
]);

// Sign out method
const signOut = () => {
  navigateTo("/auth/sign-in");
};
</script>

<style scoped>
/* Smooth transitions for the sidebar */
.fixed {
  transition: left 0.3s ease-in-out;
}


</style>
