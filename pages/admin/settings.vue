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
        <div
          class="flex flex-1 items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <h1 class="text-xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <!-- Main Content -->
      <main class="py-4 sm:py-6">
        <div class="px-4 sm:px-6 lg:px-8">
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
              </button>
            </nav>
          </div>

          <!-- Profile Settings -->
          <div v-if="activeTab === 'profile'">
            <div class="space-y-4 sm:space-y-6">
              <!-- Personal Information Card -->
              <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Update your photo and personal details.
                  </p>
                </div>
                <div class="px-4 py-5 sm:p-6">
                  <div class="space-y-6">
                    <!-- Profile Photo -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Photo</label
                      >
                      <div class="mt-2 flex items-center space-x-4">
                        <img
                          class="h-16 w-16 rounded-full"
                          :src="settings.profile.avatar"
                          alt="Current avatar"
                        />
                        <button
                          type="button"
                          class="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    <!-- Name -->
                    <div>
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Full Name</label
                      >
                      <input
                        v-model="settings.profile.name"
                        type="text"
                        id="name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <!-- Email (Read-only) -->
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email Address</label
                      >
                      <input
                        :value="settings.profile.email"
                        type="email"
                        id="email"
                        class="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-50 text-gray-500 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm"
                        disabled
                      />
                    </div>
                    <!-- Bio -->
                    <div>
                      <label
                        for="bio"
                        class="block text-sm font-medium text-gray-700"
                        >Bio</label
                      >
                      <textarea
                        v-model="settings.profile.bio"
                        id="bio"
                        rows="4"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Tell us a little about yourself..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    @click="saveProfile"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Notifications Settings -->
          <div v-if="activeTab === 'notifications'">
            <div class="overflow-hidden rounded-lg bg-white shadow">
              <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Choose how you want to be notified.
                </p>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="px-4 py-5 sm:p-6">
                  <h4 class="text-base font-medium text-gray-900">By Email</h4>
                  <div class="mt-4 space-y-4">
                    <div
                      v-for="item in settings.notifications.email"
                      :key="item.id"
                      class="flex items-start"
                    >
                      <div class="flex h-5 items-center">
                        <input
                          :id="item.id"
                          v-model="item.enabled"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          :for="item.id"
                          class="font-medium text-gray-700"
                          >{{ item.label }}</label
                        >
                        <p class="text-gray-500">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-5 sm:p-6">
                  <h4 class="text-base font-medium text-gray-900">
                    Push Notifications
                  </h4>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex h-5 items-center">
                        <input
                          id="push-everything"
                          v-model="settings.notifications.push.all"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="push-everything"
                          class="font-medium text-gray-700"
                          >Everything</label
                        >
                        <p class="text-gray-500">
                          Receive push notifications for all activity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  @click="saveNotifications"
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'">
            <div class="space-y-6">
              <!-- Change Password Card -->
              <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Change Password
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Choose a new, strong password.
                  </p>
                </div>
                <div class="px-4 py-5 sm:p-6">
                  <div class="space-y-6">
                    <div>
                      <label
                        for="current-password"
                        class="block text-sm font-medium text-gray-700"
                        >Current Password</label
                      >
                      <input
                        type="password"
                        id="current-password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        for="new-password"
                        class="block text-sm font-medium text-gray-700"
                        >New Password</label
                      >
                      <input
                        type="password"
                        id="new-password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        for="confirm-password"
                        class="block text-sm font-medium text-gray-700"
                        >Confirm New Password</label
                      >
                      <input
                        type="password"
                        id="confirm-password"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    @click="saveSecurity"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Update Password
                  </button>
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
import { ref } from "vue";

// Active Tab
const activeTab = ref("profile");

// Tabs definition
const tabs = ref([
  { name: "profile", label: "Profile" },
  { name: "notifications", label: "Notifications" },
  { name: "security", label: "Security" },
 
]);

// Mocked user settings data
const settings = ref({
  profile: {
    name: "Catherine Foster",
    email: "catherine.foster@example.com",
    avatar:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    bio: "Music enthusiast and platform super admin. Lover of indie rock and classical fusion.",
  },
  notifications: {
    email: [
      {
        id: "email-comments",
        label: "New Comments",
        description:
          "Get notified when someone posts a comment on your content.",
        enabled: true,
      },
      {
        id: "email-mentions",
        label: "Mentions",
        description: "Get notified when another user mentions you.",
        enabled: true,
      },
      {
        id: "email-digest",
        label: "Weekly Digest",
        description: "A weekly roundup of the top new music.",
        enabled: false,
      },
    ],
    push: {
      all: false,
    },
  },
  security: {
    twoFactorEnabled: true,
  },
  appearance: {
    theme: "system", // 'light', 'dark', 'system'
  },
});

// Appearance Themes
const themes = ref([
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
]);

// Action Handlers
const saveProfile = () => {
  console.log("Saving profile settings...", settings.value.profile);
  // In a real app, you would make an API call here.
  alert("Profile settings saved! Check the console for the data.");
};

const saveNotifications = () => {
  console.log("Saving notification settings...", settings.value.notifications);
  alert("Notification preferences saved! Check the console for the data.");
};

const saveSecurity = () => {
  // Note: Password logic is for UI demonstration only.
  console.log("Saving security settings...");
  alert("Password updated (for demo purposes)!");
};

const saveAppearance = () => {
  console.log("Saving appearance settings...", settings.value.appearance);
  alert(`Appearance set to ${settings.value.appearance.theme}.`);
};
</script>
