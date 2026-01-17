<template>
  <div class="tiptap-editor">
    <div v-if="editor" class="toolbar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        type="button"
        title="Bold"
      >
        <IconBold class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        type="button"
        title="Italic"
      >
        <IconItalic class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        type="button"
        title="Strikethrough"
      >
        <IconStrikethrough class="h-4 w-4" />
      </button>
      <div class="divider"></div>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        type="button"
        title="Heading 1"
      >
        <IconH1 class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        type="button"
        title="Heading 2"
      >
        <IconH2 class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        type="button"
        title="Heading 3"
      >
        <IconH3 class="h-4 w-4" />
      </button>
      <div class="divider"></div>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        type="button"
        title="Bullet List"
      >
        <IconList class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        type="button"
        title="Numbered List"
      >
        <IconListNumbers class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        type="button"
        title="Blockquote"
      >
        <IconBlockquote class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        type="button"
        title="Code Block"
      >
        <IconCode class="h-4 w-4" />
      </button>
      <div class="divider"></div>
      <button
        @click="setLink"
        :class="{ 'is-active': editor.isActive('link') }"
        type="button"
        title="Add Link"
      >
        <IconLink class="h-4 w-4" />
      </button>
      <div class="divider"></div>
      <button
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
        type="button"
        title="Undo"
      >
        <IconArrowBackUp class="h-4 w-4" />
      </button>
      <button
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
        type="button"
        title="Redo"
      >
        <IconArrowForwardUp class="h-4 w-4" />
      </button>
    </div>
    <EditorContent :editor="editor" class="editor-content" />
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
.tiptap-editor {
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
}

.toolbar button {
  border-radius: 0.25rem;
  padding: 0.375rem;
  color: rgb(156, 163, 175);
  transition-property: color, background-color;
  transition-duration: 150ms;
}

.toolbar button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.toolbar button.is-active {
  background-color: rgba(109, 40, 217, 0.2);
  color: rgb(216, 180, 254);
}

.toolbar button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.divider {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  height: 1.5rem;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.editor-content {
  min-height: 400px;
  padding: 1rem;
}

:deep(.ProseMirror) {
  color: white;
  outline: none;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: rgb(107, 114, 128);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

:deep(.ProseMirror h1) {
  margin-bottom: 1rem;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
}

:deep(.ProseMirror h2) {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

:deep(.ProseMirror h3) {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
}

:deep(.ProseMirror p) {
  margin-bottom: 0.75rem;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  margin-left: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(.ProseMirror ul) {
  list-style-type: disc;
}

:deep(.ProseMirror ol) {
  list-style-type: decimal;
}

:deep(.ProseMirror blockquote) {
  border-left-width: 4px;
  border-color: rgb(107, 114, 128);
  padding-left: 1rem;
  font-style: italic;
  color: rgb(209, 213, 219);
}

:deep(.ProseMirror pre) {
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

:deep(.ProseMirror code) {
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

:deep(.ProseMirror a) {
  color: rgb(216, 180, 254);
  text-decoration: underline;
}

:deep(.ProseMirror a:hover) {
  color: rgb(167, 139, 250);
}

:deep(.ProseMirror img) {
  max-width: 100%;
  border-radius: 0.25rem;
}
</style>
