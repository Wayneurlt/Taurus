<template>
  <!-- Bottom Navigation Bar (Mobile Only) -->
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden bottom-nav-safe">
    <nav class="flex items-center justify-around px-1 py-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="relative flex flex-col items-center justify-center px-2 py-2 text-xs font-medium transition-all duration-200 rounded-lg min-w-0 flex-1"
        :class="{
          'text-green-600 bg-green-50': $route.path.startsWith(link.to),
          'text-gray-500 hover:text-gray-700 hover:bg-gray-50': !$route.path.startsWith(link.to),
        }"
        @click="handleNavigation"
      >
        <div class="relative">
          <component :is="link.icon" class="h-6 w-6 mb-1" />
          <span
            v-if="link.count && link.count > 0"
            class="absolute -top-2 -right-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white"
          >
            {{ link.count }}
          </span>
        </div>
        <span class="truncate text-center leading-tight">{{ link.name }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// Icons for the bottom navigation
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
    name: "Admins",
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

// Handle navigation click
const handleNavigation = () => {
  // Any additional logic can be added here
};
</script>

<style scoped>
/* Ensure the bottom navigation doesn't interfere with content */
.fixed {
  /* Add safe area padding for devices with home indicators */
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
