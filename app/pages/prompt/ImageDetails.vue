<template>
  <Page
    class="page"
    ref="page"
    actionBarHidden="false"
    backgroundSpanUnderStatusBar="true"
  >
    <ActionBar class="action-bar" title="Picture Details">
      <NavigationButton
        text="Done"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack()"
      />
      <Label class="action-bar-title" text="Picture Details"></Label>
    </ActionBar>
    <ScrollView orientation="vertical">
      <StackLayout>
        <Image
          class="picture-full"
          stretch="aspectFit"
          :src="navObject.image"
        />
        <GridLayout columns="*,*" rows="60,30,*,300">
          <StackLayout
            col="1"
            row="0"
            class="delete-picture-icon-wrapper"
            @tap="submitImage"
          >
            <Label
              verticalAlignement="bottom"
              text="Submit"
              class="delete-picture-icon"
            ></Label>
          </StackLayout>

          <Label col="0" colSpan="2" row="3" text="" />
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import routes from "~/router";

export default {
  name: "image-details-page",
  data() {
    return {
      uploadedImageName: null,
    };
  },
  props: {
    navObject: {
      type: Object,
    },
  },
  methods: {
    submitImage() {
      this.$imageService
        .uploadFile(this.navObject.path)
        .then((uploadedFile) => {
          this.uploadedImageName = uploadedFile.name;
          this.$imageService
            .getDownloadUrl(this.uploadedImageName)
            .then((downloadUrl) => {
              this.$promptService.addImage(
                downloadUrl,
                this.$store.state.user.uid,
                this.navObject.promptId
              );
              this.$promptService
                .userResponded(
                  this.$store.state.user.uid,
                  this.navObject.promptId
                )
                .then((usersResponded) => {
                  const groupUsers = this.$store.state.selectedGroup.groupUsers;
                  // check if all of the users have voted
                  if (groupsUsers.length === usersResponded.Length) {
                    this.$promptService.groupResponded(this.navObject.promptId);
                  } else {
                    this.$navigateTo(
                      routes.home,
                      { clearHistory: true }
                      // { backstackVisible: false }
                    );
                  }
                });
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.delete-picture-icon {
  font-size: 15;
  vertical-align: center;
  horizontal-align: center;
}
.delete-picture-icon-wrapper {
  background-color: #000000;
  border-width: 1;
  border-radius: 8;
  color: #ffffff;
  border-color: #ffffff;
  margin: 15;
  vertical-align: center;
  horizontal-align: right;
  height: 30;
  width: 60;
}
.text-picture {
  border-width: 1;
  border-style: solid;
  border-color: #01060c;
  height: 80;
  background-color: rgb(235, 233, 233);
}
.section-label {
  background-color: #292b2b;
  border-width: 1;
  border-style: solid;
  border-color: #01060c;
  color: white;
  padding-left: 10;
  padding-top: 5;
  padding-bottom: 5;
}
.picture-full {
  border-width: 1;
  border-color: gray;
}
</style>
