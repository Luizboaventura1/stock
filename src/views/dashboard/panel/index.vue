<template>
  <v-app class="h-100 bg-primary">
    <nav class="bg-third d-flex align-center w-100 justify-space-between px-4">
      <router-link to="/" class="text-decoration-none">
        <TitleComponent sm> Stock </TitleComponent>
      </router-link>
      <div>
        <v-switch
          @click="toggleTheme()"
          v-model="stateSwitch"
          hide-details
          inset
        ></v-switch>
      </div>
    </nav>
    <v-container class="h-100 ma-auto">
      <AnalysisPanelRoot>
        <v-col cols="12" sm="4" class="d-flex justify-center pa-0">
          <CardPanel>
            <TitleCardPanel sm> Total in stock </TitleCardPanel>
            <TitleComponent md>
              {{ formatValue(totalValueInStock) }}
            </TitleComponent>
          </CardPanel>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          class="d-flex justify-center pa-0 px-0 py-4 py-sm-0 px-sm-4"
        >
          <CardPanel>
            <TitleCardPanel sm> Total in departure </TitleCardPanel>
            <TitleComponent md>
              {{ formatValue(totalValueInDepartures) }}
            </TitleComponent>
          </CardPanel>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-center pa-0">
          <CardPanel>
            <TitleCardPanel sm> Total products </TitleCardPanel>
            <TitleComponent md>
              {{ totalProducts }}
            </TitleComponent>
          </CardPanel>
        </v-col>
      </AnalysisPanelRoot>
      <header class="d-flex justify-start w-100">
        <addProductButton @EventButton="handlerAddProduct.open()">
          Add Product
        </addProductButton>
      </header>
      <v-main class="my-7">
        <v-row class="w-100">
          <v-col cols="12" md="6">
            <TitleComponent sm> Input </TitleComponent>
            <v-table class="bg-third mt-3 rounded">
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Weight</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Value</th>
                  <th class="text-left">Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in stock.input" :key="item.product">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.weight }} Kg</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatValue(item.value) }}</td>
                  <td>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <EditButton size="30" v-bind="props" />
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title
                            @click="handlerEditProduct.open(index)"
                            style="cursor: pointer"
                            >Edit</v-list-item-title
                          >
                          <v-list-item-title
                            @click="handlerLeaveProduct.open(index)"
                            style="cursor: pointer"
                            >Leave product</v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col cols="12" md="6">
            <TitleComponent sm> Output </TitleComponent>
            <v-table class="bg-third mt-3 rounded">
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Product</th>
                  <th class="text-left">Weight</th>
                  <th class="text-left">Quantity</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in stock.output" :key="item.product">
                  <td>{{ item.id }}</td>
                  <td>{{ item.product }}</td>
                  <td>{{ item.weight }} Kg</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ formatValue(item.value) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-main>
    </v-container>

    <!--Add new product-->

    <AddProductModal
      :modal="stateModal"
      @closeModal="handlerAddProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Add Product </TitleComponent>
        <CloseButton @EventButton="handlerAddProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <v-text-field
        :rules="formRules.productRules"
        label="Product name"
        v-model="product"
      ></v-text-field>
      <v-text-field
        :rules="formRules.valueRules"
        label="Value"
        prefix="R$"
        v-model="value"
      ></v-text-field>
      <v-text-field
        :rules="formRules.weightRules"
        label="Weight"
        suffix="Kg"
        v-model="weight"
      ></v-text-field>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="quantity"
      ></v-text-field>
      <addProductButton @EventButton="addNewProduct">
        Add new product
      </addProductButton>
    </AddProductModal>

    <!--Edit Product-->

    <AddProductModal
      :modal="stateModalEditProduct"
      @closeModal="handlerEditProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Edit Product </TitleComponent>
        <CloseButton @EventButton="handlerEditProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <v-text-field
        :rules="formRules.productRules"
        label="Product name"
        v-model="editProduct"
      ></v-text-field>
      <v-text-field
        :rules="formRules.valueRules"
        label="Value"
        prefix="R$"
        v-model="editValue"
      ></v-text-field>
      <v-text-field
        :rules="formRules.weightRules"
        label="Weight"
        suffix="Kg"
        v-model="editWeight"
      ></v-text-field>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="editQuantity"
      ></v-text-field>
      <addProductButton @EventButton="EditProduct(currentIdProduct)">
        Confirm
      </addProductButton>
    </AddProductModal>

    <!--Leave product-->

    <AddProductModal
      :modal="stateModalLeaveProduct"
      @closeModal="handlerLeaveProduct.close()"
    >
      <nav class="d-flex justify-space-between">
        <TitleComponent sm> Leave Product </TitleComponent>
        <CloseButton @EventButton="handlerLeaveProduct.close()" size="30" />
      </nav>
      <v-divider class="my-4" />
      <TitleCardPanel md class="mb-3">
        How many products will come out?
      </TitleCardPanel>
      <TitleComponent sm class="mb-3">
        Total products: {{ leaveQuantity }}
      </TitleComponent>
      <v-text-field
        :rules="formRules.quantityRules"
        label="Quantity"
        v-model="quantityOfProductsLeft"
        type="number"
        :maxLength="leaveQuantity"
        @input="validateInput"
      ></v-text-field>
      <addProductButton @EventButton="LeaveProduct(currentIdProduct)">
        Confirm
      </addProductButton>
    </AddProductModal>
  </v-app>
</template>

<script setup>
import TitleComponent from "@/components/TitleComponent.vue";
import addProductButton from "@/components/addProductButton.vue";
import AddProductModal from "@/components/AddProductModal/AddProductModal.vue";
import CloseButton from "@/components/CloseButton.vue";
import EditButton from "@/components/EditButton.vue";
import { formatValue } from "@/composables/formatValue";
import { formRules } from "@/composables/formRules";
import AnalysisPanelRoot from "@/components/AnalysisPanel/AnalysisPanelRoot.vue";
import { ref } from "vue";
import CardPanel from "@/components/AnalysisPanel/CardPanel.vue";
import TitleCardPanel from "@/components/AnalysisPanel/TitleCardPanel.vue";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { onMounted } from "vue";
import { useCookie } from "@/composables/useCookie";
import { useTheme } from "vuetify";

const theme = useTheme();

let idUser = ref("");

let stock = ref({ input: [], output: [] });

// Modal add product

let stateModal = ref(false);

const handlerAddProduct = {
  open: () => (stateModal.value = true),
  close: () => (stateModal.value = false),
};

// Get products from Firestore

let cookie = useCookie();

onMounted(async () => {
  const q = query(
    collection(db, "user"),
    where("email", "==", cookie.get("cookie").email)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    stock.value = doc.data().stock;

    // Get id user
    idUser.value = doc.id;

    // get the total value of stock and quantity of products
    if (doc.data().stock.input != undefined) {
      doc.data().stock.input.forEach((product) => {
        totalValueInStock.value += parseInt(product.value);
        totalProducts.value += parseInt(product.quantity);
      });
    }
    // get the total value of exits
    if (doc.data().stock.output != undefined) {
      doc.data().stock.output.forEach((product) => {
        totalValueInDepartures.value += parseInt(product.value);
      });
    }
  });
});

// Add new product

let product = ref("");
let weight = ref("");
let quantity = ref("");
let value = ref("");

const addNewProduct = async () => {
  if (
    product.value.length != 0 &&
    quantity.value.length != 0 &&
    value.value.length != 0 &&
    quantity.value.length != 0
  ) {
    stock.value.input.push({
      id: stock.value.input.length,
      product: product.value,
      weight: weight.value,
      quantity: quantity.value,
      value: value.value,
    });

    saveDataToFirestore();
    updateTheAnalysis();
    handlerAddProduct.close();
  }
};

// Edit product

let editProduct = ref("");
let editWeight = ref("");
let editQuantity = ref("");
let editValue = ref("");

let stateModalEditProduct = ref(false);
let currentIdProduct = ref();

const handlerEditProduct = {
  open: (id) => {
    stateModalEditProduct.value = true;
    currentIdProduct.value = id;
    editProduct.value = stock.value.input[id].product;
    editWeight.value = stock.value.input[id].weight;
    editQuantity.value = stock.value.input[id].quantity;
    editValue.value = stock.value.input[id].value;
  },
  close: () => (stateModalEditProduct.value = false),
};

const EditProduct = async (id) => {
  if (
    editProduct.value.length != 0 &&
    editWeight.value.length != 0 &&
    editValue.value.length != 0 &&
    editQuantity.value.length
  ) {
    stock.value.input[id].product = editProduct.value;
    stock.value.input[id].weight = editWeight.value;
    stock.value.input[id].quantity = editQuantity.value;
    stock.value.input[id].value = editValue.value;

    saveDataToFirestore();
    updateTheAnalysis();
    handlerEditProduct.close();
  }
};

// Leave product

let leaveProduct = ref("");
let leaveWeight = ref("");
let leaveQuantity = ref("");
let leaveValue = ref("");
let quantityOfProductsLeft = ref();

let stateModalLeaveProduct = ref(false);

const handlerLeaveProduct = {
  open: (id) => {
    stateModalLeaveProduct.value = true;
    currentIdProduct.value = id;
    leaveProduct.value = stock.value.input[id].product;
    leaveWeight.value = stock.value.input[id].weight;
    leaveQuantity.value = stock.value.input[id].quantity;
    leaveValue.value = stock.value.input[id].value;
  },
  close: () => (stateModalLeaveProduct.value = false),
};

const LeaveProduct = async (id) => {
  if (
    leaveProduct.value.length != 0 &&
    leaveWeight.value.length != 0 &&
    leaveValue.value.length != 0 &&
    leaveQuantity.value.length != 0
  ) {
    if (quantityOfProductsLeft.value < leaveQuantity.value) {

      let resultValue =
        stock.value.input[id].value -
        (stock.value.input[id].value / leaveQuantity.value) *
          quantityOfProductsLeft.value;
          
      let resultWeight =
        stock.value.input[id].weight -
        (stock.value.input[id].weight / leaveQuantity.value) *
          quantityOfProductsLeft.value;

      // add the product to the output
      stock.value.output.push({
        id: stock.value.output.length,
        product: leaveProduct.value,
        value: resultValue,
        weight: resultWeight,
        quantity: quantityOfProductsLeft.value,
      });

      //removes the desired amount of products
      stock.value.input[id].quantity =
        parseInt(stock.value.input[id].quantity) -
        parseInt(quantityOfProductsLeft.value);

      stock.value.input[id].weight =
        stock.value.input[id].weight -
        (stock.value.input[id].weight / leaveQuantity.value) *
          quantityOfProductsLeft.value;

      stock.value.input[id].value =
        stock.value.input[id].value -
        (stock.value.input[id].value / leaveQuantity.value) *
          quantityOfProductsLeft.value;

    } else if (quantityOfProductsLeft.value === leaveQuantity.value) {

      let resultValue =
        stock.value.input[id].value -
        (stock.value.input[id].value / leaveQuantity.value) *
          quantityOfProductsLeft.value;
      let resultWeight =
        stock.value.input[id].weight -
        (stock.value.input[id].weight / leaveQuantity.value) *
          quantityOfProductsLeft.value;

      stock.value.output.push({
        id: stock.value.output.length,
        product: leaveProduct.value,
        value: resultValue,
        weight: resultWeight,
        quantity: quantityOfProductsLeft.value,
      });

      // removes the product from the input
      stock.value.input.splice(id, 1);
    }

    saveDataToFirestore();
    updateTheAnalysis();
    quantityOfProductsLeft.value = ""
    handlerLeaveProduct.close();
  }
};

// Analysis product

let totalValueInStock = ref(0);
let totalValueInDepartures = ref(0);
let totalProducts = ref(0);

// Switch

let stateSwitch = ref(true);

onMounted(() => (stateSwitch.value = theme.global.current.value.dark));

theme.global.name.value = JSON.parse(localStorage.getItem("theme"))
  ? JSON.parse(localStorage.getItem("theme"))
  : "dark";

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  localStorage.setItem("theme", JSON.stringify(theme.global.name.value));
};

// save data to firestore

const saveDataToFirestore = async () => {
  const docRef = doc(db, "user", idUser.value);

  await updateDoc(docRef, {
    stock: stock.value,
  });
};

// update the analysis

const updateTheAnalysis = async () => {
  const q = query(
    collection(db, "user"),
    where("email", "==", cookie.get("cookie").email)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    totalValueInStock.value = 0;
    totalProducts.value = 0;
    totalValueInDepartures.value = 0;

    // get the total value of stock and quantity of products

    doc.data().stock.input.forEach((product) => {
      totalValueInStock.value += parseInt(product.value);
      totalProducts.value += parseInt(product.quantity);
    });

    // get the total value of exits
    doc.data().stock.output.forEach((product) => {
      totalValueInDepartures.value += parseInt(product.value);
    });
  });
};

const validateInput = () => {
  if (parseInt(quantityOfProductsLeft.value) > parseInt(leaveQuantity.value)) {
    quantityOfProductsLeft.value = leaveQuantity.value;
  }
};
</script>

<style lang="scss" scoped></style>
