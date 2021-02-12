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
              cart[(i - 1) * itemsPerRow] && cart[(i - 1) * itemsPerRow].topic
            "
          >
            <GridLayout
              class="card-layout"
              rows="30, auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/480px-Red_x.svg.png"
                colSpan="3"
                row="0"
                @tap="remove((i - 1) * itemsPerRow)"
              />
              <Label
                :text="cart[(i - 1) * itemsPerRow].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="'£' + cart[(i - 1) * itemsPerRow].price + '/month'"
                class="price"
                row="2"
                colSpan="3"
              />
            </GridLayout>
          </CardView>
          <CardView
            class="card"
            margin="5"
            col="1"
            elevation="50"
            v-if="
              cart[(i - 1) * itemsPerRow + 1] &&
              cart[(i - 1) * itemsPerRow + 1].topic
            "
          >
            <GridLayout
              class="card-layout"
              rows="30, auto,auto,auto"
              columns="*, *, *"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/480px-Red_x.svg.png"
                @tap="remove((i - 1) * itemsPerRow + 1)"
                colSpan="3"
                row="0"
              />
              <Label
                :text="cart[(i - 1) * itemsPerRow + 1].topic"
                class="topic"
                row="1"
                colSpan="3"
              />
              <Label
                :text="'£' + cart[(i - 1) * itemsPerRow + 1].price + '/month'"
                class="price"
                row="2"
                colSpan="3"
              />
            </GridLayout>
          </CardView>
        </GridLayout>
        <Label :text="'Total: £' + total" class="total" />

        <TextField hint="Enter Full Name" v-model="name" maxLength="30">
        </TextField>
        <TextField hint="Enter Phone Number" v-model="phone" maxLength="15">
        </TextField>

        <Button
          text="Checkout"
          class="btn m-t-20 add-button"
          @tap="checkout()"
        />
        <Button text="Back" class="btn m-t-20 add-button" @tap="goBack()" />
      </StackLayout>

      <StackLayout v-else>
        <Label class="basketLabel" text="Basket is empty" />
        <Button text="Back" class="btn m-t-20 add-button" @tap="goBack()" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import Home from "./Home";

export default {
  data() {
    return {
      cart: [],
      itemsPerRow: 2,
      name: "",
      phone: "",
      checkoutClicked: false,
    };
  },
  methods: {
    goBack() {
      this.$navigateTo(Home);
    },
    checkout() {
      this.checkoutClicked = true;
      console.log(this.cart);
      let order = {
        name: this.name,
        telephone: this.phone,
        lessons: [],
        total: 0,
      };

      this.cart.forEach((lesson) => {
        order.total = order.total + lesson.price;

        order.lessons.push({
          name: lesson.topic,
          price: lesson.price,
        });

        let classes = this.$store.getters.items;

        classes.forEach((product) => {
          if (lesson.topic == product.topic) {
            let updatedLesson = {
              availableSpaces: product.availableSpaces,
            };

            fetch(
              `https://after-school-server.herokuapp.com/collection/lessons/${product._id}`,
              {
                method: "PUT", // set the HTTP method as 'PUT'
                headers: {
                  "Content-Type": "application/json", // set the data type as JSON
                },
                body: JSON.stringify(updatedLesson), // need to stringify the JSON object
              }
            )
              .then((response) => response.json())
              .then((responseJSON) => {
                console.log("Success:", responseJSON);
              });
          }
        });
      });

      // set the url to your server and route
      fetch("https://after-school-server.herokuapp.com/collection/orders", {
        method: "POST", // set the HTTP method as 'POST'
        headers: {
          "Content-Type": "application/json", // set the data type as JSON
        },
        body: JSON.stringify(order), // need to stringify the JSON object
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log("Success:", responseJSON);
        });
      this.cart = [];
    },
    remove(index) {
      this.cart.splice(index, 1);
    },
  },
  computed: {
    rowCount: function () {
      let vue = this;
      return Math.ceil(vue.cart.length / this.itemsPerRow);
    },
    total() {
      let vue = this;
      return vue.$store.state.cart.reduce((acc, item) => acc + item.price, 0);
    },
  },
  created: function () {
    let vue = this;
    vue.cart = vue.$store.state.cart;
  },
};
</script>
