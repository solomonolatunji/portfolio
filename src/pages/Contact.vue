<template>
  <div class="min-h-screen w-full pb-24 md:pb-12">
    <div class="container mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8">
      <div class="title-with-bg-shadow" data-text="CONTACT ME">
        <h1
          class="modern-title mb-8 text-center text-2xl sm:text-3xl lg:text-4xl"
        >
          <span class="accent">—</span>
          CONTACT ME
        </h1>
      </div>

      <div class="contact-row grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <div class="flex h-full flex-col space-y-10">
            <!-- Contact Information Component -->
            <ContactInfo />

            <!-- Social Links Component -->
            <SocialLinks />
          </div>
        </div>

        <div class="lg:col-span-2">
          <!-- Contact Form Component -->
          <ContactForm />
        </div>
      </div>

      <!-- Portfolio CTA Component -->
      <PortfolioCTA />
    </div>
  </div>
</template>

<script lang="ts">
import ContactInfo from "@/components/Contact/ContactInfo.vue";
import SocialLinks from "@/components/Contact/SocialLinks.vue";
import ContactForm from "@/components/Contact/ContactForm.vue";
import PortfolioCTA from "@/components/Contact/PortfolioCTA.vue";

export default {
  name: "Contact",
  components: {
    ContactInfo,
    SocialLinks,
    ContactForm,
    PortfolioCTA,
  },
};
</script>

<style scoped>
.contact-row {
  display: grid;
  grid-template-rows: 1fr;
}

@media (max-width: 1023px) {
  .contact-card {
    height: auto;
  }
}
</style>
