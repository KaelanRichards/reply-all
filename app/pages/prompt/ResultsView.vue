<template>
  <Page>
    <ActionBar title="image carousel" />
    <StackLayout>
      <Pager height="100%" for="item in items">
        <v-template>
          <StackLayout>
            <Button text="Submit" class="submit-button" />
            <Label
              :text="`${items.indexOf(item) + 1} of ${items.length}`"
              fontSize="28"
            />
            <GridLayout class="pager-item" rows="auto, *" columns="*">
              <Image
                stretch="fill"
                margin="10"
                row="1"
                :src="item.imageUrl"
              ></Image>
            </GridLayout>
          </StackLayout>
        </v-template>
      </Pager>
    </StackLayout>
  </Page>
</template>

<script>
import { ObservableArray } from "tns-core-modules/data/observable-array";
export default {
  props: {
    images: {
      type: Array,
    },
  },
  data() {
    return {
      items: new ObservableArray(this.images),
    };
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.submit-button {
  z-index: 50;
}
</style>
