<template>
    <div>
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-white">Edit Blog Post</h1>
            <p class="text-gray-400 mt-1">Update your blog article</p>
        </div>

        <div v-if="!post">
            <div class="bg-[#1e1e1e] rounded-xl p-8 text-center border border-[#333]">
                <FaceFrownIcon class="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <p class="text-gray-300 mb-4">Blog post not found.</p>
                <router-link to="/admin/blog" class="text-[#6d28d9] hover:text-[#8b5cf6]">
                    &larr; Return to Blog Manager
                </router-link>
            </div>
        </div>

        <!-- Form -->
        <form v-if="post" @submit.prevent="savePost" class="space-y-8">
            <div class="bg-[#1e1e1e] rounded-xl border border-[#333] p-6 shadow-lg">
                <h2 class="text-lg font-semibold text-white mb-4">Post Details</h2>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Post Title -->
                    <div class="lg:col-span-2">
                        <label for="title" class="block text-sm font-medium text-gray-300 mb-1">Post Title <span
                                class="text-red-500">*</span></label>
                        <input type="text" id="title" v-model="post.title"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            required />
                    </div>

                    <!-- Featured Image URL -->
                    <div class="lg:col-span-2">
                        <label for="image" class="block text-sm font-medium text-gray-300 mb-1">Featured Image URL <span
                                class="text-red-500">*</span></label>
                        <input type="url" id="image" v-model="post.image"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            placeholder="https://example.com/image.jpg" required />
                        <p class="text-xs text-gray-500 mt-1">Recommended size: 1200×630 pixels</p>
                    </div>

                    <!-- Category & Date-->
                    <div>
                        <label for="category" class="block text-sm font-medium text-gray-300 mb-1">Category <span
                                class="text-red-500">*</span></label>
                        <select id="category" v-model="post.category"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            required>
                            <option value="web-dev">Web Development</option>
                            <option value="ui-ux">UI/UX Design</option>
                            <option value="career">Career</option>
                            <option value="tech">Technology</option>
                        </select>
                    </div>

                    <div>
                        <label for="date" class="block text-sm font-medium text-gray-300 mb-1">Publication Date <span
                                class="text-red-500">*</span></label>
                        <input type="date" id="date" v-model="publishDate"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            required />
                    </div>

                    <!-- Excerpt -->
                    <div class="lg:col-span-2">
                        <label for="excerpt" class="block text-sm font-medium text-gray-300 mb-1">Excerpt <span
                                class="text-red-500">*</span></label>
                        <textarea id="excerpt" v-model="post.excerpt" rows="3"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white resize-none"
                            placeholder="A short description of your blog post (displayed in post listings)"
                            required></textarea>
                    </div>

                    <!-- Tags -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                        <div class="flex flex-wrap gap-2 mb-3">
                            <span v-for="(tag, index) in post.tags" :key="index"
                                class="px-3 py-1.5 bg-[#2d2d2d] text-white rounded-full flex items-center">
                                {{ tag }}
                                <button type="button" @click="removeTag(index)"
                                    class="ml-2 text-gray-400 hover:text-white">
                                    <XMarkIcon class="h-4 w-4" />
                                </button>
                            </span>
                        </div>

                        <div class="flex gap-2">
                            <input type="text" v-model="newTag" placeholder="Add tag (e.g. Vue.js)"
                                class="flex-1 px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                                @keydown.enter.prevent="addTag" />
                            <button type="button" @click="addTag"
                                class="px-4 py-2 bg-[#6d28d9] text-white rounded-md hover:bg-[#5b21b6] transition-colors">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Editor -->
            <div class="bg-[#1e1e1e] rounded-xl border border-[#333] p-6 shadow-lg">
                <h2 class="text-lg font-semibold text-white mb-4">Post Content <span class="text-red-500">*</span></h2>

                <div class="mt-2">
                    <!-- TinyMCE Editor -->
                    <Editor v-model="post.content" :api-key="tinymceApiKey" :init="editorConfig" />
                </div>
            </div>

            <!-- Author Details -->
            <div class="bg-[#1e1e1e] rounded-xl border border-[#333] p-6 shadow-lg">
                <h2 class="text-lg font-semibold text-white mb-4">Author Details</h2>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        <label for="authorName" class="block text-sm font-medium text-gray-300 mb-1">Author Name <span
                                class="text-red-500">*</span></label>
                        <input type="text" id="authorName" v-model="post.author.name"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            required />
                    </div>

                    <div>
                        <label for="authorAvatar" class="block text-sm font-medium text-gray-300 mb-1">Author Avatar URL
                            <span class="text-red-500">*</span></label>
                        <input type="url" id="authorAvatar" v-model="post.author.avatar"
                            class="w-full px-4 py-2.5 bg-[#2d2d2d] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-white"
                            placeholder="https://example.com/avatar.jpg" required />
                    </div>
                </div>
            </div>

            <!-- Publishing Options -->
            <div class="bg-[#1e1e1e] rounded-xl border border-[#333] p-6 shadow-lg">
                <h2 class="text-lg font-semibold text-white mb-4">Publishing Options</h2>

                <div class="flex items-center">
                    <input type="checkbox" id="featured" v-model="post.featured"
                        class="w-5 h-5 bg-[#2d2d2d] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#6d28d9] text-[#6d28d9]" />
                    <label for="featured" class="ml-2 text-gray-300">Mark as featured post</label>
                </div>
                <p class="text-xs text-gray-500 mt-1">Featured posts appear prominently on your blog homepage</p>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-4 mt-6">
                <router-link to="/admin/blog"
                    class="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Cancel
                </router-link>
                <button type="submit"
                    class="px-6 py-3 bg-gradient-to-r from-[#6d28d9] to-[#8b5cf6] text-white rounded-lg hover:from-[#5b21b6] hover:to-[#7c3aed] transition-colors flex items-center">
                    <SpinnerIcon v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Update Post
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, h, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBlogStore } from '@/stores/blogPosts';
import type { BlogPost } from '@/interfaces/blog';
import Editor from '@tinymce/tinymce-vue';
import { XMarkIcon, FaceFrownIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const blogStore = useBlogStore();
const isSubmitting = ref(false);

// Blog post data with proper typing
const post = ref<BlogPost | null>(null);

// Get post ID from route params
const postId = computed(() => route.params.id as string);

// Custom spinner component
const SpinnerIcon = defineComponent({
    setup() {
        return () => h('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            class: 'animate-spin',
            fill: 'none',
            viewBox: '0 0 24 24'
        }, [
            h('circle', {
                class: 'opacity-25',
                cx: '12',
                cy: '12',
                r: '10',
                stroke: 'currentColor',
                'stroke-width': '4'
            }),
            h('path', {
                class: 'opacity-75',
                fill: 'currentColor',
                d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            })
        ]);
    }
});

// TinyMCE Config
const tinymceApiKey = ''; // You would use your own API key in a production environment
const editorConfig = {
    height: 500,
    menubar: true,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    skin: 'oxide-dark',
    content_css: 'dark'
};

// Date handling
const publishDate = ref('');

// Load post data on mount
onMounted(() => {
    const postData = blogStore.getPostById(postId.value);

    if (postData) {
        // Create a deep clone of the post data to avoid direct mutation
        post.value = JSON.parse(JSON.stringify(postData));

        // Convert the date string to a date object for the input
        if (post.value && post.value.date) {
            const dateObj = new Date(post.value.date);
            publishDate.value = dateObj.toISOString().substr(0, 10);
        }

        // Ensure tags array exists
        if (post.value && !post.value.tags) {
            post.value.tags = [];
        }
    }
});

// For adding tags
const newTag = ref('');

function addTag() {
    if (post.value && newTag.value.trim()) {
        // Ensure tags array exists
        if (!post.value.tags) {
            post.value.tags = [];
        }
        post.value.tags.push(newTag.value.trim());
        newTag.value = '';
    }
}

function removeTag(index: number) {
    if (post.value && post.value.tags) {
        post.value.tags.splice(index, 1);
    }
}

// Save post
async function savePost() {
    if (!post.value) return;

    try {
        isSubmitting.value = true;

        // Format the date nicely
        const dateObj = new Date(publishDate.value);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        post.value.date = dateObj.toLocaleDateString('en-US', options);

        // Update post in the store
        blogStore.updatePost(post.value);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Navigate back to blog list
        router.push('/admin/blog');
    } catch (error) {
        console.error('Error updating post:', error);
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style>
/* TinyMCE editor styles */
.tox-tinymce {
    border-radius: 0.375rem !important;
    border-color: #4B5563 !important;
    overflow: hidden;
}

.tox .tox-statusbar {
    border-top: 1px solid #374151 !important;
}

.tox .tox-edit-area__iframe {
    background-color: #2D2D2D !important;
}

.tox .tox-tbtn {
    color: #D1D5DB !important;
}

.tox .tox-tbtn:hover {
    background: #4B5563 !important;
}
</style>