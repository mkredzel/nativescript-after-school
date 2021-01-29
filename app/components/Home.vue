<template>
  <Page>
    <ActionBar>
      <StackLayout
        orientation="horizontal"
        ios:horizontalAlignment="center"
        android:horizontalAlignment="center"
      >
        <Image src="~/assets/img/icon.png" width="25" class="action-image" />
        <Label text=" After School" class="title"></Label>
      </StackLayout>
    </ActionBar>
    <ScrollView>
      <StackLayout v-if="rowCount > 0">
        <GridLayout rows="*" columns="*, *" v-for="i in rowCount" :key="i">
          <CardView
            class="card"
            margin="5"
            col="0"
            elevation="50"
            v-if="
              Items[(i - 1) * itemsPerRow] && Items[(i - 1) * itemsPerRow].topic
            "
            @tap="seeDetails(Items[(i - 1) * itemsPerRow])"
          >
            <GridLayout
              class="card-layout"
              rows="200, auto,auto,auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                v-if="Items[(i - 1) * itemsPerRow].imageURL"
                :src="Items[(i - 1) * itemsPerRow].imageURL"
                stretch="aspectFill"
                colSpan="3"
                row="0"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow].location"
                class="location"
                row="2"
                colSpan="3"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow].date"
                class="date"
                row="3"
                colSpan="3"
              />
              <Label
                :text="'£' + Items[(i - 1) * itemsPerRow].price + '/month'"
                class="price"
                row="4"
                colSpan="3"
              />
              <Button
                row="5"
                colSpan="3"
                text="Add To Cart"
                @tap="addItem(Items[(i - 1) * itemsPerRow])"
                class="btn m-t-20 add-button"
              />
            </GridLayout>
          </CardView>
          <CardView
            class="card"
            margin="5"
            col="1"
            elevation="50"
            v-if="
              Items[(i - 1) * itemsPerRow + 1] &&
              Items[(i - 1) * itemsPerRow + 1].topic
            "
            @tap="seeDetails(Items[(i - 1) * itemsPerRow + 1])"
          >
            <GridLayout
              class="card-layout"
              rows="200, auto,auto,auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                v-if="Items[(i - 1) * itemsPerRow + 1].imageURL"
                :src="Items[(i - 1) * itemsPerRow + 1].imageURL"
                stretch="aspectFill"
                colSpan="3"
                row="0"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow + 1].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow + 1].location"
                class="location"
                row="2"
                colSpan="3"
              />
              <Label
                :text="Items[(i - 1) * itemsPerRow + 1].date"
                class="date"
                row="3"
                colSpan="3"
              />
              <Label
                :text="'£' + Items[(i - 1) * itemsPerRow + 1].price + '/month'"
                class="price"
                row="4"
                colSpan="3"
              />
              <Button
                row="5"
                colSpan="3"
                text="Add To Cart"
                @tap="addItem(Items[(i - 1) * itemsPerRow + 1])"
                class="btn m-t-20 add-button"
              />
            </GridLayout>
          </CardView>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      Items: [],
      itemsPerRow: 2,
    };
  },
  computed: {
    rowCount: function () {
      return Math.ceil(this.Items.length / this.itemsPerRow);
    },
  },
  methods: {
    seeDetails(item) {
      console.log("Showing detailed view for: ");
      console.dir(item);
    },
    addItem(item) {
      console.log("Adding item:");
      console.dir(item);
    },
  },
  created: function () {
    let vue = this;
    fetch("https://after-school-server.herokuapp.com/collection/lessons").then(
      (response) => {
        response
          .json()
          .then(function (json) {
            vue.Items = json;
          })
          .catch((error) => {
            alert("Error! " + error.message);
          });
      }
    );
  },
};
</script>
