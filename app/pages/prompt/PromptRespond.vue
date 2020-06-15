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
      <Button
        v-if="image"
        text="Submit Picture"
        class="btn btn-primary"
        marginTop="20"
        @tap="takePicture"
      ></Button>
      <Button
        v-if="image"
        text="Submit Picture"
        class="btn btn-primary"
        marginTop="20"
        @tap="takePhoto"
      ></Button>
    </StackLayout>
  </Page>
</template>

<script>
import * as camera from "nativescript-camera";
import * as http from "http";
const imageSource = require("tns-core-modules/image-source");

export default {
  data() {
    return {
      pictureFromCamera: null,
      textPicture: "Take a Picture",
      imagePath: null,
      image: null,
    };
  },
  methods: {
    takePicture() {
      // See the options at https://github.com/NativeScript/nativescript-camera#using-the-options-to-take-memory-efficient-picture
      // for more information on how to customize the pictures you take.
      const isAvailable = camera.isAvailable();

      camera
        .takePicture({ width: 300, height: 300, keepAspectRatio: true })
        .then((imageAsset) => {
          console.log("image asset", imageAsset);
          console.log(
            "Size: " +
              imageAsset.options.width +
              "x" +
              imageAsset.options.height
          );
          console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
          console.log(
            "Photo saved in Photos/Gallery for Android or in Camera Roll for iOS"
          );
          this.pictureFromCamera = imageAsset;
        })
        .catch((err) => {
          console.log("Error -> " + err.message);
        });
    },
    takePhoto() {
      let options = {
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true,
      };
      camera
        .takePicture(options)
        .then((imageAsset) => {
          console.log("Image Asset --> ", imageAsset);
          console.log("Image Source --> ", imageSource);

          imageSource.fromAsset(imageAsset).then((res) => {
            this.image = res;
            console.log("res --> ", res);

            //save the source image to a file, then send that file path to firebase
            //this.saveToFile(this.image);
          });
        })
        .catch(function(err) {
          console.log("Error -> " + err.message);
        });
    },
    saveToFile(res) {
      let imgsrc = res;
      this.imagePath = this.utilsService.documentsPath(
        `photo-${Date.now()}.png`
      );
      imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);
    },
    submitPicture(id) {
      if (this.image) {
        //upload the file, then save all
        this.firebaseService.uploadFile(this.imagePath).then(
          (uploadedFile) => {
            this.uploadedImageName = uploadedFile.name;
            //get downloadURL and store it as a full path;
            this.firebaseService
              .getDownloadUrl(this.uploadedImageName)
              .then((downloadUrl) => {
                this.firebaseService
                  .editGift(id, this.description, downloadUrl)
                  .then(
                    (result) => {
                      alert(result);
                    },
                    (error) => {
                      alert(error);
                    }
                  );
              });
          },
          (error) => {
            alert("File upload error: " + error);
          }
        );
      } else {
        //just edit the description
        this.firebaseService.editDescription(id, this.description).then(
          (result) => {
            alert(result);
          },
          (error) => {
            alert(error);
          }
        );
      }
    },
  },
  created() {
    camera.requestPermissions();
  },
};
</script>
