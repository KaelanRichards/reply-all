<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Fotoğraf Ekleme"></Label>
    </ActionBar>
    <StackLayout>
      <Label
        text=""
        @tap="takePicture"
        class="fas p-2 koyu text-center"
        fontSize="28"
      />
      <ScrollView class="picture-gallery" orientation="vertical">
        <StackLayout orientation="vertical">
          <Image
            v-if="image"
            class="gallery-item"
            col="0"
            row="0"
            :src="image"
            stretch="aspectFill"
            @tap="tapPicture(image)"
          />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
const applicationSettings = require("application-settings");
const fsModule = require("tns-core-modules/file-system");
const imageSourceModule = require("tns-core-modules/image-source");
const cameraModule = require("nativescript-camera");
import ImageDetails from "~/pages/prompt/ImageDetails";
export default {
  name: "prompt-respond",

  props: {
    prompt: {
      type: Object,
    },
  },
  data() {
    return {
      image: null,
    };
  },

  methods: {
    tapPicture(image) {
      let navContextObj = {
        image: image,
      };
    },
    takePicture() {
      let that = this;
      cameraModule
        .takePicture({
          width: 300, //these are in device independent pixels
          height: 300, //only one will be respected depending on os/device if
          keepAspectRatio: true, //    keepAspectRatio is enabled.
          saveToGallery: false, //Don't save a copy in local gallery, ignored by some Android devices
        })
        .then((imageAsset) => {
          imageSourceModule.fromAsset(imageAsset).then(
            (savedImage) => {
              let filename = "image" + "-" + new Date().getTime() + ".png";
              let folder = fsModule.knownFolders.documents();
              let path = fsModule.path.join(folder.path, filename);
              that.image = savedImage;
              savedImage.saveToFile(path, "png");

              const navObject = {
                image: savedImage,
                path: path,
                fileName: filename,
                promptText: this.prompt.promptText,
                promptId: this.prompt.promptId,
              };
              this.$navigateTo(ImageDetails, {
                animated: true,
                transition: {
                  name: "slideLeft",
                  curve: "easeInOut",
                  duration: 100,
                },
                props: { navObject: navObject },
              });
              //that.$imageService.uploadFile(path, loadedImage);
            },
            (err) => {
              console.log("Failed to load from asset");
            }
          );
        });
    },
  },
  mounted() {
    cameraModule.requestPermissions().then(
      //request permissions for camera
      (success) => {
        //have permissions
      },
      (failure) => {
        //no permissions for camera
      }
    );
    // this.loadData();
  },
};
</script>

<style scoped lang="scss">
.take-picture-icon {
  horizontal-align: center;
  background-color: rgb(105, 105, 241);
  padding: 12;
  border-width: 1.2;
  border-color: black;
  border-radius: 14;
  margin-top: 20;
  margin-bottom: 20;
  color: white;
  font-size: 30;
  padding-left: 20;
}
.picture-gallery {
  margin-top: 20;
}
.gallery-item {
  margin: 10;
}
.note-picture-wrapper {
  background-color: #1a1919;
  opacity: 0.7;
  border-width: 1;
  border-radius: 8;
  color: #ffffff;
  border-color: #ffffff;
  margin: 15;
  vertical-align: bottom;
  horizontal-align: center;
}
.note-picture-text {
  font-size: 15;
  vertical-align: center;
  horizontal-align: center;
  padding: 4;
}
</style>
