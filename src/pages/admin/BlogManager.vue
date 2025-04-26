<template>
    <div>
        <!-- Header with actions -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 class="text-2xl font-bold text-white">Blog Posts</h1>
            <div>
                <router-link to="/admin/blog/create"
                    class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center">
                    <PlusIcon class="h-5 w-5 mr-2" />
                    Write New Post
                </router-link>
            </div>
        </div>

        <!-- Search and filter bar -->
        <div class="bg-[#1e1e1e] rounded-xl p-4 mb-6 border border-[#333] flex flex-col sm:flex-row gap-4">
            <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
                </div>
                <input type="text" v-model="search" placeholder="Search posts..."
                    class="w-full pl-10 pr-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white" />
            </div>
            <div>
                <select v-model="categoryFilter"
                    class="bg-[#2d2d2d] border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#6d28d9]">
                    <option value="all">All Categories</option>
                    <option value="web-dev">Web Development</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="career">Career</option>
                    <option value="tech">Technology</option>
                </select>
            </div>
        </div>

        <!-- Blog Posts List -->
        <div v-if="filteredPosts.length > 0" class="space-y-6 mb-8">
            <div v-for="post in filteredPosts" :key="post.id"
                class="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#333] shadow-lg group hover:border-purple-500 transition-all duration-300">
                <div class="md:flex">
                    <!-- Featured Image -->
                    <div class="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                        <img :src="post.image" :alt="post.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div v-if="post.featured"
                            class="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured</div>
                        <div
                            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4 md:hidden">
                            <span class="px-2 py-1 text-xs rounded-full" :class="getCategoryClass(post.category)">
                                {{ getCategoryName(post.category) }}
                            </span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 md:w-2/3 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="hidden md:inline-block px-2 py-1 text-xs rounded-full"
                                    :class="getCategoryClass(post.category)">
                                    {{ getCategoryName(post.category) }}
                                </span>
                                <span class="text-gray-400 text-sm">{{ post.date }}</span>
                            </div>

                            <h3 class="font-bold text-white text-xl mb-2">{{ post.title }}</h3>
                            <p class="text-gray-400 text-sm mb-4 line-clamp-2">{{ post.excerpt }}</p>

                            <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mb-4">
                                <span v-for="(tag, index) in post.tags?.slice(0, 3)" :key="index"
                                    class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">
                                    {{ tag }}
                                </span>
                                <span v-if="post.tags?.length > 3"
                                    class="text-xs bg-[#2d2d2d] text-gray-300 px-2 py-1 rounded-full">
                                    +{{ post.tags.length - 3 }} more
                                </span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center mt-4">
                            <div class="flex items-center">
                                <img :src="post.author.avatar" :alt="post.author.name"
                                    class="w-8 h-8 rounded-full mr-3" />
                                <span class="text-sm text-gray-300">{{ post.author.name }}</span>
                            </div>

                            <div class="flex space-x-2">
                                <router-link :to="`/admin/blog/edit/${post.id}`"
                                    class="text-[#a78bfa] hover:text-[#8b5cf6] flex items-center">
                                    <PencilIcon class="h-4 w-4 mr-1" />
                                    Edit
                                </router-link>
                                <button @click="confirmDelete(post)"
                                    class="text-red-400 hover:text-red-500 flex items-center">
                                    <TrashIcon class="h-4 w-4 mr-1" />
                                    Delete
                                </button>
                                <router-link :to="`/blog/${post.id}`"
                                    class="text-gray-400 hover:text-white flex items-center">
                                    Preview
                                    <ArrowTopRightOnSquareIcon class="h-4 w-4 ml-1" />
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else class="bg-[#1e1e1e] rounded-xl p-10 text-center border border-[#333] mt-6">
            <DocumentTextIcon class="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <h3 class="text-xl font-medium text-white mb-2">No blog posts found</h3>
            <p class="text-gray-400 mb-6">{{ categoryFilter === 'all' ? 'You don\'t have any blog posts yet' : `No posts
                in the ${getCategoryName(categoryFilter)} category` }}</p>
            <router-link to="/admin/blog/create"
                class="bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] hover:from-[#5b21b6] hover:to-[#7c3aed] text-white py-2.5 px-6 rounded-lg font-medium transition-all duration-300 inline-flex items-center">
                <PlusIcon class="h-5 w-5 mr-2" />
                Write Your First Post
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
            <div class="bg-[#1e1e1e] rounded-lg p-6 max-w-md w-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
                    <button @click="showDeleteModal = false" class="text-gray-400 hover:text-white">
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>
                <p class="text-gray-300 mb-6">Are you sure you want to delete the blog post <span
                        class="font-medium text-white">{{ postToDelete?.title }}</span>? This action cannot be undone.
                </p>
                <div class="flex justify-end space-x-4">
                    <button @click="showDeleteModal = false"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button @click="deletePost"
                        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useBlogStore } from '@/stores/blogPosts';
import type { BlogPost } from '@/interfaces/blog';
import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    ArrowTopRightOnSquareIcon,
    DocumentTextIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline';

const blogStore = useBlogStore();

// Filters
const search = ref('');
const categoryFilter = ref('all');

// Delete modal state
const showDeleteModal = ref(false);
const postToDelete = ref<BlogPost | null>(null);

// Filter posts based on search and category
const filteredPosts = computed(() => {
    let posts = blogStore.posts;

    if (categoryFilter.value !== 'all') {
        posts = posts.filter(p => p.category === categoryFilter.value);
    }

    if (search.value.trim()) {
        const searchLower = search.value.toLowerCase();
        posts = posts.filter(p =>
            p.title.toLowerCase().includes(searchLower) ||
            p.excerpt.toLowerCase().includes(searchLower) ||
            p.content.toLowerCase().includes(searchLower) ||
            p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }

    return posts;
});

// Category utilities
function getCategoryName(category: string): string {
    switch (category) {
        case 'web-dev': return 'Web Development';
        case 'ui-ux': return 'UI/UX Design';
        case 'career': return 'Career';
        case 'tech': return 'Technology';
        default: return category;
    }
}

function getCategoryClass(category: string): string {
    switch (category) {
        case 'web-dev': return 'bg-blue-900/30 text-blue-300';
        case 'ui-ux': return 'bg-purple-900/30 text-purple-300';
        case 'career': return 'bg-green-900/30 text-green-300';
        case 'tech': return 'bg-orange-900/30 text-orange-300';
        default: return 'bg-gray-900/30 text-gray-300';
    }
}

// Delete functionality
function confirmDelete(post: BlogPost) {
    postToDelete.value = post;
    showDeleteModal.value = true;
}

function deletePost() {
    if (postToDelete.value) {
        blogStore.deletePost(postToDelete.value.id);
        showDeleteModal.value = false;
        postToDelete.value = null;
    }
}
</script>