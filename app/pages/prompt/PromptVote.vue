<template>
  <page>
    <ActionBar class="action-bar" title="VOTE">
      <NavigationButton
        text="Done"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
      <Label class="action-bar-title" text="VOTE"></Label>
    </ActionBar>
    <StackLayout>
      <StackLayout>
        <Label class="" :text="`${images.length} Responses`"></Label>
        <Label class="" :text="prompt.promptText"></Label>
      </StackLayout>
      <WrapLayout alignItems="left" marginTop="10">
        <Image
          v-for="image in images"
          :key="image.id"
          :src="image.imageUrl"
          stretch="aspectFill"
          class="listImage"
          width="33.3%"
          height="140"
          @tap="goToImageView(image)"
        />
      </WrapLayout>
    </StackLayout>
  </page>
</template>

<script>
import routes from "~/router";

export default {
  name: "prompt-vote",

  props: {
    prompt: {
      type: Object,
    },
  },
  data() {
    return {
      images: [],
      promptId: null,
    };
  },
  methods: {
    getImages() {
      this.$promptService
        .getPromptImages(this.prompt.promptId)
        .then((imageArray) => {
          this.images = imageArray;
          this.promptId = this.prompt.promptId;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goToImageView(image) {
      const navObject = {
        image: image,
        promptId: this.promptId,
      };
      this.$navigateTo(routes.imageView, {
        animated: true,
        transition: {
          name: "slideLeft",
          curve: "easeInOut",
          duration: 100,
        },
        props: { navObject: navObject },
      });
    },
  },
  created() {
    this.getImages();
  },
};
</script>

<style></style>
