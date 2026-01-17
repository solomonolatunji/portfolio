<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Posts</h1>
        <p class="text-sm text-gray-400">Manage your blog posts</p>
      </div>
      <div class="flex gap-4">
        <Button variant="primary" text="New Post" @click="navigateToCreate">
          <template #iconLeft>
            <IconPlus class="h-4 w-4" />
          </template>
        </Button>
      </div>
    </div>

    <div
      class="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-[#1e1e1e] p-4 sm:flex-row sm:items-center"
    >
      <div class="w-full sm:w-72">
        <Input v-model="search" placeholder="Search posts...">
          <template #iconLeft>
            <IconSearch />
          </template>
        </Input>
      </div>
      <Button variant="secondary" text="Filters" @click="isFilterModalOpen = true">
        <template #iconLeft>
          <IconFilter class="h-4 w-4" />
        </template>
      </Button>
    </div>

    <div class="overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-white/5 text-xs text-gray-400 uppercase">
            <tr>
              <th scope="col" class="px-6 py-4">Title</th>
              <th scope="col" class="px-6 py-4">Category</th>
              <th scope="col" class="px-6 py-4">Status</th>
              <th scope="col" class="px-6 py-4">Date</th>
              <th scope="col" class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr v-if="isLoading" class="animate-pulse">
              <td colspan="5" class="px-6 py-8 text-center">Loading posts...</td>
            </tr>
            <tr v-else-if="posts.length === 0">
              <td colspan="5" class="px-6 py-8 text-center">No posts found</td>
            </tr>
            <tr v-else v-for="post in posts" :key="post.id" class="group hover:bg-white/5">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-800"
                  >
                    <img v-if="post.cover" :src="post.cover" class="h-full w-full object-cover" />
                    <IconFileText v-else class="h-5 w-5" />
                  </div>
                  <div>
                    <div class="max-w-[200px] truncate font-medium text-white" :title="post.title">
                      {{ post.title }}
                    </div>
                    <div class="max-w-[200px] truncate text-xs">
                      {{ post.content?.substring(0, 50) }}...
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400"
                >
                  {{ post.categories?.map((c) => c.category.name).join(", ") || "Uncategorized" }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="openFeaturedModal(post)"
                  class="inline-flex items-center text-xs font-medium transition-colors"
                  :class="
                    post.isFeatured
                      ? 'text-yellow-500 hover:text-yellow-400'
                      : 'text-gray-500 hover:text-gray-400'
                  "
                  :title="post.isFeatured ? 'Featured Post' : 'Not Featured'"
                >
                  <IconStarFilled v-if="post.isFeatured" class="h-4 w-4" />
                  <IconStar v-else class="h-4 w-4" />
                </button>
              </td>
              <td class="px-6 py-4">
                {{ formatDate(post.createdAt) }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                  <button
                    class="p-1 text-gray-400 hover:text-white"
                    title="Edit"
                    @click="navigateToEdit(post)"
                  >
                    <IconEdit class="h-4 w-4" />
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-red-400"
                    title="Delete"
                    @click="openDeleteModal(post)"
                  >
                    <IconTrash class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="border-t border-white/10 px-6 py-4">
        <Pagination
          :current-page="currentPage"
          :total-pages="Math.ceil(total / 10)"
          @prev="changePage(currentPage - 1)"
          @next="changePage(currentPage + 1)"
          @goto="changePage"
        />
        <div class="mt-2 text-center text-xs text-gray-500">
          Showing <span class="text-white">{{ posts.length }}</span> of
          <span class="text-white">{{ total }}</span>
          posts
        </div>
      </div>
    </div>

    <Modal :is-open="isDeleteModalOpen" title="Delete Post" @close="closeDeleteModal">
      <p class="text-gray-300">
        Are you sure you want to delete
        <span class="font-bold text-white">{{ selectedPost?.title }}</span
        >? This action cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" @click="closeDeleteModal" text="Cancel" />
        <Button
          variant="primary"
          @click="confirmDelete"
          text="Delete"
          class="!hover:bg-red-700 border-none! bg-red-600!"
        />
      </template>
    </Modal>

    <Modal :is-open="isFilterModalOpen" title="Filter Posts" @close="isFilterModalOpen = false">
      <div class="space-y-4">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-300">Status</label>
          <select
            class="w-full rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white focus:border-[#6d28d9] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" @click="isFilterModalOpen = false" text="Cancel" />
        <Button variant="primary" @click="isFilterModalOpen = false" text="Apply Filters" />
      </template>
    </Modal>

    <Modal
      :is-open="isFeaturedModalOpen"
      :title="selectedPost?.isFeatured ? 'Remove from Featured' : 'Mark as Featured'"
      @close="closeFeaturedModal"
    >
      <p class="text-gray-300">
        Are you sure you want to
        {{
          selectedPost?.isFeatured
            ? "remove this post from featured posts"
            : "mark this post as featured"
        }}?
      </p>
      <p class="mt-2 text-sm text-gray-400">
        <span class="font-medium text-white">{{ selectedPost?.title }}</span>
      </p>
      <template #footer>
        <Button variant="ghost" @click="closeFeaturedModal" text="Cancel" />
        <Button
          variant="primary"
          :loading="isLoading"
          @click="confirmToggleFeatured"
          :text="selectedPost?.isFeatured ? 'Remove' : 'Mark as Featured'"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePost } from "@/hooks/usePost";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconFileText,
  IconStar,
  IconStarFilled,
  IconSearch,
  IconFilter,
} from "@tabler/icons-vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Admin/Shared/Modal.vue";
import Pagination from "@/components/Pagination.vue";

const router = useRouter();
const { posts, total, currentPage, isLoading, fetchPosts, toggleFeatured, deletePost } = usePost();

const search = ref("");
const isDeleteModalOpen = ref(false);
const isFilterModalOpen = ref(false);
const isFeaturedModalOpen = ref(false);
const selectedPost = ref<any>(null);

const formatDate = (date: any) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const changePage = (page: number) => {
  fetchPosts({ page, limit: 10 });
};

const navigateToCreate = () => {
  router.push({ name: "CreatePost" });
};

const navigateToEdit = (post: any) => {
  router.push({ name: "EditPost", params: { id: post.id } });
};

const openFeaturedModal = (post: any) => {
  selectedPost.value = post;
  isFeaturedModalOpen.value = true;
};

const closeFeaturedModal = () => {
  isFeaturedModalOpen.value = false;
  selectedPost.value = null;
};

const confirmToggleFeatured = async () => {
  if (!selectedPost.value) return;
  const newFeaturedState = !selectedPost.value.isFeatured;
  try {
    await toggleFeatured(selectedPost.value.id, newFeaturedState);
    closeFeaturedModal();
  } catch (error) {
    console.error("Failed to toggle featured", error);
  }
};

const openDeleteModal = (post: any) => {
  selectedPost.value = post;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedPost.value = null;
};

const confirmDelete = async () => {
  if (selectedPost.value) {
    try {
      await deletePost(selectedPost.value.id);
      closeDeleteModal();
      fetchPosts({ page: currentPage.value, limit: 10 });
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  }
};

onMounted(() => {
  fetchPosts({ page: 1, limit: 10 });
});
</script>
