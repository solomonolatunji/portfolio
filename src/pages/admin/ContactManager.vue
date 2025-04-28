<template>
    <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h2 class="text-2xl font-bold text-white">Contact Messages</h2>
                <p class="text-gray-400 mt-1">View and manage messages from your contact form.</p>
            </div>
            <div class="flex items-center space-x-3">
                <div class="relative">
                    <input type="text" placeholder="Search messages..." v-model="searchQuery"
                        class="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9] w-full sm:w-auto" />
                    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <MagnifyingGlassIcon class="w-5 h-5" />
                    </span>
                </div>
                <select v-model="filterStatus"
                    class="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#6d28d9]">
                    <option value="all">All Messages</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                    <option value="archived">Archived</option>
                </select>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-[#1e1e1e] border border-[#333] rounded-lg p-5 flex items-center">
                <div class="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon class="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <div class="text-gray-400 text-sm">Total Messages</div>
                    <div class="text-white text-xl font-bold">{{ messages.length }}</div>
                </div>
            </div>
            <div class="bg-[#1e1e1e] border border-[#333] rounded-lg p-5 flex items-center">
                <div class="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeOpenIcon class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <div class="text-gray-400 text-sm">Unread</div>
                    <div class="text-white text-xl font-bold">{{ unreadCount }}</div>
                </div>
            </div>
            <div class="bg-[#1e1e1e] border border-[#333] rounded-lg p-5 flex items-center">
                <div class="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <ClockIcon class="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <div class="text-gray-400 text-sm">Response Rate</div>
                    <div class="text-white text-xl font-bold">85%</div>
                </div>
            </div>
        </div>

        <!-- Messages Cards -->
        <div class="bg-[#1e1e1e] border border-[#333] rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                        class="rounded text-[#6d28d9] focus:ring-[#6d28d9] focus:ring-opacity-50 bg-[#333] border-[#444]" />
                    <span class="ml-2 text-sm text-gray-400">Select All</span>
                </div>
                <div v-if="anySelected" class="flex space-x-2">
                    <button @click="bulkMarkAsRead"
                        class="px-3 py-1 text-sm rounded bg-blue-900/30 text-blue-400 hover:bg-blue-900/50">
                        Mark as Read
                    </button>
                    <button @click="bulkArchive"
                        class="px-3 py-1 text-sm rounded bg-gray-800 text-gray-400 hover:bg-gray-700">
                        Archive
                    </button>
                    <button @click="bulkDelete"
                        class="px-3 py-1 text-sm rounded bg-red-900/30 text-red-400 hover:bg-red-900/50">
                        Delete
                    </button>
                </div>
            </div>

            <div v-if="filteredMessages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="message in filteredMessages" :key="message.id"
                    class="bg-[#232323] border border-[#333] rounded-lg overflow-hidden flex flex-col"
                    :class="{ 'ring-2 ring-[#6d28d9] ring-opacity-70': message.selected }">
                    <div class="p-4 border-b border-[#333] flex justify-between items-start">
                        <div class="flex items-center">
                            <input type="checkbox" v-model="message.selected"
                                class="rounded text-[#6d28d9] focus:ring-[#6d28d9] focus:ring-opacity-50 bg-[#333] border-[#444]" />
                            <div class="ml-3">
                                <div
                                    class="w-8 h-8 bg-gradient-to-br from-[#6d28d9] to-[#8b5cf6] rounded-full flex items-center justify-center text-white">
                                    {{ message.sender.charAt(0).toUpperCase() }}
                                </div>
                            </div>
                            <div class="ml-3">
                                <div class="text-sm font-medium text-white" :class="{ 'font-bold': !message.read }">
                                    {{ message.sender }}
                                </div>
                                <div class="text-xs text-gray-400">{{ message.email }}</div>
                            </div>
                        </div>
                        <div>
                            <span v-if="!message.read"
                                class="px-2 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-400">
                                Unread
                            </span>
                            <span v-else-if="message.archived"
                                class="px-2 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400">
                                Archived
                            </span>
                        </div>
                    </div>
                    <div class="p-4 flex-1">
                        <h3 class="text-white font-medium mb-1" :class="{ 'font-bold': !message.read }">
                            {{ message.subject }}
                        </h3>
                        <p class="text-gray-400 text-sm line-clamp-2">
                            {{ message.message }}
                        </p>
                    </div>
                    <div class="px-4 py-3 bg-[#1e1e1e] flex justify-between items-center">
                        <span class="text-xs text-gray-400">{{ formatDate(message.date) }}</span>
                        <div class="flex space-x-2">
                            <button @click="viewMessage(message)" class="text-gray-400 hover:text-white">
                                <EyeIcon class="w-5 h-5" />
                            </button>
                            <button @click="markAsRead(message)" v-if="!message.read"
                                class="text-gray-400 hover:text-white">
                                <EnvelopeOpenIcon class="w-5 h-5" />
                            </button>
                            <button @click="archiveMessage(message)" v-if="!message.archived"
                                class="text-gray-400 hover:text-white">
                                <ArchiveBoxIcon class="w-5 h-5" />
                            </button>
                            <button @click="unarchiveMessage(message)" v-if="message.archived"
                                class="text-gray-400 hover:text-white">
                                <ArchiveBoxArrowDownIcon class="w-5 h-5" />
                            </button>
                            <button @click="deleteMessage(message)" class="text-red-400 hover:text-red-300">
                                <TrashIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="py-16 text-center text-gray-400">
                <InboxIcon class="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p class="text-lg">No messages match your filter criteria</p>
                <button @click="resetFilters" class="mt-4 text-[#6d28d9] hover:underline text-sm">
                    Reset filters
                </button>
            </div>

            <div class="mt-4 px-4 py-3 bg-[#232323] flex items-center justify-between rounded-lg">
                <div>
                    <p class="text-sm text-gray-400">
                        Showing <span class="font-medium text-white">{{ filteredMessages.length }}</span> of <span
                            class="font-medium text-white">{{ messages.length }}</span> messages
                    </p>
                </div>
                <Pagination :current-page="currentPage" :total-pages="totalPages" @prev="currentPage--"
                    @next="currentPage++" @goto="(page: number) => currentPage = page" />
            </div>
        </div>

        <!-- Message View Modal -->
        <div v-if="selectedMessage"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                class="bg-[#1e1e1e] border border-[#333] rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                <div class="p-4 border-b border-[#333] flex justify-between items-center">
                    <h3 class="text-lg font-medium text-white">Message Details</h3>
                    <button @click="selectedMessage = null" class="text-gray-400 hover:text-white">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>
                <div class="p-6 overflow-y-auto">
                    <div class="space-y-4">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="text-xl font-semibold text-white">{{ selectedMessage.subject }}</h4>
                                <div class="flex items-center mt-1 space-x-2 text-sm text-gray-400">
                                    <span>From: <span class="text-white">{{ selectedMessage.sender }}</span></span>
                                    <span>•</span>
                                    <span>{{ formatDate(selectedMessage.date) }}</span>
                                </div>
                            </div>
                            <span v-if="!selectedMessage.read"
                                class="px-2 py-1 text-xs font-medium rounded-full bg-blue-900/30 text-blue-400">
                                Unread
                            </span>
                        </div>
                        <div class="p-4 bg-[#262626] rounded-lg">
                            <p class="text-white whitespace-pre-line">{{ selectedMessage.message }}</p>
                        </div>
                        <div class="bg-[#262626] rounded-lg p-4">
                            <p class="text-sm text-gray-400">Contact Information:</p>
                            <div class="mt-2 space-y-2">
                                <div class="flex items-center">
                                    <EnvelopeIcon class="w-5 h-5 text-gray-400 mr-2" />
                                    <a href="mailto:{{ selectedMessage.email }}"
                                        class="text-[#6d28d9] hover:underline">{{ selectedMessage.email }}</a>
                                </div>
                                <div v-if="selectedMessage.phone" class="flex items-center">
                                    <PhoneIcon class="w-5 h-5 text-gray-400 mr-2" />
                                    <a href="tel:{{ selectedMessage.phone }}" class="text-[#6d28d9] hover:underline">{{
                                        selectedMessage.phone }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t border-[#333] flex justify-end gap-2">
                    <button @click="replyToMessage"
                        class="px-4 py-2 bg-[#6d28d9] text-white rounded hover:bg-[#5b21b6] focus:outline-none focus:ring-2 focus:ring-[#6d28d9] focus:ring-opacity-50">
                        Reply
                    </button>
                    <button @click="selectedMessage = null"
                        class="px-4 py-2 bg-[#333] text-white rounded hover:bg-[#444] focus:outline-none">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import {
    EnvelopeIcon,
    EnvelopeOpenIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    TrashIcon,
    PhoneIcon,
    ArchiveBoxIcon,
    ArchiveBoxArrowDownIcon,
    ClockIcon,
    XMarkIcon,
    InboxIcon,
} from '@heroicons/vue/24/outline';
import Pagination from '@/components/Pagination.vue';

interface ContactMessage {
    id: number;
    sender: string;
    email: string;
    subject: string;
    message: string;
    date: Date;
    read: boolean;
    archived: boolean;
    phone?: string;
    selected: boolean;
}

const messages = ref<ContactMessage[]>([
    {
        id: 1,
        sender: 'John Smith',
        email: 'johnsmith@example.com',
        subject: 'Website Project Inquiry',
        message: 'Hello,\n\nI came across your portfolio and I\'m impressed with your work. I\'m looking for someone to help design and develop a new website for my business. Would you be available for a quick chat to discuss this project?\n\nThanks,\nJohn',
        date: new Date(2025, 3, 27, 10, 24),
        read: false,
        archived: false,
        phone: '(555) 123-4567',
        selected: false
    },
    {
        id: 2,
        sender: 'Emma Johnson',
        email: 'emma.j@example.org',
        subject: 'Freelance Opportunity',
        message: 'Hi there,\n\nI represent a digital agency looking for talented freelancers to join our pool of contractors. Your portfolio caught my attention and I\'d like to discuss potential collaboration opportunities.\n\nBest regards, \nEmma',
        date: new Date(2025, 3, 25, 15, 30),
        read: true,
        archived: false,
        selected: false
    },
    {
        id: 3,
        sender: 'Michael Wong',
        email: 'michael.wong@techcorp.com',
        subject: 'Bug Report - Contact Form',
        message: 'Hello,\n\nI noticed that when trying to submit the contact form on your website using Safari on iOS, I get an error. The form works fine on Chrome desktop. Thought you might want to know about this issue.\n\nRegards,\nMichael',
        date: new Date(2025, 3, 24, 8, 45),
        read: true,
        archived: false,
        phone: '(555) 987-6543',
        selected: false
    },
    {
        id: 4,
        sender: 'Sarah Thompson',
        email: 'sarah.t@designstudio.co',
        subject: 'Collaboration on UI/UX Project',
        message: 'Hi,\n\nI\'m a UI/UX designer working on a large e-commerce platform redesign. I\'m looking for a developer partner who can implement my designs. Would you be interested in discussing a potential collaboration?\n\nLooking forward to hearing from you,\nSarah',
        date: new Date(2025, 3, 20, 16, 15),
        read: false,
        archived: false,
        selected: false
    },
    {
        id: 5,
        sender: 'David Lee',
        email: 'david@startupincubator.com',
        subject: 'Speaking Opportunity at Tech Conference',
        message: 'Hello,\n\nI\'m organizing a tech conference next month and would like to invite you as a speaker to share your expertise on web development trends. The conference will be held virtually, and your session would be 30-45 minutes.\n\nPlease let me know if you\'re interested, and we can discuss the details further.\n\nBest,\nDavid',
        date: new Date(2025, 3, 18, 11, 20),
        read: true,
        archived: true,
        selected: false
    }
]);

// Pagination
const itemsPerPage = 6; // Reduced for better card display
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredMessages.value.length / itemsPerPage));

// UI state
const searchQuery = ref('');
const filterStatus = ref('all');
const selectAll = ref(false);
const selectedMessage = ref<ContactMessage | null>(null);

// Computed values
const unreadCount = computed(() => messages.value.filter(m => !m.read).length);

const anySelected = computed(() => messages.value.some(m => m.selected));

const filteredMessages = computed(() => {
    let result = [...messages.value];

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(message =>
            message.sender.toLowerCase().includes(query) ||
            message.subject.toLowerCase().includes(query) ||
            message.message.toLowerCase().includes(query) ||
            message.email.toLowerCase().includes(query)
        );
    }

    // Apply status filter
    if (filterStatus.value === 'read') {
        result = result.filter(message => message.read && !message.archived);
    } else if (filterStatus.value === 'unread') {
        result = result.filter(message => !message.read);
    } else if (filterStatus.value === 'archived') {
        result = result.filter(message => message.archived);
    }

    return result;
});

// Methods
const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Today, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
        return 'Yesterday, ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};

const toggleSelectAll = () => {
    filteredMessages.value.forEach(message => {
        message.selected = selectAll.value;
    });
};

const resetFilters = () => {
    searchQuery.value = '';
    filterStatus.value = 'all';
};

const bulkMarkAsRead = () => {
    messages.value.forEach(message => {
        if (message.selected) {
            message.read = true;
        }
    });
};

const bulkArchive = () => {
    messages.value.forEach(message => {
        if (message.selected) {
            message.archived = true;
        }
    });
};

const bulkDelete = () => {
    const selectedIds = messages.value.filter(m => m.selected).map(m => m.id);
    messages.value = messages.value.filter(m => !selectedIds.includes(m.id));

    if (selectedMessage.value && selectedIds.includes(selectedMessage.value.id)) {
        selectedMessage.value = null;
    }
};

const viewMessage = (message: ContactMessage) => {
    selectedMessage.value = message;
    if (!message.read) {
        markAsRead(message);
    }
};

const markAsRead = (message: ContactMessage) => {
    message.read = true;
};

const archiveMessage = (message: ContactMessage) => {
    message.archived = true;
};

const unarchiveMessage = (message: ContactMessage) => {
    message.archived = false;
};

const deleteMessage = (message: ContactMessage) => {
    const index = messages.value.findIndex(m => m.id === message.id);
    if (index !== -1) {
        messages.value.splice(index, 1);
    }

    if (selectedMessage.value?.id === message.id) {
        selectedMessage.value = null;
    }
};

const replyToMessage = () => {
    if (selectedMessage.value) {
        window.open(`mailto:${selectedMessage.value.email}?subject=Re: ${selectedMessage.value.subject}`, '_blank');
    }
};

watch([searchQuery, filterStatus], () => {
    selectAll.value = false;
});

onMounted(() => {
    document.title = "Contact | Admin Dashboard";
});
</script>