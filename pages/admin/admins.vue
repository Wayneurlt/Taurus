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
                  id="admin-search"
                  name="admin-search"
                  class="block w-full rounded-md border-0 bg-white py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  placeholder="Search admins by name, email, or role..."
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
            <h1 class="text-2xl font-bold text-gray-900">Admin Management</h1>
            <button
              @click="openInviteModal"
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Invite Admin
            </button>
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

          <!-- Pending Approvals -->
          <div v-if="activeTab === 'pending'" class="mb-8">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">
                Pending Admin Approvals
              </h2>
              <p v-if="pendingAdmins.length > 0" class="text-sm text-gray-500">
                {{ pendingAdmins.length }} requests awaiting review
              </p>
            </div>

            <div
              v-if="pendingAdmins.length === 0"
              class="rounded-lg bg-white p-8 text-center shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">
                No pending approvals
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                All admin requests have been processed.
              </p>
            </div>

            <ul
              v-else
              class="divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <li
                v-for="admin in pendingAdmins"
                :key="admin.id"
                class="px-6 py-4"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="admin.avatar"
                      :alt="admin.name"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ admin.name }}
                      </div>
                      <div class="text-sm text-gray-500">{{ admin.email }}</div>
                      <div class="text-xs text-gray-400">
                        Requested {{ formatDate(admin.requestedAt) }}
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="approveAdmin(admin.id)"
                      class="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100"
                    >
                      Approve
                    </button>
                    <button
                      @click="rejectAdmin(admin.id)"
                      class="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- Current Admins -->
          <div v-if="activeTab === 'current'">
            <div class="mb-4 flex items-center justify-between">
              <h2 class="text-lg font-medium text-gray-900">Current Admins</h2>
              <p class="text-sm text-gray-500">
                {{ filteredAdmins.length }} active administrators
              </p>
            </div>

            <div class="overflow-hidden rounded-lg bg-white shadow">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Last Active
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="admin in filteredAdmins" :key="admin.id">
                    <td class="whitespace-nowrap px-6 py-4">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img
                            class="h-10 w-10 rounded-full"
                            :src="admin.avatar"
                            :alt="admin.name"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ admin.name }}
                          </div>
                          <div
                            v-if="admin.id === currentUser.id"
                            class="text-xs text-gray-500"
                          >
                            (You)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                      {{ admin.email }}
                    </td>
                    <td class="whitespace-nowrap px-6 py-4">
                      <span
                        :class="[
                          roleClasses[admin.role],
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        ]"
                      >
                        {{ admin.role }}
                      </span>
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                      {{ formatDate(admin.lastActive) }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
                    >
                      <button
                        v-if="
                          currentUser.role === 'Super Admin' &&
                          admin.id !== currentUser.id
                        "
                        @click="openEditModal(admin)"
                        class="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        v-if="
                          currentUser.role === 'Super Admin' &&
                          admin.id !== currentUser.id
                        "
                        @click="confirmRemoveAdmin(admin)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredAdmins.length === 0">
                    <td
                      colspan="5"
                      class="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      No administrators found matching your search.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Activity Log -->
          <div v-if="activeTab === 'activity'">
            <div class="mb-4">
              <h2 class="text-lg font-medium text-gray-900">
                Admin Activity Log
              </h2>
            </div>
            <div class="rounded-lg bg-white shadow">
              <ul role="list" class="divide-y divide-gray-200">
                <li
                  v-for="activity in adminActivities"
                  :key="activity.id"
                  class="px-4 py-4 sm:px-6"
                >
                  <div class="flex items-start">
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="activity.admin.avatar"
                      :alt="activity.admin.name"
                    />
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">
                          {{ activity.admin.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ formatDateTime(activity.timestamp) }}
                        </p>
                      </div>
                      <p class="text-sm text-gray-600">{{ activity.action }}</p>
                      <p
                        v-if="activity.details"
                        class="mt-1 text-xs text-gray-500"
                      >
                        {{ activity.details }}
                      </p>
                    </div>
                  </div>
                </li>
                <li
                  v-if="adminActivities.length > 3"
                  class="px-4 py-3 text-center sm:px-6"
                >
                  <button
                    class="w-full rounded-md bg-gray-50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Load More Activity
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <!-- Invite Admin Modal -->
      <div v-if="showInviteModal" class="fixed inset-0 z-50 overflow-y-auto">
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
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                >
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div
                  class="mt-3 flex-1 text-center sm:mt-0 sm:ml-4 sm:text-left"
                >
                  <h3
                    class="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title-invite"
                  >
                    Invite New Admin
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email Address</label
                      >
                      <input
                        v-model="inviteEmail"
                        type="email"
                        id="email"
                        name="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="admin@example.com"
                      />
                    </div>
                    <div>
                      <label
                        for="role"
                        class="block text-sm font-medium text-gray-700"
                        >Role</label
                      >
                      <select
                        v-model="inviteRole"
                        id="role"
                        name="role"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      >
                        <option>Content Admin</option>
                        <option>Analytics Admin</option>
                        <option v-if="currentUser.role === 'Super Admin'">
                          Super Admin
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="message"
                        class="block text-sm font-medium text-gray-700"
                        >Custom Message (Optional)</label
                      >
                      <textarea
                        v-model="inviteMessage"
                        id="message"
                        name="message"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Add a personal message..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="sendInvite"
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Send Invitation
              </button>
              <button
                @click="showInviteModal = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Admin Modal -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
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
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                >
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div
                  class="mt-3 flex-1 text-center sm:mt-0 sm:ml-4 sm:text-left"
                >
                  <h3
                    class="text-lg font-medium leading-6 text-gray-900"
                    id="modal-title-edit"
                  >
                    Edit Admin Permissions
                  </h3>
                  <div v-if="editingAdmin" class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="editingAdmin.avatar"
                        :alt="editingAdmin.name"
                      />
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ editingAdmin.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ editingAdmin.email }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label
                        for="edit-role"
                        class="block text-sm font-medium text-gray-700"
                        >Role</label
                      >
                      <select
                        v-model="editingAdmin.role"
                        id="edit-role"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      >
                        <option>Content Admin</option>
                        <option>Analytics Admin</option>
                        <option v-if="currentUser.role === 'Super Admin'">
                          Super Admin
                        </option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Permissions</label
                      >
                      <div class="mt-2 space-y-2">
                        <div
                          v-for="permission in permissions"
                          :key="permission.id"
                          class="flex items-start"
                        >
                          <div class="flex h-5 items-center">
                            <input
                              :id="`permission-${permission.id}`"
                              v-model="editingAdmin.permissions"
                              :value="permission.id"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label
                              :for="`permission-${permission.id}`"
                              class="font-medium text-gray-700"
                              >{{ permission.name }}</label
                            >
                            <p class="text-gray-500">
                              {{ permission.description }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="saveAdminChanges"
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Changes
              </button>
              <button
                @click="showEditModal = false"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Remove Admin Confirmation -->
      <div v-if="showRemoveModal" class="fixed inset-0 z-50 overflow-y-auto">
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
                    id="modal-title-remove"
                  >
                    Remove Admin
                  </h3>
                  <div class="mt-2">
                    <p v-if="adminToRemove" class="text-sm text-gray-500">
                      Are you sure you want to remove
                      <span class="font-medium">{{ adminToRemove.name }}</span>
                      as an admin? They will lose all admin privileges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <button
                @click="removeAdmin"
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Remove
              </button>
              <button
                @click="showRemoveModal = false"
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

// Current user data
const currentUser = ref({
  id: 1,
  name: "You",
  email: "admin@halomusic.com",
  role: "Super Admin",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  lastActive: new Date().toISOString(),
});

// Tab State
const activeTab = ref("pending");

// Admin data
const pendingAdmins = ref([
  {
    id: 101,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    requestedAt: "2023-07-09T14:48:00.000Z",
  },
  {
    id: 102,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    requestedAt: "2023-07-10T09:32:00.000Z",
  },
]);

const currentAdmins = ref([
  {
    id: 1,
    name: "You",
    email: "admin@halomusic.com",
    role: "Super Admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastActive: new Date().toISOString(),
    permissions: ["content", "users", "settings", "analytics"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@halomusic.com",
    role: "Content Admin",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastActive: "2023-07-10T16:45:00.000Z",
    permissions: ["content"],
  },
  {
    id: 3,
    name: "John Doe",
    email: "john.doe@halomusic.com",
    role: "Analytics Admin",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastActive: "2023-07-11T08:30:00.000Z",
    permissions: ["analytics"],
  },
]);

const adminActivities = ref([
  {
    id: 3,
    admin: {
      id: 3,
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Exported analytics report",
    details: "Generated monthly streaming report",
    timestamp: "2023-07-11T08:30:00.000Z",
  },
  {
    id: 2,
    admin: {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Updated music content",
    details: "Added 5 new songs to the platform",
    timestamp: "2023-07-10T16:45:00.000Z",
  },
  {
    id: 1,
    admin: {
      id: 1,
      name: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    action: "Approved new admin: John Doe",
    details: "Granted Analytics Admin role",
    timestamp: "2023-07-10T14:30:00.000Z",
  },
]);

const tabs = computed(() => [
  {
    name: "pending",
    label: "Pending Approvals",
    count: pendingAdmins.value.length,
  },
  {
    name: "current",
    label: "Current Admins",
    count: currentAdmins.value.length,
  },
  { name: "activity", label: "Activity Log", count: 0 }, // No count needed for activity
]);

// Search
const searchQuery = ref("");
const filteredAdmins = computed(() => {
  if (!searchQuery.value) return currentAdmins.value;
  const query = searchQuery.value.toLowerCase();
  return currentAdmins.value.filter(
    (admin) =>
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query)
  );
});

// Permissions and Role styling
const permissions = ref([
  {
    id: "content",
    name: "Content Management",
    description: "Manage songs, albums, and playlists",
  },
  {
    id: "users",
    name: "User Management",
    description: "View and manage users",
  },
  {
    id: "analytics",
    name: "Analytics Access",
    description: "View platform analytics",
  },
  {
    id: "settings",
    name: "Platform Settings",
    description: "Modify platform settings",
  },
]);

const roleClasses = {
  "Super Admin": "bg-purple-100 text-purple-800",
  "Content Admin": "bg-green-100 text-green-800",
  "Analytics Admin": "bg-blue-100 text-blue-800",
};

// Modal states
const showInviteModal = ref(false);
const showEditModal = ref(false);
const showRemoveModal = ref(false);

// Form data
const inviteEmail = ref("");
const inviteRole = ref("Content Admin");
const inviteMessage = ref("");
const editingAdmin = ref(null);
const adminToRemove = ref(null);

// Formatting functions
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const formatDateTime = (dateString) =>
  new Date(dateString).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

// Activity Log Helper
const addActivityLog = (action, details = "") => {
  adminActivities.value.unshift({
    id: Date.now(),
    admin: { ...currentUser.value },
    action,
    details,
    timestamp: new Date().toISOString(),
  });
};

// Modal handlers
const openInviteModal = () => {
  inviteEmail.value = "";
  inviteRole.value = "Content Admin";
  inviteMessage.value = "";
  showInviteModal.value = true;
};

const openEditModal = (admin) => {
  editingAdmin.value = JSON.parse(JSON.stringify(admin)); // Deep copy to avoid live updates
  showEditModal.value = true;
};

const confirmRemoveAdmin = (admin) => {
  adminToRemove.value = admin;
  showRemoveModal.value = true;
};

// Action handlers
const sendInvite = () => {
  if (!inviteEmail.value) return; // Basic validation
  pendingAdmins.value.push({
    id: Date.now(),
    name: inviteEmail.value.split("@")[0],
    email: inviteEmail.value,
    avatar: "https://www.gravatar.com/avatar/?d=mp", // Generic avatar
    requestedAt: new Date().toISOString(),
  });
  addActivityLog(
    "Sent admin invitation",
    `Invited ${inviteEmail.value} as a ${inviteRole.value}.`
  );
  showInviteModal.value = false;
};

const approveAdmin = (id) => {
  const index = pendingAdmins.value.findIndex((a) => a.id === id);
  if (index !== -1) {
    const [approvedAdmin] = pendingAdmins.value.splice(index, 1);
    currentAdmins.value.push({
      ...approvedAdmin,
      role: "Content Admin", // Default role for approved admins
      lastActive: new Date().toISOString(),
      permissions: ["content"],
    });
    addActivityLog(
      "Approved admin request",
      `Approved ${approvedAdmin.name} as a new admin.`
    );
  }
};

const rejectAdmin = (id) => {
  const index = pendingAdmins.value.findIndex((a) => a.id === id);
  if (index !== -1) {
    const [rejectedAdmin] = pendingAdmins.value.splice(index, 1);
    addActivityLog(
      "Rejected admin request",
      `Rejected the request from ${rejectedAdmin.name}.`
    );
  }
};

const saveAdminChanges = () => {
  if (!editingAdmin.value) return;
  const index = currentAdmins.value.findIndex(
    (a) => a.id === editingAdmin.value.id
  );
  if (index !== -1) {
    currentAdmins.value[index] = editingAdmin.value;
    addActivityLog(
      "Updated admin permissions",
      `Updated role and permissions for ${editingAdmin.value.name}.`
    );
  }
  showEditModal.value = false;
  editingAdmin.value = null;
};

const removeAdmin = () => {
  if (!adminToRemove.value) return;
  const adminName = adminToRemove.value.name;
  currentAdmins.value = currentAdmins.value.filter(
    (a) => a.id !== adminToRemove.value.id
  );
  addActivityLog("Removed admin", `Removed ${adminName} from the admin list.`);
  showRemoveModal.value = false;
  adminToRemove.value = null;
};
</script>
