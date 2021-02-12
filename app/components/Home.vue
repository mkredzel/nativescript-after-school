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
        <Button
          text="Shopping Cart"
          class="btn m-t-20 add-button"
          @tap="openShoppingCart()"
        />
        <SearchBar
          hint="Search for classes"
          v-model="search"
          @change="items()"
        >
        </SearchBar>
        <GridLayout rows="*" columns="*, *" v-for="i in rowCount" :key="i">
          <CardView
            class="card"
            margin="5"
            col="0"
            elevation="50"
            v-if="
              items[(i - 1) * itemsPerRow] && items[(i - 1) * itemsPerRow].topic
            "
          >
            <GridLayout
              class="card-layout"
              rows="200, auto,auto,auto,auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                v-if="items[(i - 1) * itemsPerRow].imageURL"
                :src="items[(i - 1) * itemsPerRow].imageURL"
                stretch="aspectFill"
                colSpan="3"
                row="0"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow].location"
                class="location"
                row="2"
                colSpan="3"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow].date"
                class="date"
                row="3"
                colSpan="3"
              />
              <Label
                :text="'£' + items[(i - 1) * itemsPerRow].price + '/month'"
                class="price"
                row="4"
                colSpan="3"
              />
              <Label
                :text="
                  'Available Spaces: ' +
                  items[(i - 1) * itemsPerRow].availableSpaces
                "
                class="spaces"
                row="5"
                colSpan="3"
              />
              <Button
                row="6"
                colSpan="3"
                :isEnabled="items[(i - 1) * itemsPerRow].availableSpaces > 0"
                text="Add To Cart"
                @tap="
                  addItem(items[(i - 1) * itemsPerRow], (i - 1) * itemsPerRow)
                "
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
              items[(i - 1) * itemsPerRow + 1] &&
              items[(i - 1) * itemsPerRow + 1].topic
            "
          >
            <GridLayout
              class="card-layout"
              rows="200, auto,auto,auto,auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                v-if="items[(i - 1) * itemsPerRow + 1].imageURL"
                :src="items[(i - 1) * itemsPerRow + 1].imageURL"
                stretch="aspectFill"
                colSpan="3"
                row="0"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow + 1].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow + 1].location"
                class="location"
                row="2"
                colSpan="3"
              />
              <Label
                :text="items[(i - 1) * itemsPerRow + 1].date"
                class="date"
                row="3"
                colSpan="3"
              />
              <Label
                :text="'£' + items[(i - 1) * itemsPerRow + 1].price + '/month'"
                class="price"
                row="4"
                colSpan="3"
              />
              <Label
                :text="
                  'Available Spaces: ' +
                  items[(i - 1) * itemsPerRow + 1].availableSpaces
                "
                class="spaces"
                row="5"
                colSpan="3"
              />
              <Button
                row="6"
                colSpan="3"
                text="Add To Cart"
                :isEnabled="
                  items[(i - 1) * itemsPerRow + 1].availableSpaces > 0
                "
                @tap="
                  addItem(
                    items[(i - 1) * itemsPerRow + 1],
                    (i - 1) * itemsPerRow + 1
                  )
                "
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
import Cart from "./Cart";

export default {
  data() {
    return {
      itemsPerRow: 2,
      cart: [],
      search: ""
    };
  },
  computed: {
    rowCount() {
      let vue = this;
      return Math.ceil(vue.items.length / this.itemsPerRow);
    },
    items() {
      console.log(this.search)
      if (this.search) {
        let items = this.$store.getters.items;
        return items.filter((item) => {
          return this.search
            .split(" ")
            .every((search) => item.topic.toLowerCase().includes(search));
        });
      } else {
        return this.$store.getters.items;
      }
    },

  },
  methods: {
    addItem(item, index) {
      let vue = this;
      vue.items[index].availableSpaces--;

      vue.$store.state.cart.push({
        topic: item.topic,
        price: item.price,
        img: item.imageURL,
      });
    },
    openShoppingCart() {
      this.$navigateTo(Cart);
    },
  },
  mounted() {
    if(this.$store.getters.items.length == 0) {
      this.$store.dispatch("fetchItems");
    }
  }
};
</script>
