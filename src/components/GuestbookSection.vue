<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface User {
  id: string;
  username: string;
  avatarUrl: string | null;
  profileUrl: string;
}

interface Entry {
  id: number;
  message: string;
  createdAt: string;
  username: string;
  avatarUrl: string | null;
  profileUrl: string;
}

const user = ref<User | null>(null);
const entries = ref<Entry[]>([]);
const message = ref("");
const loading = ref(true);
const submitting = ref(false);
const error = ref("");
const oauthError = new URLSearchParams(window.location.search).get("error");
if (oauthError) error.value = oauthError;

const remainingCharacters = computed(() => 500 - message.value.length);

async function request<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

async function loadGuestbook() {
  loading.value = true;
  error.value = "";
  try {
    const [session, guestbook] = await Promise.all([
      request<{ user: User | null }>("/api/auth/me"),
      request<{ entries: Entry[] }>("/api/guestbook"),
    ]);
    user.value = session.user;
    entries.value = guestbook.entries;
  } catch (loadError: any) {
    error.value = loadError.message || "Unable to load the guestbook.";
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  await request("/api/auth/logout", { method: "POST" });
  user.value = null;
}

async function submitMessage() {
  if (!message.value.trim() || submitting.value) return;
  submitting.value = true;
  error.value = "";
  try {
    await request("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.value }),
    });
    message.value = "";
    await loadGuestbook();
  } catch (submitError: any) {
    error.value = submitError.message || "Unable to save your message.";
  } finally {
    submitting.value = false;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    new Date(`${value.replace(" ", "T")}Z`)
  );
}

onMounted(loadGuestbook);
</script>

<template>
  <section class="guestbook-section">
    <a href="/" class="guestbook-back-link">← Back home</a>

    <div class="section-heading guestbook-heading">
      <p class="eyebrow">A note from the internet</p>
      <h1>Guestbook</h1>
      <p class="section-copy">Leave a kind word, share what you’re building, or just say hello.</p>
    </div>

    <div v-if="!loading && user" class="guestbook-composer guestbook-card">
      <div class="guestbook-user-row">
        <img
          v-if="user.avatarUrl"
          :src="user.avatarUrl"
          :alt="user.username"
          class="guestbook-avatar"
        />
        <div>
          <strong>{{ user.username }}</strong>
          <button type="button" class="guestbook-text-button" @click="signOut">Sign out</button>
        </div>
      </div>
      <form @submit.prevent="submitMessage">
        <textarea
          v-model="message"
          maxlength="500"
          placeholder="Write something nice..."
          rows="4"
        />
        <div class="guestbook-form-footer">
          <span>{{ remainingCharacters }} characters left</span>
          <button type="submit" class="guestbook-button" :disabled="submitting || !message.trim()">
            {{ submitting ? "Posting..." : "Sign guestbook" }}
          </button>
        </div>
      </form>
    </div>

    <div v-else-if="!loading" class="guestbook-login guestbook-card">
      <p>Want to leave a message?</p>
      <a href="/api/auth/github" class="guestbook-button">Sign in with GitHub</a>
    </div>

    <p v-if="error" class="guestbook-error" role="alert">{{ error }}</p>
    <p v-if="loading" class="guestbook-empty">Loading messages...</p>
    <p v-else-if="!entries.length" class="guestbook-empty">
      No messages yet. Be the first to sign!
    </p>

    <div v-else class="guestbook-entries">
      <article v-for="entry in entries" :key="entry.id" class="guestbook-entry">
        <img
          v-if="entry.avatarUrl"
          :src="entry.avatarUrl"
          :alt="entry.username"
          class="guestbook-avatar"
          loading="lazy"
        />
        <div class="guestbook-entry-body">
          <div class="guestbook-entry-meta">
            <a :href="entry.profileUrl" target="_blank" rel="noreferrer">{{ entry.username }}</a>
            <time>{{ formatDate(entry.createdAt) }}</time>
          </div>
          <p>{{ entry.message }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
