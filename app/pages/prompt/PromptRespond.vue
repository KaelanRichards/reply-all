https://github.com/NativeScript/nativescript-camera

<template>
  <Page class="page">
    <ActionBar title="Camera" class="action-bar" />
    <StackLayout>
      <Button
        :text="textPicture"
        class="btn btn-primary"
        marginTop="20"
        @tap="takePicture"
      ></Button>
      <Image :src="pictureFromCamera"></Image>
    </StackLayout>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import * as http from "http";

export default {
  data() {
    return {
      pictureFromCamera: null,
      textPicture: "Take a Picture",
    };
  },
  methods: {
    takePicture() {
      // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
      // for more information on how to customize the pictures you take.
      camera
        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
        .then((imageAsset) => {
          this.pictureFromCamera = imageAsset;
        })
        .catch((err) => {
          console.log("Error -> " + err.message);
        });
    },
  },
};
</script>
