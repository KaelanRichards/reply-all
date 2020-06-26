<template>
  <page>
    <label text="vote for predro!!"> </label>
    <WrapLayout alignItems="left" marginTop="10">
      <Image
        v-for="image in images"
        :key="image.id"
        :src="image.imageUrl"
        stretch="aspectFill"
        class="listImage"
        width="33.3%"
        height="140"
      />
    </WrapLayout>
  </page>
</template>

<script>
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
    };
  },
  methods: {
    getImages() {
      this.$promptService
        .getPromptImages(this.prompt.promptId)
        .then((imageArray) => {
          this.images = imageArray;
          console.log("imageARRAY--------", this.images);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getImages();
  },
};
</script>

<style></style>
