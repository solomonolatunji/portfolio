<template>
  <div
    class="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all focus-within:border-purple-500/30"
  >
    <!-- Toolbar -->
    <div
      v-if="editor"
      class="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/5 p-3 backdrop-blur-md"
    >
      <div class="flex items-center gap-1 border-r border-white/10 px-2">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="
            editor.isActive('bold')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Bold"
        >
          <IconBold class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="
            editor.isActive('italic')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Italic"
        >
          <IconItalic class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="
            editor.isActive('strike')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Strikethrough"
        >
          <IconStrikethrough class="h-4 w-4" />
        </button>
      </div>

      <div class="flex items-center gap-1 border-r border-white/10 px-2">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="
            editor.isActive('heading', { level: 1 })
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Heading 1"
        >
          <IconH1 class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="
            editor.isActive('heading', { level: 2 })
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Heading 2"
        >
          <IconH2 class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="
            editor.isActive('heading', { level: 3 })
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Heading 3"
        >
          <IconH3 class="h-4 w-4" />
        </button>
      </div>

      <div class="flex items-center gap-1 border-r border-white/10 px-2">
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="
            editor.isActive('bulletList')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Bullet List"
        >
          <IconList class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="
            editor.isActive('orderedList')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Numbered List"
        >
          <IconListNumbers class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="
            editor.isActive('blockquote')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Blockquote"
        >
          <IconBlockquote class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="
            editor.isActive('codeBlock')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Code Block"
        >
          <IconCode class="h-4 w-4" />
        </button>
      </div>

      <div class="flex items-center gap-1 border-r border-white/10 px-2">
        <button
          @click="setLink"
          :class="
            editor.isActive('link')
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'
          "
          class="rounded-xl p-2 transition-all duration-200"
          type="button"
          title="Add Link"
        >
          <IconLink class="h-4 w-4" />
        </button>
      </div>

      <div class="flex items-center gap-1 px-2">
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().undo()"
          class="rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          type="button"
          title="Undo"
        >
          <IconArrowBackUp class="h-4 w-4" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().redo()"
          class="rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
          type="button"
          title="Redo"
        >
          <IconArrowForwardUp class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <EditorContent :editor="editor" class="prose-editor min-h-[400px] p-8" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconBlockquote,
  IconCode,
  IconLink,
  IconArrowBackUp,
  IconArrowForwardUp,
} from "@tabler/icons-vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: props.placeholder || "Start writing...",
    }),
    Image,
    Link.configure({
      openOnClick: false,
    }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

watch(
  () => props.modelValue,
  (value) => {
    const isSame = editor.value?.getHTML() === value;
    if (!isSame && editor.value) {
      editor.value.commands.setContent(value);
    }
  }
);

const setLink = () => {
  const previousUrl = editor.value?.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  if (url === null) {
    return;
  }

  if (url === "") {
    editor.value?.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  editor.value?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.prose-editor :deep(.ProseMirror) {
  color: #e5e7eb;
  outline: none;
  font-size: 1.1rem;
  line-height: 1.7;
}

.prose-editor :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: rgba(255, 255, 255, 0.15);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.prose-editor :deep(.ProseMirror h1) {
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  font-size: 2.25rem;
  line-height: 1.2;
  font-weight: 800;
  color: white;
}

.prose-editor :deep(.ProseMirror h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.875rem;
  line-height: 1.3;
  font-weight: 700;
  color: white;
}

.prose-editor :deep(.ProseMirror h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  line-height: 1.4;
  font-weight: 600;
  color: white;
}

.prose-editor :deep(.ProseMirror p) {
  margin-bottom: 1.25rem;
}

.prose-editor :deep(.ProseMirror ul),
.prose-editor :deep(.ProseMirror ol) {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
}

.prose-editor :deep(.ProseMirror ul) {
  list-style-type: disc;
}

.prose-editor :deep(.ProseMirror ol) {
  list-style-type: decimal;
}

.prose-editor :deep(.ProseMirror li) {
  margin-bottom: 0.5rem;
}

.prose-editor :deep(.ProseMirror blockquote) {
  border-left: 4px solid #6d28d9;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  background: rgba(109, 40, 217, 0.05);
  border-radius: 0 1rem 1rem 0;
  color: #d1d5db;
}

.prose-editor :deep(.ProseMirror pre) {
  border-radius: 1rem;
  background-color: #000;
  padding: 1.5rem;
  margin: 2rem 0;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.prose-editor :deep(.ProseMirror code) {
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.4rem;
  font-family: ui-monospace, monospace;
  font-size: 0.9em;
}

.prose-editor :deep(.ProseMirror a) {
  color: #a78bfa;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;
}

.prose-editor :deep(.ProseMirror a:hover) {
  color: #c4b5fd;
}

.prose-editor :deep(.ProseMirror img) {
  max-width: 100%;
  border-radius: 1.5rem;
  margin: 2.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
